import { MovieInfo } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';
import styles from './SearchResult.module.scss'

function SearchResult() {

    const searchResult = useSelector<RootState, MovieInfo[]>(state => state.searchInfoSlice.searchResult)
    console.log(searchResult)
    
    const renderSearchItem = () => {
        if(searchResult.length === 0) return 
        return searchResult.map((item, key) => <SearchItem key={key} original_name={item.original_name} original_title={item.original_title} release_date={item.release_date} first_air_date={item.first_air_date} overview={item.overview} poster_path={item.poster_path} type={item.media_type} id={item.id}   />)
    }

    return (
        <div className={styles.container}>
          {renderSearchItem()}
        </div>
    );
}

export default SearchResult;