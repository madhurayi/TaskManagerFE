import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the base URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

