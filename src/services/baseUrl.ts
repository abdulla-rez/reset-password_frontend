import axios from 'axios';

const commonAPI = axios.create({
  baseURL: 'https://reset-password-backend-3.onrender.com/auth',
  headers: { 'Content-Type': 'application/json' },
});

export default commonAPI;
