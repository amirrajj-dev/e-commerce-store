import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_BACKEND_URL : '/api',
  withCredentials: true,
});

export default api;
