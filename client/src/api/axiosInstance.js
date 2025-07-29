
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mlanadtuskers.onrender.com/api', 
  withCredentials: true
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
