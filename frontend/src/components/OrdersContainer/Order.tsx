import { FC, useState } from 'react';

import style from './Order.module.css';
import { IOrder } from '../../interfaces';
import { formatDateToUkrainianLocale } from '../../utils';
import { Comments } from './Comments';

interface IProps {
    order: IOrder;
}
const Order: FC<IProps> = ({ order }) => {
    const {
        id,
        age,
        sum,
        course,
        course_format,
        course_type,
        email,
        created_at,
        name,
        group_name,
        manager_name,
        phone,
        status,
        surname,
        alreadyPaid,
        utm,
        msg,
        comments,
    } = order;

    const [showInfo, setShowInfo] = useState<boolean>(false);

    const rowColor =
        Number(id) % 2 === 0
            ? `${style.TableRowDark}`
            : `${style.TableRowLight}`;
    const expandedRowColor = showInfo ? rowColor : '';

    return (
        <>
            <tr
                onClick={() => setShowInfo((prevState) => !prevState)}
                className={`${style.TableRow} ${rowColor}`}
            >
                <td scope="row">{id}</td>
                <td>{!name ? '-' : name}</td>
                <td>{!surname ? '-' : surname}</td>
                <td>{!email ? '-' : email}</td>
                <td>{!phone ? '-' : phone}</td>
                <td>{!age ? '-' : age}</td>
                <td>{!course ? '-' : course}</td>
                <td>{!course_format ? '-' : course_format}</td>
                <td>{!course_type ? '-' : course_type}</td>
                <td>{!status ? '-' : status}</td>
                <td>{!sum ? '-' : sum}</td>
                <td>{!alreadyPaid ? '-' : alreadyPaid}</td>
                <td>{!group_name ? '-' : group_name}</td>
                <td>
                    {!created_at
                        ? '-'
                        : formatDateToUkrainianLocale(created_at)}
                </td>
                <td>{!manager_name ? '-' : manager_name}</td>
            </tr>
            {showInfo && (
                <tr>
                    <td
                        colSpan={15}
                        className={`${style.ExpandedCell} ${expandedRowColor}`}
                    >
                        <div className="d-flex flex-column ms-3 w-100">
                            <div className="d-flex justify-content-between mb-2">
                                <div className="me-4">
                                    <p>Message: {msg || '-'}</p>
                                    <p>UTM: {utm || '-'}</p>
                                </div>
                                {
                                    <Comments
                                        comments={comments}
                                        orderId={id}
                                        managerName={manager_name}
                                    />
                                }
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export { Order };
