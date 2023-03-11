import React, { useState } from 'react';
import styles from './Recommendations.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MovieInfo } from '@/features/MovieInfoSlice';
import RecommendationItem from '../RecommendationItem/RecommendationItem';

function Recommendations() {

    const recommendationFilms = useSelector<RootState, MovieInfo[]>(state => state.movieInfoSlice.recommendationFilms)
    console.log(recommendationFilms)

    const renderRecommendationFilms = () => {
        return recommendationFilms.map(item => {
            return (
                <RecommendationItem key={item.id} media_type={item.media_type || 'tv'} id={item.id} backdrop_path={item.backdrop_path} poster_path={item.poster_path} title={item.title} vote_average={item.vote_average} />
            )
        })
    }

    return (
        <>
            {recommendationFilms.length > 0 ? <div className={styles.container}>
                <h3 className={styles.title}>Recommendations</h3>
                <div className={styles.content}>
                    <div className={styles.contentScroll}>
                        {renderRecommendationFilms()}
                    </div>
                </div>
            </div> : ''}
        </>
    );
}

export default Recommendations;