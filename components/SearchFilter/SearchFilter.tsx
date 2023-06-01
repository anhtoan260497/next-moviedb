import { searchData, SearchItem, setFilter, setIsLoading, setTotalPages } from '@/features/SearchInfoSlice';
import { RootState } from '@/store/store';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchFilter.module.scss'

function SearchFilter() {
    const router = useRouter()
    const type = useSelector<RootState, string>(state => state.searchInfoSlice.filter)
    const searchResult = useSelector<RootState, searchData>(state => state.searchInfoSlice.searchResult)
    const filter = useSelector<RootState, string>(state => state.searchInfoSlice.filter)
    const [searchResultsArr, setSearchResultArr] = useState<SearchItem[]>([])
    const currentPage = useSelector<RootState, number>(state => state.searchInfoSlice.currentPage)
    const dispatch = useDispatch()

    useEffect(() => {
        setSearchResultArr(Object.values(searchResult))
    }, [searchResult])

    const handleChangeOption = (option: string) => {
        dispatch(setFilter(option))
        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 1000); 
        dispatch(setTotalPages(searchResult[option].totalPages))
    }

    const createLinkFilter = (filter: string) => {
        const query = router.query.query
        return `/search?query=${query}&page=1&type=${filter}`
    }


    const renderOptions = () => {
        return searchResultsArr.map((item: SearchItem) =>
        (currentPage !== 1 ? <a href={createLinkFilter(item.type)} className={clsx(styles.option, item.type === type && styles.active)} key={item.type}>
            <span>{item.type}</span>
            <span className={styles.number}>{item.totalResults}</span>
        </a> : <li className={clsx(styles.option, item.type === type && styles.active)} key={item.type} onClick={() => handleChangeOption(item.type)}>
            <span>{item.type}</span>
            <span className={styles.number}>{item.totalResults}</span>
        </li>)
        )
    }

    const renderOptionsMobile = () => {
        return searchResultsArr.map((item: SearchItem) => (
            currentPage !== 1 ? <a href={createLinkFilter(item.type)} className={clsx(styles.optionMobile, item.type === type && styles.isActive)} key={item.type}>
                <span className={styles.type}>{item.type}</span>
                <span className={styles.number}>{item.totalResults}</span>
            </a> : <a href={createLinkFilter(item.type)} className={clsx(styles.optionMobile, item.type === type && styles.isActive)} key={item.type} onClick={() => handleChangeOption(item.type)}>
                <span className={styles.type}>{item.type}</span>
                <span className={styles.number}>{item.totalResults}</span>
            </a>
        ))
    }


    return (
        <div className={styles.container}>
            <p className={styles.title}>Search Results</p>
            <ul className={clsx(styles.options, styles.desktop)}>
                {renderOptions()}
            </ul>
            <div className={clsx(styles.scrollContainer)}>
                <ul className={styles.optionsMobile}>
                    {renderOptionsMobile()}
                </ul>
            </div>
        </div>
    );
}

export default SearchFilter;