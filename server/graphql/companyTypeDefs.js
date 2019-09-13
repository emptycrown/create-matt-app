import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Company implements Node {
    id: ID!
    name: String!
    ceo: User
  }

  extend type Query {
    companies: [Company!]!
  }

  extend type Mutation {
    companyCreate(name: String!): Company!
  }
`;
