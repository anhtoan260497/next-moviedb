import { MovieInfo } from '@/features/MovieInfoSlice';
import { progressColor } from '@/helper';
import { RootState } from '@/store/store';
import { CircularProgress } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import {useSelector } from 'react-redux';
import styles from './CollectionDetailHeader.module.scss'

function CollectionDetailHeader() {
    
    const info = useSelector<RootState, MovieInfo>(state => state.movieInfoSlice.info)

    const {backdrop_path, poster_path, name, genres, tagline, overview, parts} = info
    
    const renderGenres = () => {
        return (genres?.map(item => item.name))?.join(', ')
    }

    const voteAverage = parts && (parts.reduce((res,nex) => res += nex.vote_average || 0 , 0) / (parts?.length || 1 )) || 0

    return (
        <>
        <div className={clsx(styles.imageMobile)} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces${backdrop_path})` }}>
            <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={name || ''} width={98} height={150} />
        </div>
        <div className={styles.containerFluid} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})` }}>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={name || ''} width={300} height={450} />
                <div className={styles.movieInfoContainer}>
                    <h1>{name}</h1>
                   { genres && <div className={styles.info}>
                        <p>{renderGenres()}</p>
                    </div>}
                    <div className={styles.scoreAndTrailer}>
                        <div className={styles.userScoreContainer}>
                            <div className={styles.progress}>
                                <p className={styles.percentValue}>{Math.floor(voteAverage * 10)}
                                    <span className={styles.percentIcon}>%</span>
                                </p>
                                <CircularProgress style={{ color: progressColor(voteAverage * 10), backgroundColor: 'rgb(8,28,34)', borderRadius: '50%', position: 'relative', zIndex: '2' }} variant="determinate" value={Math.round(voteAverage * 10)} thickness={3} size={70} />
                            </div>
                            <p className={styles.userScoreLabel}>User<br />Score</p>
                        </div>
                    </div>
                    <p className={styles.quotes}>{tagline || ''}</p>
                    <div className={styles.overviewContainer}>
                        <h3 className={styles.overviewTitle}>Overview</h3>
                        <p className={styles.overview}>{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default CollectionDetailHeader;