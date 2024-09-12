import { ECourse, ECourseFormat, ECourseType, EOrderStatus } from '../enums';

export interface IOrder {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: ECourse;
    course_format: ECourseFormat;
    course_type: ECourseType;
    status: EOrderStatus;
    sum: number;
    alreadyPaid: number;
    created_at: Date;
    utm: string;
    msg: string;
    manager_name: string;
    group: string;
}
