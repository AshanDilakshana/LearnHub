import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const loginWithEmail = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const registerWithEmail = (name: string, email: string, password: string) =>
  api.post('/auth/register', { name, email, password });

export const loginWithOAuth = (provider: string) => {
  window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
};

export const getUser = (id: string, token: string) =>
  api.get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = (id: string, user: any, token: string) =>
  api.put(`/users/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });

export const getAllPosts = () => 
  api.get('/posts'); 