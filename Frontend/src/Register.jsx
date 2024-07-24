import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Register.css';
import axiosInstance from "./axiosConfig";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/register", {
        username,
        password,
      });
      
      setMessage(response.data);
      console.log("Registration successful:", response.data);
      alert('Registration sucessful!🥳');
      navigate("/login");
    } catch (error) {
      setMessage("Error registering user");
    }
  };
  const onLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>Already Registered ?</p>
        <button onClick={onLogin}>Login</button>

      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
