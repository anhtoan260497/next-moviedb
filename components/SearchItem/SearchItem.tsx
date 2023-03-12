import { MovieInfo } from '@/features/MovieInfoSlice';
import Image from 'next/image';
import React from 'react';
import styles from './SearchItem.module.scss'

function SearchItem({original_title, original_name, release_date, first_air_date, overview, poster_path} : MovieInfo) {
    return (
        <div className={styles.container}>
            <Image src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${poster_path}`} alt='poster' width={94} height={140} />
            <div className={styles.content}>
                <p className={styles.title}>{original_title || original_name}</p>
                <p className={styles.date}>{release_date || first_air_date}</p>
                <p className={styles.description}>{overview}</p>
            </div>
        </div>
    );
}

export default SearchItem;