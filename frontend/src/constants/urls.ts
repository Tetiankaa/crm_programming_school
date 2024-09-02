const baseURL = 'http://localhost:4000';

const login = '/auth/login';
const refresh = '/auth/refresh';

const orders = '/orders';

const urls = {
    auth: {
        login,
        refresh,
    },
    orders: {
        base: orders,
    },
};

export { baseURL, urls };
