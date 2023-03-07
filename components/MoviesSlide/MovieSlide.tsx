import { MovieList } from '@/pages';
import { RootState } from '@/store/store';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MovieSlide.module.scss'


function MovieSlide() {

    const movies: any = useSelector<RootState>(state => state.movieSlice.trending)
    const containerRef = useRef<HTMLInputElement>(null)
    console.log(containerRef.current)
    const renderMovieItem = () => {
    
        return movies.map((item: MovieList) => <MovieItem poster={item.poster_path} date={item.release_date}
            name={item.original_title} voteAverage={item.vote_average} />)
    }

    useEffect(() => {
       setTimeout(() => {
        if(containerRef.current != null){
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