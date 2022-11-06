import axios from 'axios';
import config from '../config';

const { apiBaseUrl } = config;
const instance = axios.create({ baseURL: apiBaseUrl, withCredentials: true });

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
