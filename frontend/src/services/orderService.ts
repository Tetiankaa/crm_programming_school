import { ApiResponse } from '../types';
import { apiService } from './apiService';
import { urls } from '../constants';

const orderService = {
    getAll: (): ApiResponse<any> => apiService.get(urls.orders.base),
};

export { orderService };
