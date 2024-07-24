import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ onProfileClick, onLogout }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header>
      <select onChange={handleLanguageChange} value={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="hi">Hindi</option>
      </select>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onProfileClick} className="profile-icon">Profile</button>
    </header>
  );
};

export default Header;
