import React from 'react';
import TrailerItem from '../TrailerItem/TrailerItem';
import styles from './ListTrailer.module.scss'

function ListTrailer() {
    return (
        <div className={styles.container}>
            <div className={styles.scrollContainer}>
                <TrailerItem />
                <TrailerItem />
                <TrailerItem />
                <TrailerItem />
                <TrailerItem />
                <TrailerItem />
                <TrailerItem />
            </div>
        </div>
    );
}

export default ListTrailer;