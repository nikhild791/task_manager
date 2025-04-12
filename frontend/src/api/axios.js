import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // add token to request if it exists
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response?.status === 401) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //       window.location.href = '/signin';
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  
  export default api;
