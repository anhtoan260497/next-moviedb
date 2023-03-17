import { searchData, SearchItem, setFilter, setTotalPages } from '@/features/SearchInfoSlice';
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
        dispatch(setTotalPages(searchResult[filter].totalPages))
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


    return (
        <div className={styles.container}>
            <p className={styles.title}>Search Results</p>
            {/* <ul className={styles.options}>
                {renderOptions()}
            </ul> */}
            <div className={styles.scrollContainer}>
                <ul className={styles.optionsMobile}>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                    <li className={styles.optionMobile}>
                        <span>Movies</span>
                        <span>1088</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SearchFilter;