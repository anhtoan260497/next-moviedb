import { Icon } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './RecommendationItem.module.scss'
import DateRangeIcon from '@mui/icons-material/DateRange';
import clsx from 'clsx';
import { MovieInfo } from '@/features/MovieInfoSlice';

function RecommendationItem({ media_type, id, poster_path, backdrop_path, title, vote_average = 0 }: MovieInfo) {
    const [isHover, setIsHover] = useState(false)

    return (
        <a href={`/${media_type ? media_type : 'tv'}/${id}`} className={styles.recommendItem}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} width={250} height={140} src={`https://www.themoviedb.org/t/p/w500_and_h282_face${backdrop_path || poster_path}`} onMouseEnter={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} alt={title || 'film'} />
                <div className={clsx(styles.imageDate, isHover && styles.active)}><Icon className={styles.icon} component={DateRangeIcon} /> 11/10/2022</div>
            </div>
            <div className={styles.nameAndRate}>
                <p className={styles.name}>{title}</p>
                <p className={styles.rate}>{Math.floor(vote_average * 10)}%</p>
            </div>
        </a>
    );
}

export default RecommendationItem;