import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token')?.replace(/"/g, '');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default api;