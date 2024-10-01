import { FC } from 'react';

import { IOrder } from '../../interfaces';
import { formatDateToUkrainianLocale } from '../../utils';

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
        group,
        manager_name,
        phone,
        status,
        surname,
        alreadyPaid,
    } = order;

    return (
        <tr>
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
            <td>{!group ? '-' : group}</td>
            <td>
                {!created_at ? '-' : formatDateToUkrainianLocale(created_at)}
            </td>
            <td>{!manager_name ? '-' : manager_name}</td>
        </tr>
    );
};

export { Order };
