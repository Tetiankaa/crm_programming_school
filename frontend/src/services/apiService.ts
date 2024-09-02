import axios from 'axios';

import { baseURL } from '../constants';
import { authService } from './authService';
const apiService = axios.create({ baseURL });

apiService.interceptors.request.use((request) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});
export { apiService };
