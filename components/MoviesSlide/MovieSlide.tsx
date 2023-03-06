import { MovieList } from '@/pages';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MovieSlide.module.scss'


function MovieSlide() {

    const movies: any = useSelector<RootState>(state => state.movieSlice.trending)
    console.log(movies)
    const renderMovieItem = () => {
    
        return movies.map((item: MovieList) => <MovieItem poster={item.poster_path} date={item.release_date}
            name={item.original_title} voteAverage={item.vote_average} />)
    }

    return (
        <div className={styles.container}>
            <div className={styles.scrollContainer}>
                {renderMovieItem()}
            </div>
        </div>
    );
}

export default MovieSlide;