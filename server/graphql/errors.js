// A file to define new types of errors. By default, only UserError currently
// is treated differently from a normal Error -- as it returns a "message"
// field to the client.
import { ApolloError } from 'apollo-server-express';

export class AuthError extends ApolloError {
  constructor(message, properties = null) {
    super(message, 'AUTH_ERROR', properties);
  }
}

// Return a user-friendly description of what they did wrong
export class UserError extends ApolloError {
  constructor(message, properties = null) {
    super(message, 'USER_ERROR', properties);
  }
}
