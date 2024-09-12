import { EOrderFieldsAsc, EOrderFieldsDesc } from '../enums';

export interface IQuery {
    page?: string;
    limit?: string;
    order?: EOrderFieldsDesc | EOrderFieldsAsc;
}
