import { MovieInfo } from '@/features/MovieInfoSlice';
import { setFilter } from '@/features/SearchInfoSlice';
import { RootState } from '@/store/store';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchFilter.module.scss'

interface mediaTypeOptions {
    movie: number,
    tv: number,
    [key: string]: number | string,
    isActive: string,
}

function SearchFilter() {

    const searchResult = useSelector<RootState, MovieInfo[]>(state => state.searchInfoSlice.searchResult)
    const [chooseOptions, setChooseOptions] = useState<mediaTypeOptions>({ movie: 0, tv: 0, isActive: 'movie' })
    const dispatch = useDispatch()

    useEffect(() => {
        const choosOptionsCount = { ...chooseOptions }
        searchResult.map(item => { item.media_type === 'movie' ? choosOptionsCount.movie += 1 : choosOptionsCount.tv += 1 })
        setChooseOptions(choosOptionsCount)
    }, [searchResult])

    const handleChangeOption = (option:string) => {
        const chooseOptionsClone = {...chooseOptions, isActive : option}
        setChooseOptions(chooseOptionsClone)
        dispatch(setFilter(option))
    }


    const renderOptions = () => {
        const options = []
        for (let item in chooseOptions) {
            if (item === 'isActive') continue
            options.push(
                <li className={clsx(styles.option, item === chooseOptions.isActive && styles.active)} key={item} onClick={() => handleChangeOption(item)}>
                    <span>{item}</span>
                    <span className={styles.number}>{chooseOptions[item]}</span>
                </li>
            )
        }
        return options
    }


    return (
        <div className={styles.container}>
            <p className={styles.title}>Search Results</p>
            <ul className={styles.options}>
                {renderOptions()}
            </ul>
        </div>
    );
}

export default SearchFilter;