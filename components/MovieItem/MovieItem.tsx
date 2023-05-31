import { progressColor } from '@/helper';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from './MovieItem.module.scss'
import clsx from 'clsx';

interface MovieItemProps {
    poster: string,
    voteAverage: number,
    name : string,
    date : string
    type : string,
    id : number
    pageType : boolean,
}

function MovieItem({ poster, voteAverage, name, date,type = 'tv' , id, pageType =  false}: MovieItemProps) {

    return (
        <div className={ clsx(styles.container, pageType && styles.pageTypeContainer)}>
            <a href={`/${type}/${id}`}><Image className={styles.poster} src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster}`} alt='icon' width={150} height={150} /></a>
            <div className={styles.progressContainer}>
                <CircularProgress variant="determinate" value={Math.round(voteAverage * 10)} thickness={3} size={35} sx={{ position: 'absolute', bottom: '-10px', left: '10px', color: progressColor(voteAverage * 10), backgroundColor: 'rgb(8,28,34)', borderRadius: '50%' }} />
                <p className={styles.processPercent}>{Math.round(voteAverage * 10)}%</p>
            </div>

            <p className={styles.name}>{name}</p>
            <p className={styles.date}>{date}</p>
        </div>
    );
}

export default MovieItem;