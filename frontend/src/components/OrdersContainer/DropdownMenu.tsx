import { ChangeEvent } from 'react';

import { IQuery } from '../../interfaces';

interface IProps<T> {
    selectName: keyof IQuery;
    items: T[];
    handleOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    searchParam: string | number;
    placeholder: string;
    itemKey: keyof T;
    itemLabel: keyof T;
}

const DropdownMenu = <T extends Record<string, any>>({
    selectName,
    items,
    handleOptionChange,
    searchParam,
    placeholder,
    itemKey,
    itemLabel,
}: IProps<T>) => {
    return (
        <div className={'col-md-2'}>
            <select
                className="form-select"
                name={selectName}
                onChange={handleOptionChange}
                value={searchParam || ''}
            >
                <option value={''}>{placeholder}</option>
                {items.map((item) => (
                    <option
                        key={item[itemKey]}
                        value={
                            selectName === 'group'
                                ? item[itemKey]
                                : item[itemLabel]
                        }
                    >
                        {item[itemLabel]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { DropdownMenu };
