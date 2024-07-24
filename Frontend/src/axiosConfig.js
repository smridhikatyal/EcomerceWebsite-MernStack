import axios from 'axios';

// Create an instance of axios with the base URL set to your backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/', // Backend URL for your Node.js server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Authorization header if the token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling responses
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Any status code that lies within the range of 2xx will trigger this function
//     return response;
//   },
//   (error) => {
//     // Any status codes that fall outside the range of 2xx will trigger this function
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
