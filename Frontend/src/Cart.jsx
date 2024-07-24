import React from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig";
import { removeFromCart, updateCartItem } from "./slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCartItem = (productId, quantity) => {
    dispatch(updateCartItem({ id: productId, quantity }));
  };

  

  const handleOrder = async (item) => {
    // Prepare order data
    const orderData = {
      userId: userId,
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        status: 'inStock'
      })),
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    try {
      // Send order data to backend
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post("/orders", orderData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 200) {
      cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
      alert("Order placed successfully!");
      navigate("/order-list");
    } else {
      console.error("Unexpected response:", response);
      alert("Failed to place order. Please try again.");
    }
  }catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Error:", error.response.data);
      alert(`Failed to place order: ${error.response.data.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
      alert("Failed to place order. No response received.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("General Error:", error.message);
      alert(`Failed to place order: ${error.message}`);
    }
    }
  };

  return (
    <div>
      <h2>{t('Cart')}</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>
              {item.title} - {t('quantity')}: {item.quantity}
            </p>
            <button
              onClick={() => handleUpdateCartItem(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button
              onClick={() => handleUpdateCartItem(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              {t('remove')}
            </button>
            <button onClick={() => handleOrder(item)}>{t('order')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

