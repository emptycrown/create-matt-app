import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # https://stripe.com/docs/api/cards/object
  type StripeCard implements Node {
    id: ID!
    brand: String!
    expires: String!
    last4: String!
  }

  extend type User {
    stripeCards: [StripeCard!]!
  }
`;
