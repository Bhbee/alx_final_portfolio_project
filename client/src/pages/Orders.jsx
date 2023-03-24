import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import CustomerInfo from '../components/CustomerInfo';
import DeleteOrderButton from '../components/DeleteOrderButton';
import ShareOrderButton from '../components/ShareOrderButton';
import EditOrderForm from '../components/EditOrderForm';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../queries/orderQueries';

export default function Order() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORDER, { variables: { id } });
  
  if (loading) return <Spinner />;
  if (error) {
    return <p>Something Went Wrong</p>;
  }

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.order.title}</h1>
          <p>{data.order.description}</p> <br/>
          <p>Delivery_address: { data.order.delivery_address}</p>
          <p>To be delivered on: { data.order.initial_delivery_date}</p>
          
          <p>{data.order.final_delivery_date}</p>

          <h5 className='mt-3'>Delivery Status</h5>
          <p><strong>{data.order.status}</strong></p>

          <CustomerInfo customer={data.order.customer} />

          <EditOrderForm order={data.order} />

          <DeleteOrderButton orderId={data.order.id} />

          <ShareOrderButton orderId={data.order.id} />
          
        </div>
      )}
    </>
  );
}