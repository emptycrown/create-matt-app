import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { message } from 'antd';
import { onError } from 'apollo-link-error';
import { useState } from 'react';
import sentry from '~/integrations/sentry';

function createClient() {
  const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(error => {
        const { message, code } = error;
        const errorMsg = `[GraphQL error]: Message: ${message} Code: ${code}`;
        console.error(errorMsg);
        sentry.captureException(new Error(errorMsg));
      });
      // TODO: see if this UI error reporting scheme makes sense as we develop
      // Currently not handling Auth / User errors specially
      message.error(graphQLErrors[0].message);
    }

    // TODO: figure out what to do here
    if (networkError) {
      console.error('[Network error]:', networkError);
      sentry.captureException(networkError);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function useNewApolloClient() {
  const [client] = useState(createClient());
  return client;
}
