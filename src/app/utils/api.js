import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '@/app/config/config';

const api = axios.create({
    baseURL: Config.apiBaseUrl,
});

// Adding a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
      // Get the token from cookies
      const token = Cookies.get('token');              
      if (token) {
        // Set the Authorization header if the token exists
        config.headers.Authorization = `Bearer ${token}`;

      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default api;