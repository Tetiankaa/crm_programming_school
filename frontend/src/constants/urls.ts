const baseURL = 'http://localhost:4000';

const login = '/auth/login';
const refresh = '/auth/refresh';

const managers = '/managers';

const orders = '/orders';
const groups = '/groups';
const statuses = '/statuses';
const courses = '/courses';
const course_formats = '/course-formats';
const course_types = '/course-types';
const download = '/download';
const comment = '/addComment';

const urls = {
    auth: {
        login,
        refresh,
    },
    orders: {
        base: orders,
        groups: `${orders}${groups}`,
        statuses: `${orders}${statuses}`,
        courses: `${orders}${courses}`,
        course_formats: `${orders}${course_formats}`,
        course_types: `${orders}${course_types}`,
        download: `${orders}${download}`,
        addComment: (id: number) => `${orders}/${id}${comment}`,
    },
    managers: {
        base: managers,
        me: `${managers}/me`,
    },
};

export { baseURL, urls };
