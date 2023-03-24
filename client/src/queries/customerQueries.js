import { gql } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query getCustomers {
    customers {
      id
      name
      phone_number
    }
  }
`;

export { GET_CUSTOMERS };