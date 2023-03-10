import { calculateRuntime, progressColor } from '@/helper';
import { CircularProgress, Icon } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from './MovieDetailHeader.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CrewItem, getCreditMovie, getTrailersMovie, MovieInfo, VideoItem } from '@/features/MovieInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setChoosingTrailer, setModalTrailers } from '@/features/MovieSlice';

function MovieDetailHeader() {
    const movieInfoData = useSelector<RootState, MovieInfo>(state => state.movieInfoSlice.info)
    const { backdrop_path, poster_path, original_title = '', original_name = '', original_language, first_air_date, episode_run_time = [],
        adult, release_date, genres, runtime = 0, vote_average = 0, overview, tagline, id, origin_country = [] } = movieInfoData
    const trailerVideo = useSelector<RootState, VideoItem>(state => state.movieInfoSlice.trailer)
    const crews = useSelector<RootState, CrewItem[]>(state => state.movieInfoSlice.crew)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const router = useRouter()

    const renderGenres = () => {
        return (genres?.map(item => item.name))?.join(', ')
    }

    const renderCrew = () => {
        const crewDirector = crews.filter(item => item.job.includes('Creator') || item.job.includes('Director') || item.job.includes('Screenplay') )
        const crewDirectorLimit = crewDirector.filter((item,key) => key < 6)
        return crewDirectorLimit.map(item => {
            return (
                <div className={styles.directorInfo}>
                <p className={styles.directorName}>{item.name}</p>
                <p className={styles.directorCast}>{item.job}</p>
            </div>
            )
        })
    }

    useEffect(() => {
        const { type, id } = router.query
        dispatch(getTrailersMovie({
            type: type,
            id: id,
        }))
        dispatch(getCreditMovie({
            type: type,
            id: id,
        }))
    }, [])

    const openTrailer = () => {
        dispatch(setChoosingTrailer({
            poster_path,
            name: original_title,
            video_name: trailerVideo.name,
            id,
            path: trailerVideo.key
        }))

        dispatch(setModalTrailers(true))
    }

    return (
        <div className={styles.containerFluid} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})` }}>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={original_title} width={300} height={450} />
                <div className={styles.movieInfoContainer}>
                    <h1>{original_title || original_name}</h1>
                    <div className={styles.info}>
                        <div className={styles.certification}>{adult ? 'M' : 'PG-13'}</div>
                        •<p className={styles.languages}>{release_date || first_air_date} {`(${origin_country[0] || original_language})`}</p>
                        •<p>{renderGenres()}</p>
                        •{<p>{runtime ? calculateRuntime(runtime) : calculateRuntime(episode_run_time[0])}</p>}
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
                        {trailerVideo.id && <button className={styles.playTrailer} onClick={openTrailer}>
                            <Icon component={PlayArrowIcon} />
                            Play Trailer
                        </button>}
                    </div>
                    <p className={styles.quotes}>{tagline}</p>
                    <div className={styles.overviewContainer}>
                        <h3 className={styles.overviewTitle}>Overview</h3>
                        <p className={styles.overview}>{overview}</p>
                    </div>
                    <div className={styles.directorContainer}>
                    {renderCrew()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailHeader;
