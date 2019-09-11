import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    login(token: String!, extraInfo: JSON): User!

    logout: Boolean
  }
`;
