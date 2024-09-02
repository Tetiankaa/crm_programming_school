export interface IPaginationRes<T> {
    page: number;
    limit: number;
    totalCount: number;
    data: T;
}
