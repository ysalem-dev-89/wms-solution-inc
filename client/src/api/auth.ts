import { Credential } from '../interfaces/CredentialInterface';
import axios from './axios';

export const signInApi = async (data: Credential) => {
  const res = await axios.post('/auth/login', data);

  return res.data.user;
};

export const logOut = async () => {
  const res = await axios.get('/auth/logout');

  return res.data;
};

export const checkToken = async () => {
  const res = await axios.post('/auth/token');

  return res.data.user;
};
