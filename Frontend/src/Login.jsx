import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Updated import for useNavigate
import './App.css';
import axiosInstance from './axiosConfig';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated hook

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/token', { username, password });
      const {token} = response.data;
     // dispatch(login({ authtoken}));
      console.log(token);
      localStorage.setItem("token",token);
      alert('Login sucessful!🥳');
      navigate('/home'); // Updated navigation
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    

<div className="login-container">
      <div className="login-form">
<h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>

  );
};

export default Login;
