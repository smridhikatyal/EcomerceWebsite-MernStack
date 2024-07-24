
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import './OrderList.css';
const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orderlist-container">
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>User ID: {order.userId}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.productId}>
                  <p>Product ID: {item.productId}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>
            <p>Total Amount: ${order.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orderlist;
