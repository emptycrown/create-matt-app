import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User implements Node {
    id: ID!
  }
`;