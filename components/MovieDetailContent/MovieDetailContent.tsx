import { getRecommendationFilms, getReviewsMovie, MovieInfo } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cast from '../CastSlide/Cast';
import Recommendations from '../Recommendations/Recommendations';
import SeasonInfo from '../SeasonInfo/SeasonInfo';
import Social from '../Social/Social';
import styles from './MovieDetailContent.module.scss'
function MovieDetailContent() {

    const info =  useSelector<RootState, MovieInfo>(state => state.movieInfoSlice.info)
    const router = useRouter()
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    useEffect(()=> {
        dispatch(getReviewsMovie({type : router.query.type, id : router.query.id}))
        dispatch(getRecommendationFilms({type : router.query.type, id : router.query.id}))
    },[])


    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Cast />
                <div className={styles.clear} />
                {info?.seasons && <SeasonInfo />}
                <Social />
                <Recommendations />
            </div>
            <div className={styles.rightContainer}></div>
        </div>
    );
}

export default MovieDetailContent;