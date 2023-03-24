import { gql } from '@apollo/client';

const ADD_CUSTOMER = gql`
  mutation addCustomer($name: String!, $phone_number: String!) {
    addCustomer(name: $name, phone_number: $phone_number) {
      id
      name
      phone_number
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
      phone_number
    }
  }
`;

export { ADD_CUSTOMER, DELETE_CUSTOMER };