import { FaShareAlt} from 'react-icons/fa';
import { GET_ORDER } from '../queries/orderQueries';
import { useQuery } from '@apollo/client';

export default  function ShareOrderButton({ orderId }) {
    const { error, data }  = useQuery(GET_ORDER, {variables: { id: orderId } });
    const shareOrder = async() => {
        try {
            await navigator.share(
                { title: data.order.title, 
                delivery_address: data.order.delivery_address,
                customer_name: (data.order.customer).name,
                customer_phone: (data.order.customer).phone_number,

            });
            console.log(data.order.title, data.order.delivery_address, (data.order.customer).name );
        } 
        catch (err) {
          console.error("Share failed:", err.message);
        }
    }
    if (error) {
        return <p>Something Went Wrong</p>;
    }
    return (  
        <div className='d-flex mt-5 ms-auto'> 
            <button className='btn btn-danger m-2' onClick={shareOrder}>
                <FaShareAlt className='icon' /> Share Order Information
            </button>
        
        </div>     
    )
}          
