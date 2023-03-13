import { MovieInfo } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchFilter.module.scss'

interface mediaTypeOptions {
    [key: string]: number,
}

function SearchFilter() {

    const searchResult = useSelector<RootState, MovieInfo[]>(state => state.searchInfoSlice.searchResult)
    const [chooseOptions, setChooseOptions] = useState<mediaTypeOptions>({})

    useEffect(() => {
        const mediaTypeArr = searchResult.map(item => item.media_type)
        const mediaTypeOptions: mediaTypeOptions = {}
        mediaTypeArr.map((item: string = '') => !mediaTypeOptions[item] ? mediaTypeOptions[item] = 1 :mediaTypeOptions[item] += 1)
        setChooseOptions(mediaTypeOptions)
    }, [searchResult])

    const checkingAddClassActive = (keyActive : number, key:number) => {
        if(keyActive && keyActive === key) return true
        if(!keyActive && key === 0) return true 
        return false 
    }


    const renderOptions = (keyActive ?: number) => {
        const options = []
        for(let item in chooseOptions) {
            options.push({
                name : item,
                value : chooseOptions[item],
            })
        }
        return options.map((item, key) => {
            return (
                <li className={clsx(styles.option, checkingAddClassActive(keyActive = 0,key) ? styles.active : '')} key={key}>
                    <span>{item.name}</span>
                    <span className={styles.number}>{item.value}</span>
                </li>
            )
        })
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