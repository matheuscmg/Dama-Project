import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'http://localhost:80/api';
instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.withCredentials = true;

export default instance