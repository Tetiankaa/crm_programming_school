import { ChangeEvent, FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import style from './Order.module.css';
import { ICreateGroup, IOrder, IOrderUpdate } from '../../interfaces';
import { formatDateToUkrainianLocale } from '../../utils';
import { Comments } from './Comments';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DropdownMenu } from './DropdownMenu';
import { groupValidator, orderValidator } from '../../validators';
import { orderActions } from '../../redux/slices';

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
    const [textInput, setTextInput] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { manager } = useAppSelector((state) => state.manager);
    const { groups, statuses, courses, course_formats, course_types } =
        useAppSelector((state) => state.order);

    const dispatch = useAppDispatch();

    const groupObj = groups.find((group) => group.name === group_name);

    const {
        register: orderRegister,
        reset: orderReset,
        handleSubmit: orderHandleSubmit,
        setValue: orderSetValue,
        watch: orderWatch,
        formState: { errors: orderErrors },
    } = useForm<IOrderUpdate>({
        mode: 'all',
        resolver: joiResolver(orderValidator),
        defaultValues: {
            group_id: groupObj?.id,
            status,
            course,
            course_format,
            course_type,
            sum,
            phone,
            age,
            surname,
            alreadyPaid,
            name,
            email,
        },
    });

    const {
        register: groupRegister,
        formState: { errors: groupErrors },
        handleSubmit: groupHandleSubmit,
        resetField: resetGroupField,
    } = useForm<ICreateGroup>({
        mode: 'onBlur',
        resolver: joiResolver(groupValidator),
    });

    useEffect(() => {
        orderReset({
            group_id: groupObj?.id,
            status: order.status,
            course: order.course,
            course_format: order.course_format,
            course_type: order.course_type,
            sum: order.sum,
            phone: order.phone,
            age: order.age,
            surname: order.surname,
            alreadyPaid: order.alreadyPaid,
            name: order.name,
            email: order.email,
        });
    }, [order, orderReset]);

    const rowColor =
        Number(id) % 2 === 0
            ? `${style.TableRowDark}`
            : `${style.TableRowLight}`;
    const expandedRowColor = showInfo ? rowColor : '';

    const handleOrderUpdate: SubmitHandler<IOrderUpdate> = (value) => {
        dispatch(orderActions.updateOrder({ id, order: value }));
        setIsModalOpen(false);
    };

    const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { name: inputName, value } = e.target;
        orderSetValue(inputName as keyof IOrderUpdate, value);
    };

    const handleGroupCreate: SubmitHandler<ICreateGroup> = (value) => {
        dispatch(orderActions.createGroup({ group: value }));
        setTextInput(false);
    };

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
                                <div>
                                    <p>Message: {msg || '-'}</p>
                                    <p>UTM: {utm || '-'}</p>
                                    <button
                                        type={'button'}
                                        className={`${manager_name !== null && manager_name !== manager.name ? style.DisabledButton : style.Button}`}
                                        disabled={
                                            manager_name !== null &&
                                            manager_name !== manager.name
                                        }
                                        style={{ marginLeft: 0 }}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Update order
                                    </button>
                                </div>

                                <div
                                    className={`${style.modalOverlay} ${
                                        isModalOpen
                                            ? style.modalOverlayActive
                                            : ''
                                    }`}
                                >
                                    <div className={style.modal}>
                                        <div className={style.modalContent}>
                                            <div className={style.modalHeader}>
                                                <h2
                                                    className={
                                                        style.modalHeaderTitle
                                                    }
                                                >
                                                    Update Order #{id}
                                                </h2>
                                                <button
                                                    className={style.modalClose}
                                                    onClick={() =>
                                                        setIsModalOpen(false)
                                                    }
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                            <div className={style.modalBody}>
                                                <form
                                                    onSubmit={orderHandleSubmit(
                                                        handleOrderUpdate
                                                    )}
                                                >
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="name"
                                                            className="form-label"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            id={'name'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={'Name'}
                                                            {...orderRegister(
                                                                'name'
                                                            )}
                                                        />
                                                        {orderErrors.name && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .name
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="surname"
                                                            className="form-label"
                                                        >
                                                            Surname
                                                        </label>
                                                        <input
                                                            id={'surname'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={
                                                                'Surname'
                                                            }
                                                            {...orderRegister(
                                                                'surname'
                                                            )}
                                                        />
                                                        {orderErrors.surname && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .surname
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="email"
                                                            className="form-label"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            id={'email'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={
                                                                'Email'
                                                            }
                                                            {...orderRegister(
                                                                'email'
                                                            )}
                                                        />
                                                        {orderErrors.email && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .email
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="phone"
                                                            className="form-label"
                                                        >
                                                            Phone
                                                        </label>
                                                        <input
                                                            id={'phone'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={
                                                                'Phone'
                                                            }
                                                            {...orderRegister(
                                                                'phone'
                                                            )}
                                                        />
                                                        {orderErrors.phone && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .phone
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="age"
                                                            className="form-label"
                                                        >
                                                            Age
                                                        </label>
                                                        <input
                                                            id={'age'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={'Age'}
                                                            {...orderRegister(
                                                                'age'
                                                            )}
                                                        />
                                                        {orderErrors.age && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .age
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="sum"
                                                            className="form-label"
                                                        >
                                                            Sum
                                                        </label>
                                                        <input
                                                            id={'sum'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={'Sum'}
                                                            {...orderRegister(
                                                                'sum'
                                                            )}
                                                        />
                                                        {orderErrors.sum && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .sum
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={'mb-3'}>
                                                        <label
                                                            htmlFor="alreadyPaid"
                                                            className="form-label"
                                                        >
                                                            Already paid
                                                        </label>
                                                        <input
                                                            id={'alreadyPaid'}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={
                                                                'Already paid'
                                                            }
                                                            {...orderRegister(
                                                                'alreadyPaid'
                                                            )}
                                                        />
                                                        {orderErrors.alreadyPaid && (
                                                            <div className="form-text text-danger">
                                                                {
                                                                    orderErrors
                                                                        .alreadyPaid
                                                                        .message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    {
                                                        <div className={'mb-3'}>
                                                            <label className="form-label">
                                                                Group
                                                            </label>
                                                            {textInput ? (
                                                                <div
                                                                    className={
                                                                        'mb-3'
                                                                    }
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder={
                                                                            'Group'
                                                                        }
                                                                        {...groupRegister(
                                                                            'name'
                                                                        )}
                                                                    />
                                                                    {groupErrors.name && (
                                                                        <div className="form-text text-danger">
                                                                            {
                                                                                groupErrors
                                                                                    .name
                                                                                    .message
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <DropdownMenu
                                                                    selectName={
                                                                        'group'
                                                                    }
                                                                    items={
                                                                        groups
                                                                    }
                                                                    handleOptionChange={
                                                                        handleDropdownChange
                                                                    }
                                                                    selectValue={orderWatch(
                                                                        'group_id'
                                                                    )}
                                                                    placeholder={
                                                                        'All groups'
                                                                    }
                                                                    itemKey={
                                                                        'id'
                                                                    }
                                                                    itemLabel={
                                                                        'name'
                                                                    }
                                                                    register={orderRegister(
                                                                        'group_id'
                                                                    )}
                                                                />
                                                            )}
                                                            {textInput ? (
                                                                <div>
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-success"
                                                                        onClick={groupHandleSubmit(
                                                                            handleGroupCreate
                                                                        )}
                                                                    >
                                                                        Add
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success ms-2"
                                                                        onClick={() => {
                                                                            setTextInput(
                                                                                false
                                                                            );
                                                                            resetGroupField(
                                                                                'name'
                                                                            );
                                                                        }}
                                                                    >
                                                                        Select
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    onClick={() =>
                                                                        setTextInput(
                                                                            true
                                                                        )
                                                                    }
                                                                >
                                                                    Add group
                                                                </button>
                                                            )}
                                                            {orderErrors.group_id && (
                                                                <div className="form-text text-danger">
                                                                    {
                                                                        orderErrors
                                                                            .group_id
                                                                            .message
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {
                                                        <>
                                                            <label className="form-label">
                                                                Status
                                                            </label>
                                                            <DropdownMenu
                                                                selectName={
                                                                    'status'
                                                                }
                                                                items={statuses}
                                                                handleOptionChange={
                                                                    handleDropdownChange
                                                                }
                                                                selectValue={orderWatch(
                                                                    'status'
                                                                )}
                                                                placeholder={
                                                                    'All statuses'
                                                                }
                                                                itemKey={'id'}
                                                                itemLabel={
                                                                    'status'
                                                                }
                                                                register={orderRegister(
                                                                    'status'
                                                                )}
                                                            />
                                                            {orderErrors.status && (
                                                                <div className="form-text text-danger">
                                                                    {
                                                                        orderErrors
                                                                            .status
                                                                            .message
                                                                    }
                                                                </div>
                                                            )}
                                                        </>
                                                    }
                                                    {
                                                        <>
                                                            <label className="form-label">
                                                                Course
                                                            </label>
                                                            <DropdownMenu
                                                                selectName={
                                                                    'course'
                                                                }
                                                                items={courses}
                                                                handleOptionChange={
                                                                    handleDropdownChange
                                                                }
                                                                selectValue={orderWatch(
                                                                    'course'
                                                                )}
                                                                placeholder={
                                                                    'All courses'
                                                                }
                                                                itemKey={'id'}
                                                                itemLabel={
                                                                    'courseName'
                                                                }
                                                                register={orderRegister(
                                                                    'course'
                                                                )}
                                                            />
                                                            {orderErrors.course && (
                                                                <div className="form-text text-danger">
                                                                    {
                                                                        orderErrors
                                                                            .course
                                                                            .message
                                                                    }
                                                                </div>
                                                            )}
                                                        </>
                                                    }
                                                    {
                                                        <>
                                                            <label className="form-label">
                                                                Course format
                                                            </label>
                                                            <DropdownMenu
                                                                selectName={
                                                                    'course_format'
                                                                }
                                                                items={
                                                                    course_formats
                                                                }
                                                                handleOptionChange={
                                                                    handleDropdownChange
                                                                }
                                                                selectValue={orderWatch(
                                                                    'course_format'
                                                                )}
                                                                placeholder={
                                                                    'All formats'
                                                                }
                                                                itemKey={'id'}
                                                                itemLabel={
                                                                    'format'
                                                                }
                                                                register={orderRegister(
                                                                    'course_format'
                                                                )}
                                                            />
                                                            {orderErrors.course_format && (
                                                                <div className="form-text text-danger">
                                                                    {
                                                                        orderErrors
                                                                            .course_format
                                                                            .message
                                                                    }
                                                                </div>
                                                            )}
                                                        </>
                                                    }
                                                    {
                                                        <>
                                                            <label className="form-label">
                                                                Course type
                                                            </label>
                                                            <DropdownMenu
                                                                selectName={
                                                                    'course_type'
                                                                }
                                                                items={
                                                                    course_types
                                                                }
                                                                handleOptionChange={
                                                                    handleDropdownChange
                                                                }
                                                                selectValue={orderWatch(
                                                                    'course_type'
                                                                )}
                                                                placeholder={
                                                                    'All types'
                                                                }
                                                                itemKey={'id'}
                                                                itemLabel={
                                                                    'type'
                                                                }
                                                                register={orderRegister(
                                                                    'course_type'
                                                                )}
                                                            />
                                                            {orderErrors.course_type && (
                                                                <div className="form-text text-danger">
                                                                    {
                                                                        orderErrors
                                                                            .course_type
                                                                            .message
                                                                    }
                                                                </div>
                                                            )}
                                                        </>
                                                    }

                                                    <div
                                                        className={
                                                            style.modalFooter
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                style.button
                                                            }
                                                            onClick={() =>
                                                                setIsModalOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type={'submit'}
                                                            className={
                                                                style.button
                                                            }
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Comments
                                    comments={comments}
                                    orderId={id}
                                    managerName={manager_name}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export { Order };
