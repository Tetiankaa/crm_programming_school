import { ApiResponse } from '../types';
import { apiService } from './apiService';
import { urls } from '../constants';
import {
    ICourse,
    ICourseFormat,
    ICourseType,
    IGroup,
    IOrder,
    IOrderStatus,
    IPaginationRes,
    IQuery,
} from '../interfaces';

const orderService = {
    getAll: (query: IQuery): ApiResponse<IPaginationRes<IOrder>> =>
        apiService.get(urls.orders.base, { params: query }),
    getGroups: (): ApiResponse<IGroup[]> => apiService.get(urls.orders.groups),
    getStatuses: (): ApiResponse<IOrderStatus[]> =>
        apiService.get(urls.orders.statuses),
    getCourses: (): ApiResponse<ICourse[]> =>
        apiService.get(urls.orders.courses),
    getCourseFormats: (): ApiResponse<ICourseFormat[]> =>
        apiService.get(urls.orders.course_formats),
    getCourseTypes: (): ApiResponse<ICourseType[]> =>
        apiService.get(urls.orders.course_types),
    getExcelFile: (query: IQuery): ApiResponse<any> =>
        apiService.get(urls.orders.download, {
            params: query,
            responseType: 'blob',
        }),
    saveComment: (orderId: number, comment: string): ApiResponse<IOrder> =>
        apiService.post(urls.orders.addComment(orderId), { text: comment }),
};

export { orderService };
