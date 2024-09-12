import { FC, useEffect, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import style from '../OrdersContainer/Order.module.css';

interface IProps {
    page: number;
    limit: number;
    totalPages: number;
    setSearchParams: SetURLSearchParams;
}

const Pagination: FC<IProps> = ({
    totalPages,
    page,
    limit,
    setSearchParams,
}) => {
    const EDGE_PAGE_DISPLAY_LIMIT = 7;
    const CENTER_VISIBLE_PAGES = 5;

    const [allPages, setAllPages] = useState<number[]>([]);

    useEffect(() => {
        const pages = [];
        let start: number;
        let end: number;

        if (totalPages <= CENTER_VISIBLE_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= Math.floor(EDGE_PAGE_DISPLAY_LIMIT / 2)) {
                start = 1;
                end = EDGE_PAGE_DISPLAY_LIMIT;
            } else if (
                page >=
                totalPages - Math.floor(EDGE_PAGE_DISPLAY_LIMIT / 2)
            ) {
                start = totalPages - EDGE_PAGE_DISPLAY_LIMIT + 1;
                end = totalPages;
            } else {
                start = page - Math.floor(CENTER_VISIBLE_PAGES / 2);
                end = page + Math.floor(CENTER_VISIBLE_PAGES / 2);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        setAllPages(pages);
    }, [page, limit, totalPages]);

    const selectPage = (selectedPage: number) => {
        setSearchParams((prev) => {
            prev.set('page', `${selectedPage}`);
            return prev;
        });
    };
    return (
        <nav className={style.NavLinks}>
            <ul className="pagination">
                {page !== 1 && (
                    <li className={`page-item`}>
                        <span
                            className={`page-link ${style.ListItem}`}
                            onClick={() => selectPage(page - 1)}
                        >
                            &laquo;
                        </span>
                    </li>
                )}
                {allPages[0] > 1 && (
                    <>
                        <li className={`page-item`}>
                            <span
                                className={`page-link ${style.ListItem}`}
                                onClick={() => selectPage(1)}
                            >
                                1
                            </span>
                        </li>
                        {allPages[0] > 2 && (
                            <li className="page-item">
                                <span className={`page-link ${style.ListItem}`}>
                                    ...
                                </span>
                            </li>
                        )}
                    </>
                )}

                {allPages.map((item) => (
                    <li className={`page-item`} key={item}>
                        <span
                            className={`page-link ${style.ListItem} 
                            ${page === item && style.ListActive}`}
                            onClick={() => selectPage(item)}
                        >
                            {item}
                        </span>
                    </li>
                ))}
                {allPages[allPages.length - 1] < totalPages && (
                    <>
                        {allPages[allPages.length - 1] < totalPages - 1 && (
                            <li className="page-item">
                                <span className={`page-link ${style.ListItem}`}>
                                    ...
                                </span>
                            </li>
                        )}
                        <li className="page-item">
                            <span
                                className={`page-link ${style.ListItem}`}
                                onClick={() => selectPage(totalPages)}
                            >
                                {totalPages}
                            </span>
                        </li>
                    </>
                )}

                {page < totalPages && (
                    <li className="page-item">
                        <span
                            className={`page-link ${style.ListItem}`}
                            onClick={() => selectPage(page + 1)}
                        >
                            &raquo;
                        </span>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export { Pagination };
