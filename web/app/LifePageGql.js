import gql from 'graphql-tag';

export const LIFE_PAGE = gql`
  query LifePage {
    me {
      id
      name
      email
      clout
    }
    companies {
      id
      name
      ceo {
        id
        name
      }
    }
  }
`;

export const CREATE_NEW_COMPANY = gql`
  mutation CreateNewCompany($name: String!) {
    companyCreate(name: $name) {
      id
    }
  }
`;
