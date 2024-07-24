// // // import React, { useState } from "react";
// // // import { useDispatch } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import { login } from "./slices/authSlice";

// // // const Login = ({ onLogin }) => {
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const navigate = useNavigate();
// // //   const [loginAttempted, setLoginAttempted] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const dispatch = useDispatch();

// // //   const handleLogin = (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       if (username === "user" && password === "password") {
// // //         const token = "dummytoken123"; // Placeholder token for simulation
// // //         localStorage.setItem("token", token); // Store token in local storage

// // //         dispatch(login({ token })); // Update Redux state with login action
// // //         setTimeout(() => {
// // //           navigate("/");
// // //         }, 1000); // Delay navigation for 1 second
// // //       } else {
// // //         setError("Invalid username or password");
// // //       }
// // //     } catch (error) {
// // //       console.error("Login error:", error);
// // //       setError("Failed to login. Please try again.");
// // //     } finally {
// // //       setLoginAttempted(true);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Login</h2>
// // //       <form onSubmit={handleLogin}>
// // //         <input
// // //           type="text"
// // //           value={username}
// // //           onChange={(e) => setUsername(e.target.value)}
// // //           placeholder="Username"
// // //         />
// // //         <input
// // //           type="password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           placeholder="Password"
// // //         />
// // //         <button type="submit">Login</button>
// // //       </form>
// // //       {loginAttempted && !error && (
// // //         <p style={{ color: "green" }}>Login successful!</p>
// // //       )}
// // //       {loginAttempted && error && <p style={{ color: "red" }}>{error}</p>}
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // // // <form onSubmit={handleLogin}>
// // // //   <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
// // // //   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
// // // //   <button type="submit">Login</button>

// // import React, { useState } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import axiosInstance from './axiosConfig';
// // const Login = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');
// //   const navigate = useNavigate();
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axiosInstance.post('/login', { username, password });
// //       // Store token in localStorage
// //       const token =localStorage.setItem('authToken', response.data.token);
// //       setMessage('Login successful');
// //       console.log('Login successful:', token);
// //       navigate("/");
// //     } catch (error) {
// //       setMessage('Invalid username or password');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
// //         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //         <button type="submit">Login</button>
// //       </form>
// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import axiosInstance from './axiosConfig';
// import { login } from './slices/authSlice';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleLogin = async () => {
//     try {
//     //   const response = await axiosInstance.post('/api/login', { username, password });
//     //   const { token, role } = response.data;
//     //   dispatch(login({ token, role }));
//     //   if (role === 'admin') {
//     //     history.push('/admin/products');
//     //   } else {
//     //     history.push('/user/products');
//     //   }
//     // } catch (error) {
//     //   console.error('Login error:', error);
//     // }
//     const response = await axiosInstance.post('/login', { username, password });
//       const { token } = response.data;
//       const decodedToken = jwtDecode(token);
//       dispatch(login({ token, role: decodedToken.role }));
//       history.push('/products');
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
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
