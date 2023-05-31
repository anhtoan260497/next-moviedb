import React, { useState } from 'react';
import styles from './PageType.module.scss'
import FilterPageType from '../FilterPageType/FilterPageType';
import ListFilmPageType from '../ListFilmPageType/ListFilmPageType';

function PageType() {

    const [isFocusSort,setIsFocusSort] = useState(false)

    const handleSetIsFocusSort = () => {
        setIsFocusSort(!isFocusSort)
    }

 

    return (
        <div className={styles.containerFluid} >
            <div className={styles.container} onClick={() => {
                if(!isFocusSort) return
                setIsFocusSort(false)
            }}>
                <p className={styles.title}>Popular Movies</p>
                <div className={styles.pageContent}>
                    <FilterPageType handleSetIsFocusSort={handleSetIsFocusSort} isFocusSort={isFocusSort}/>
                    <ListFilmPageType />
                </div>
            </div>
        </div>
    );
}

export default PageType;