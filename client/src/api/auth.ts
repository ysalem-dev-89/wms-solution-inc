import { Credential } from '../interfaces/CredentialInterface';
import instance from './axios';

const signInApi = (data: Credential) => instance.post('/signin', data);

export default signInApi;
