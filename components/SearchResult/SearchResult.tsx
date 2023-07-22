import { MovieInfo } from '@/features/MovieInfoSlice';
import { searchData } from '@/features/SearchInfoSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import SearchItem from '../SearchItem/SearchItem';
import styles from './SearchResult.module.scss'

function SearchResult() {

    const searchResult = useSelector<RootState, searchData>(state => state.searchInfoSlice.searchResult)
    const filter = useSelector<RootState, string>(state => state.searchInfoSlice.filter)
    const isLoading =  useSelector<RootState, boolean>(state => state.searchInfoSlice.isLoadingChangeFilter)
    const [result, setResult] = useState<MovieInfo[]>([])

    useEffect(() => {
        const resultArr = Object.values(searchResult)
        const result = resultArr.filter(item => item.type === filter)
        if(result.length > 0 ) setResult(result[0].data)
    }, [searchResult,filter])

    const renderSearchItem = () => {
        if(result.length === 0 ) return <h3>No Result</h3> 
        return result.map((item, key) => <SearchItem key={key} original_name={item.name}
            original_title={item.title} release_date={item.release_date} first_air_date={item.first_air_date}
            overview={item.overview} poster_path={item.poster_path} type={filter} id={item.id}
        />)
    }

    return (
        <div className={styles.container}>
            <>
                { isLoading ? <Loader /> : renderSearchItem()}
            </>
        </div>
    );
}

export default SearchResult;