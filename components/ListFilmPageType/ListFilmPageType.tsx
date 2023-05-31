import React from 'react';
import styles from './ListFilmPageType.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MovieInfo } from '@/features/MovieInfoSlice';
import MovieItem from '../MovieItem/MovieItem';
import { useRouter } from 'next/router';


function ListFilmPageType() {

    const listFilm = useSelector<RootState, MovieInfo[]>(state => state.pageTypeSlice.listMovie || [])
    const router =  useRouter()
    const type = router.query.type
    const renderMovieItem = () => {
        return listFilm.length > 0 ? listFilm.map((item) => {
            return <MovieItem key={item.id} poster={item.poster_path || ''} date={item.release_date || item.first_air_date || ''}
                type={type as string}
                name={item.name || item.title || ''} voteAverage={item.vote_average || 0} id={item.id || 0} pageType/>
        }
        ) : ''
    }
    return (
        <div className={styles.container}>
            {renderMovieItem()}
        </div>
    )
}

export default ListFilmPageType;