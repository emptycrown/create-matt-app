import * as R from 'ramda';
import { ApolloServer } from 'apollo-server-express';
import { DEV, ENV } from '#/lib/env';
import { GraphQLError } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import AuthDirective from './directives/auth';
import baseTypeDef from './baseSchema';
import fs from 'fs';
import logger from '~/logger';
import morgan from 'morgan';
import path from 'path';
import stream from 'stream';

const GENERIC_ERROR_MESSAGE = 'Something went wrong, please try again in a bit';
export function getMorganToken({ showFields = false }) {
  return req => {
    const { query, mutation, variables, operationName } = req.body;
    let queryOrMutation;
    if (query) {
      queryOrMutation = `${query.trim()}`;
    } else if (mutation) {
      queryOrMutation = `${mutation.trim()}`;
    } else {
      return null;
    }

    return `\nGraphQL operation: ${operationName}${
      showFields ? `\n${queryOrMutation}` : ''
    }
Variables: ${JSON.stringify(variables)}`;
  };
}

function getSchemaAndResolvers() {
  const basename = path.basename(__filename);
  const dirExports = {};
  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .forEach(file => {
      const name = file.split('.js')[0];
      dirExports[name] = require(`./${file}`);
    });

  const typeDefs = [baseTypeDef];
  let resolvers = {};

  Object.entries(dirExports).forEach(
    ([name, { typeDefs: _typeDefs, resolvers: _resolvers }]) => {
      _typeDefs && typeDefs.push(_typeDefs);
      resolvers = R.mergeDeepWithKey(
        key => {
          throw new Error(
            `GraphQL resolver collision on key "${key}" (/${name}.js)`
          );
        },
        resolvers,
        _resolvers || {}
      );
    }
  );

  return {
    typeDefs,
    resolvers,
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  };
}
const { typeDefs, resolvers } = getSchemaAndResolvers();

export function initializeGraphQL(app) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // We keep this true because I don't love the way Apollo handles errors --
    // prefer to run with our own solution. With this flag false, error
    // stacktraces are always censored on production and we can't properly
    // report to Sentry.
    debug: true,
    // Whatever gets returned here is given to the client, so we need to
    // sanitize the error in this process
    formatError: error => {
      // NB: This doesn't seem to be sent synchronously, so don't modify this
      // error object even after this line
      // sentry.captureException(error);
      try {
        const exc = error.extensions.exception;
        const code = error.extensions.code;
        logger.error({
          gqlErrorCode: code,
          path: error.path,
          stack: exc,
        });

        // Client doesn't need to know the message, unless it's a user error.
        // However, show when in development
        let message;
        if (DEV === ENV || (code === 'USER_ERROR' || code === 'AUTH_ERROR')) {
          message = error.message;
        } else {
          message = GENERIC_ERROR_MESSAGE;
        }

        return {
          code,
          message,
        };
      } catch (err) {
        logger.error('GraphQL formatError failed');
        logger.error(err);
        // sentry.captureException(err);
        // If above sanitization fails, return a generic error
        return new GraphQLError(GENERIC_ERROR_MESSAGE);
      }
    },
    context: ({ req }) => {
      const contextLoaders = {};
      // TODO: enable when we have loaders
      //   Object.entries(loaders).map(([key, loader]) => {
      //     contextLoaders[key] = loader();
      //   });

      return {
        req,
        uid: req.uid,
        loaders: contextLoaders,
      };
    },
    schemaDirectives: {
      auth: AuthDirective,
    },
    playground: {
      settings: { 'request.credentials': 'same-origin' },
    },
  });

  morgan.token('gql', getMorganToken({ showFields: false }));
  app.use(
    morgan(':method :url :status (:response-time ms) :gql', {
      // Skip all resource fetches
      // Skip polling introspection query
      skip: req =>
        req.method === 'GET' || req.body.operationName === 'IntrospectionQuery',

      // https://stackoverflow.com/questions/21491567/how-to-implement-a-writable-stream
      stream: new stream.Writable({
        write: (chunk, encoding, next) => {
          logger.info(chunk.toString());
          next();
        },
      }),
    })
  );

  apolloServer.applyMiddleware({
    app,
  });
}
