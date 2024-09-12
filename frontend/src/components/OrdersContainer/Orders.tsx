import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderActions } from '../../redux/slices';
import { EOrderFieldsAsc, EOrderFieldsDesc } from '../../enums';
import { Order } from './Order';
import style from './Order.module.css';
import { Spinner } from '../SpinnerContainer';
import { ApiError } from '../ErrorContainer';
import { Pagination } from '../PaginationContainer';

const Orders = () => {
    const { manager } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        limit: '25',
        order: '-id',
    });

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const order = searchParams.get('order') as
        | EOrderFieldsAsc
        | EOrderFieldsDesc;

    const { error, isLoading, orders } = useAppSelector((state) => state.order);

    const handleOrderBy = (selectedOrder: EOrderFieldsAsc) => {
        if (!order.startsWith('-') && selectedOrder === order) {
            setSearchParams((prev) => {
                prev.set('order', `-${selectedOrder}`);
                return prev;
            });
        } else {
            setSearchParams((prev) => {
                prev.set('order', selectedOrder);
                return prev;
            });
        }
    };

    useEffect(() => {
        dispatch(orderActions.getAll({ query: { limit, page, order } }));
    }, [dispatch, limit, order, page]);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <ApiError error={error} />
            ) : (
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                {Object.values(EOrderFieldsAsc).map((value) => (
                                    <th
                                        scope="col"
                                        key={value}
                                        className={style.TableHead}
                                        style={{
                                            backgroundColor: '#a927ba',
                                            color: 'white',
                                        }}
                                        onClick={() => handleOrderBy(value)}
                                    >
                                        {value}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {orders &&
                                !isLoading &&
                                orders.data.map((item) => (
                                    <Order key={item.id} order={item} />
                                ))}
                        </tbody>
                    </table>
                    <Pagination
                        page={orders?.page}
                        limit={orders?.limit}
                        totalPages={Math.ceil(
                            orders?.totalCount / orders?.limit
                        )}
                        setSearchParams={setSearchParams}
                    />
                </div>
            )}
        </>
    );
};

export { Orders };
