import { ApiResponse } from '../types';
import { apiService } from './apiService';
import { urls } from '../constants';
import { IOrder, IPaginationRes, IQuery } from '../interfaces';

const orderService = {
    getAll: (query: IQuery): ApiResponse<IPaginationRes<IOrder>> =>
        apiService.get(urls.orders.base, { params: query }),
};

export { orderService };
