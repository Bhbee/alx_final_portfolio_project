import { FaPhone, FaIdBadge } from 'react-icons/fa';

export default function CustomerInfo({ customer }) {
  return (
    <>
      <h5 className='mt-5'>Customer's Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> {customer.name}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' /> {customer.phone_number}
        </li>
      </ul>
    </>
  );
}