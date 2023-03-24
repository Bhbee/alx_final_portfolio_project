import { gql } from '@apollo/client';

const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      title
      status
    }
  }
`;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      title
      description
      delivery_address
      initial_delivery_date
      final_delivery_date
      status
      customer {
        id
        name
        phone_number
      }
    }
  }
`;

export { GET_ORDERS, GET_ORDER };