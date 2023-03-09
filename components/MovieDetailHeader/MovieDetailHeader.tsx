import { calculateRuntime, progressColor } from '@/helper';
import { CircularProgress, Icon } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from './MovieDetailHeader.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { MovieInfo } from '@/pages/[type]/[id]';

function MovieDetailHeader({ backdrop_path, poster_path, original_title = '', 
adult, release_date, genres, runtime = 0, vote_average = 0, overview, tagline}: MovieInfo) {
    const voteAverage = 3.0

    const renderGenres = () => {
        return (genres?.map(item => item.name))?.join(', ')
    }

    return (
        <div className={styles.containerFluid} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})` }}>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={original_title} width={300} height={450} />
                <div className={styles.movieInfoContainer}>
                    <h1>{original_title}</h1>
                    <div className={styles.info}>
                        <div className={styles.certification}>{adult ? 'M' : 'PG-13'}</div>
                        •<p>{release_date} (US)</p>
                        •<p>{renderGenres()}</p>
                        •<p>{calculateRuntime(runtime)}</p>
                    </div>
                    <div className={styles.scoreAndTrailer}>
                        <div className={styles.userScoreContainer}>
                            <div className={styles.progress}>
                                <p className={styles.percentValue}>{Math.floor(vote_average * 10)}
                                    <span className={styles.percentIcon}>%</span>
                                </p>
                                <CircularProgress style={{ color: progressColor(vote_average * 10), backgroundColor: 'rgb(8,28,34)', borderRadius: '50%', position: 'relative', zIndex: '2' }} variant="determinate" value={Math.round(vote_average * 10)} thickness={3} size={70} />
                            </div>
                            <p className={styles.userScoreLabel}>User<br />Score</p>
                        </div>
                        <div className={styles.playTrailer}>
                            <Icon component={PlayArrowIcon} />
                            Play Trailer
                        </div>
                    </div>
                    <p className={styles.quotes}>{tagline}</p>
                    <div className={styles.overviewContainer}>
                        <h3 className={styles.overviewTitle}>Overview</h3>
                        <p className={styles.overview}>{overview}</p>
                    </div>
                    <div className={styles.directorContainer}>
                        <div className={styles.directorInfo}>
                            <p className={styles.directorName}>Nicholas D. Johnson</p>
                            <p className={styles.directorCast}>Director, Screenplay</p>
                        </div>
                        <div className={styles.directorInfo}>
                            <p className={styles.directorName}>Nicholas D. Johnson</p>
                            <p className={styles.directorCast}>Director, Screenplay</p>
                        </div>
                        <div className={styles.directorInfo}>
                            <p className={styles.directorName}>Nicholas D. Johnson</p>
                            <p className={styles.directorCast}>Director, Screenplay</p>
                        </div>
                        <div className={styles.directorInfo}>
                            <p className={styles.directorName}>Nicholas D. Johnson</p>
                            <p className={styles.directorCast}>Director, Screenplay</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailHeader;
