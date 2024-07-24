// import React from 'react';

// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from './axiosConfig';
// import { addToCart } from './slices/cartSlice';
// import { addOrder, removeOrder } from './slices/orderSlice';

// import { useEffect } from 'react';

// const OrderList = () => {
//   const orders = useSelector(state => state.orders);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {t} = useTranslation();

//   useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//         const token = localStorage.getItem('authToken');
//         const response = await axiosInstance.get('/orders', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         addOrder(response.data);
//         dispatch(addOrder(response.data)); // Update Redux store with orders
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//     }
// };

//             fetchOrders();
//           }, [dispatch]);

//   const handleEdit = order => {
//     dispatch(removeOrder(order.orderId));
//     dispatch(addOrder(order));
//     dispatch(addToCart(order));
//     navigate('/');
//   };
//   if (orders.length === 0) {
//     return <p>{t("no_orders_available")}</p>;
//   }

//   return (
//     <div>
//       <h2>{t('order_list')}</h2>
//       <ul>
//         {orders.map(order => (
//           <li key={order.orderId}>
//             <h3>{t('order_id')}: {order.orderId}</h3>
//             <p>{order.description}</p>
//             <p>{t('quantity')}: {order.quantity}</p>
//             <button onClick={() => handleEdit(order)}>{t('edit')}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderList;
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
