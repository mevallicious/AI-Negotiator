import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-negotiator-499y.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;