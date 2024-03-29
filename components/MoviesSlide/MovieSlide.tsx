import { MovieList } from '@/pages';
import { RootState } from '@/store/store';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MovieSlide.module.scss'

interface MovieSlideType {
    type: string
}

function MovieSlide({ type }: MovieSlideType) {

    const movies: any = useSelector<RootState>(state => type === 'trending' ? state.movieSlice.trending : state.movieSlice.popular)
    const choose = useSelector<RootState, string>(state => type === 'trending' ? state.toggleSlice.chooseTrending : state.toggleSlice.choosePopular ) 
    const containerRef = useRef<HTMLInputElement>(null)
    const renderMovieItem = () => {
        return movies.map((item: MovieList) => <MovieItem key={item.id} poster={item.poster_path} date={item.release_date || item.first_air_date}
            name={item.name || item.title} voteAverage={item.vote_average} type={item.media_type ? item.media_type : choose === 'movie' ? 'movie' : 'tv' } id={item.id} />)
    }

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current != null) {
                containerRef.current.classList.add(styles.active)
            }
        }, 200);
    })

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.scrollContainer}>
                {renderMovieItem()}
            </div>
        </div>
    );
}

export default MovieSlide;