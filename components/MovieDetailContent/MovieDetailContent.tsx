import React from 'react';
import Cast from '../CastSlide/Cast';
import styles from './MovieDetailContent.module.scss'
function MovieDetailContent() {
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Cast />
            </div>
            <div className={styles.rightContainer}></div>
        </div>
    );
}

export default MovieDetailContent;