import { gql } from '@apollo/client';

const ADD_ORDER = gql`
    mutation addOrder(
        $title: String!
        $description: String!
        $delivery_address: String!
        $initial_delivery_date: String!
        $final_delivery_date: String!
        $status: DeliveryStatus!
        $customerId: ID!
    ) {
        addOrder(
            title: $title
            description: $description
            delivery_address: $delivery_address
            initial_delivery_date: $initial_delivery_date
            final_delivery_date: $final_delivery_date
            status: $status
            customerId: $customerId
        ) {
            id
            title
            description
            status
            customer {
                id
                name
                phone_number
            }
    }
  }
`;

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation updateOrder(
    $id: ID!
    $title: String!
    $description: String!
    $delivery_address: String!
    $final_delivery_date: String!
    $status: DeliveryStatusUpdate!
){
    updateOrder(
      id: $id
      title: $title
      description: $description
      final_delivery_date: $final_delivery_date
      delivery_address: $delivery_address
      status: $status
      ) {
        id
        title
        description
        delivery_address
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

export { ADD_ORDER, DELETE_ORDER, UPDATE_ORDER };