import clsx from 'clsx';
import React from 'react';
import styles from './Pagination.module.scss'

function Pagination() {
    return (
        <div className={styles.container}>
            <div className={styles.pagination}>
                <button className={clsx(styles.page, styles.active)}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
                ...
                <button className={styles.page}>
                    1
                </button>
                <button className={styles.page}>
                    1
                </button>
            </div>
        </div>
    );
}

export default Pagination;