import gql from 'graphql-tag';

export const ME_CARDS = gql`
  query CardsMe {
    me {
      id
      stripeCards {
        id
        brand
        expires
        last4
      }
    }
  }
`;
