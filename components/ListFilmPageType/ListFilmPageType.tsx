import React from 'react';
import styles from './ListFilmPageType.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MovieInfo } from '@/features/MovieInfoSlice';
import MovieItem from '../MovieItem/MovieItem';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import SearchItem from '../SearchItem/SearchItem';


function ListFilmPageType() {
    console.log(isMobile)

    const listFilm = useSelector<RootState, MovieInfo[]>(state => state.pageTypeSlice.listMovie || [])
    const router = useRouter()
    const type = router.query.type

    const renderMovieItem = () => {
        return listFilm.length > 0 ? listFilm.map((item) => {

            if (isMobile) {
                return listFilm.map((item, key) => <SearchItem key={key} original_name={item.name}
                    original_title={item.title} release_date={item.release_date} first_air_date={item.first_air_date}
                    overview={item.overview} poster_path={item.poster_path} type={''} id={item.id}
                />)
            }

            return <MovieItem key={item.id} poster={item.poster_path || ''} date={item.release_date || item.first_air_date || ''}
                type={type as string}
                name={item.name || item.title || ''} voteAverage={item.vote_average || 0} id={item.id || 0} pageType />
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