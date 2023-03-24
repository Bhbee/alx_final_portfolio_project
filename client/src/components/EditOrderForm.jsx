import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ORDER } from "../queries/orderQueries";
import { UPDATE_ORDER } from "../mutations/orderMutations";

export default function EditOrderForm({ order }) {
  const [title, setTitle] = useState(order.title);
  const [description, setDescription] = useState(order.description);
  const [delivery_address, setDeliveryAddress] = useState(order.delivery_address);
  const [final_delivery_date, setFinalDeliveryDate] = useState(order.final_delivery_date);
  const [status, setStatus] = useState(() => {
    switch (order.status) {
      case "Not Delivered":
        return "new";
      case "Delivery in progress":
        return "progress";
      case "Delivered":
        return "completed";
      default:
        throw new Error(`Unknown status: ${order.status}`);
    }
  });

  const [updateOrder] = useMutation(UPDATE_ORDER, {
    variables: { id: order.id, title, description, delivery_address, final_delivery_date, status },
    refetchQueries: [{ query: GET_ORDER, variables: { id: order.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !status || !delivery_address) {
      return alert("Please fill out all fields");
    }

    updateOrder(title, description, delivery_address, final_delivery_date, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Order Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='mb-3'>
            <label className='form-label'>Delivery_address</label>
            <textarea
                className='form-control'
                id='delivery_address'
                value={delivery_address}
                onChange={(e) => setDeliveryAddress(e.target.value)}
            ></textarea>
        </div>

        <div className='mb-3'>
            <label className='form-label'>Final_Delivery_Date</label>
            <input
                type= 'text'
                className='form-control'
                id='final_delivery_date'
                value={final_delivery_date}
                onChange={(e) => setFinalDeliveryDate(e.target.value)}
            ></input>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Delivered</option>
            <option value="progress">Delivery in progress</option>
            <option value="completed">Delivered</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}