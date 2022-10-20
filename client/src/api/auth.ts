import { Credential } from '../interfaces/CredentialInterface';
import axios from './axios';

export const signInApi = (data: Credential) => axios.post('/signin', data);
