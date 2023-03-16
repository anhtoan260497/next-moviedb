import { RootState } from '@/store/store';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss'

function Pagination() {
    const router = useRouter()
    const totalPages = useSelector<RootState, number>(state => state.searchInfoSlice.totalPages)
    const currentPages = useSelector<RootState, number>(state => state.searchInfoSlice.currentPage)
    const type = useSelector<RootState, string>(state => state.searchInfoSlice.filter)

    const createLinkPagination = (pageNumber: number) => {
        const query = router.query.query
        return `/search?query=${query}&page=${pageNumber}&type=${type}`
    }

    const renderPagination = () => {
        const pages = []
        if (totalPages > 1) {
            for (let i = currentPages; i <= currentPages + 4; i++) {
                if (currentPages === 1) {
                    pages.push(
                        <a href={createLinkPagination(i)} key={i + 2} className={clsx(styles.page, currentPages === i && styles.active)}>
                            {i}
                        </a>
                    )
                }
            }

            if (currentPages - 1 > 0 && currentPages + 1 < totalPages) {
                pages.unshift(
                    <a href={createLinkPagination(currentPages - 1)} key={currentPages - 1} className={clsx(styles.page)}>
                        {currentPages - 1}
                    </a>
                )
                pages.push(
                    <a href={createLinkPagination(currentPages)} key={currentPages} className={clsx(styles.page, styles.active)}>
                        {currentPages}
                    </a>
                )

                if (currentPages + 1 < totalPages) {
                    pages.push(
                        <a href={createLinkPagination(currentPages + 1)} key={currentPages + 1} className={clsx(styles.page)}>
                            {currentPages + 1}
                        </a>
                    )
                }
            }

            if (currentPages - 1 > 1) {
                pages.unshift(
                    <p key={'key-1'}>...</p>
                )
                pages.unshift(
                    <a href={createLinkPagination(1)} key='key-2' className={clsx(styles.page)}>
                        {1}
                    </a>
                )
            }

            if (currentPages === totalPages) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(
                        <a href={createLinkPagination(i)} key={i} className={clsx(styles.page, currentPages === i && styles.active)}>
                            {i}
                        </a>
                    )
                }
            }

            if (currentPages + 1 < totalPages) {
                pages.push(
                    <p key={'key'}>...</p>
                )
                pages.push(
                    <a href={createLinkPagination(totalPages)} key={totalPages} className={clsx(styles.page)}>
                        {totalPages}
                    </a>
                )
            }
        }

        if(totalPages === 1) {
            pages.push(
                <button key={totalPages} className={clsx(styles.page, styles.active)}>
                    {totalPages}
                </button>
            )
        }


        return pages
    }

    return (
        <div className={styles.container}>
            <div className={styles.pagination}>
                {renderPagination()}
            </div>
        </div>
    );
}

export default Pagination;