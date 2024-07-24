import { React, useState } from "react";
import { useTranslation } from "react-i18next";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Cart from "./Cart.jsx";
import ProductList from "./ProductList.jsx";

import Header from './Header.jsx';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  //const cartItems = useSelector((state) => state.cart);
  //const orders = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
  };

//  alert('hello'+isLoggedIn)
//   if (!isLoggedIn) {
//     return <Login onLogin={setIsLoggedIn} />;
//   }

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="App">
      <Header onProfileClick={handleProfileClick} onLogout={handleLogout} />
      <div className="main-section">
        <div className="product-list">
          <ProductList />
        </div>
        <div className="cart">
          <Cart  />
        </div>
      </div>
    </div>
  );
};

export default App;
/* <header>
        <select onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Esphanol</option>
          <option value="hi">हिंदी</option>
          {/* Add more language options here */

