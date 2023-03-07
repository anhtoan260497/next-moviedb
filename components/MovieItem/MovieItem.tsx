import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from './MovieItem.module.scss'

interface MovieItemProps {
    poster: string,
    voteAverage: number,
    name : string,
    date : string
}

function MovieItem({ poster, voteAverage, name, date }: MovieItemProps) {
    
    console.log(date)

    const progressColor = (value: number) => {
        if (value < 30) return 'rgb(239,35,96)'
        if (value >= 30 && value < 70) return 'rgb(211,213,48)'
        if (value >= 70) return 'rgb(33,208,122)'
    }

    return (
        <div className={styles.container}>
            <Image className={styles.poster} src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster}`} alt='icon' width={150} height={150} />
            <div className={styles.progressContainer}>
                <CircularProgress variant="determinate" value={Math.round(voteAverage * 10)} thickness={3} size={35} sx={{ position: 'absolute', bottom: '-10px', left: '10px', color: progressColor(70), backgroundColor: 'rgb(8,28,34)', borderRadius: '50%' }} />
                <p className={styles.processPercent}>{Math.round(voteAverage * 10)}%</p>
            </div>

            <p className={styles.name}>{name}</p>
            <p className={styles.date}>{date}</p>
        </div>
    );
}

export default MovieItem;