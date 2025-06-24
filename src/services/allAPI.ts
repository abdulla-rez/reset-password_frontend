import commonAPI from "./baseUrl";


export const signupAPI = (data: { name: string; email: string; password: string }) =>
  commonAPI.post('/signup', data);

export const loginAPI = (data: { email: string; password: string }) =>
  commonAPI.post('/login', data);

export const requestResetAPI = (data: { email: string }) =>
  commonAPI.post('/request-reset', data);

export const resetPasswordAPI = (token: string, password: string) =>
  commonAPI.post(`/reset-password/${token}`, { password });
