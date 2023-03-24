import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CUSTOMER } from '../mutations/customerMutations';
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { GET_ORDERS } from '../queries/orderQueries';


export default function CustomerRow({ customer }) {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    variables: { id: customer.id },
    refetchQueries: [{ query: GET_CUSTOMERS }, { query: GET_ORDERS }],

    //or update cache
    // update(cache, { data: { deleteCustomer } }) {
    //   const { customers } = cache.readQuery({ query: GET_CUSTOMERS });
    //   cache.writeQuery({
    //     query: GET_CUSTOMERS,
    //     data: {
    //       customers: customers.filter((client) => customer.id !== deleteCustomer.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{customer.name}</td>
      <td>{customer.phone_number}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteCustomer}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}