import axios from 'axios';

const commonAPI = axios.create({
  baseURL: 'https://reset-password-backend-l1ns.onrender.com/auth',
  headers: { 'Content-Type': 'application/json' },
});

export default commonAPI;
