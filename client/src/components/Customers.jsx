import { useQuery } from '@apollo/client';
import CustomerRow from './CustomerRow';
import Spinner from './Spinner';
import { GET_CUSTOMERS } from '../queries/customerQueries';

export default function Customer() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone_Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.customers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}