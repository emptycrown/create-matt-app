import { DateTime, EmailAddress, URL } from '@okgrow/graphql-scalars';
import { gql } from 'apollo-server-express';
import GraphQLJSON from 'graphql-type-json';

export const resolvers = {
  DateTime,
  URL,
  EmailAddress,
  JSON: GraphQLJSON,
  Node: {
    __resolveType: () => null,
  },
};

export default gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  interface Node {
    id: ID!
  }

  # Custom Scalars
  scalar DateTime
  scalar URL
  scalar EmailAddress
  scalar JSON

  directive @auth(requires: Role = USER) on FIELD_DEFINITION | OBJECT
  enum Role {
    USER
    ADMIN
  }

  input SortBy {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }
`;
