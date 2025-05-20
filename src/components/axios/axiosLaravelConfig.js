import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'http://localhost:8080';
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.withCredentials = true;

export const DAMA_URL = 'http://localhost:8080';

export function getSimpleHeader() {
  const token = sessionStorage.getItem('session-token');
  return {
    'Authorization': `${token}`,
    'Accept': 'application/json',
  };
}

export function getCompleteHeader() {
  const token = sessionStorage.getItem('session-token');
  return {
    'Authorization': `${token}`,
    'Accept': 'application/json',
    'Content-type': 'multipart/form-data',
  };
}

export default instance;
