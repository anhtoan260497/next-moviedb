import { ExternalIds, getExternalIds, getRecommendationFilms, getReviewsMovie, MovieInfo } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cast from '../CastSlide/Cast';
import MovieFacts from '../MovieFacts/MovieFacts';
import Recommendations from '../Recommendations/Recommendations';
import SeasonInfo from '../SeasonInfo/SeasonInfo';
import Social from '../Social/Social';
import SocialLink from '../SocialLink/SocialLink';
import styles from './MovieDetailContent.module.scss'
function MovieDetailContent() {

    const info =  useSelector<RootState, MovieInfo>(state => state.movieInfoSlice.info)
    const externalIds = useSelector<RootState, ExternalIds>(state => state.movieInfoSlice.externalIds)
    
    const router = useRouter()
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    useEffect(()=> {
        dispatch(getReviewsMovie({type : router.query.type, id : router.query.id}))
        dispatch(getRecommendationFilms({type : router.query.type, id : router.query.id}))
        dispatch(getExternalIds({type : router.query.type, id : router.query.id}))
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
            <div className={styles.rightContainer}>
               {Object.keys(externalIds).length > 0 && <SocialLink />}
               <MovieFacts />
            </div>
        </div>
    );
}

export default MovieDetailContent;