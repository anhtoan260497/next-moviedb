import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import styles from './HomepageSearch.module.scss'

interface HomepageSearchData {
    backgroundImage: string
}

function HomepageSearch({ backgroundImage }: HomepageSearchData) {

    const [input,setInput] =  useState('')

    const hanleChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const style = {
        backgroundImage: `url('${process.env.NEXT_PUBLIC_HEADER_IMG}${backgroundImage}')`
    }
    return (
        <div className={styles.homepageSearchContainer} style={style} >
            <div className={styles.homepageSearchTitle}>
                <p className={styles.homepageSearchTitleFirst}>Welcome.</p>
                <p className={styles.homepageSearchTitleSecond}>Millions of movies, TV shows and people to discover. Explore now.</p>
            </div>

            <div className={styles.HomepageSearchInput}>
                <input className={clsx(styles.HomepageSearchInputField,styles.desktop)} onChange={e => hanleChangeValue(e)} placeholder='Search for a movie, tv show, person...' />
                <input className={clsx(styles.HomepageSearchInputField,styles.mobile)} onChange={e => hanleChangeValue(e)} placeholder='Search...' />
                <button className={styles.HomepageSearchButton}>Search</button>
            </div>
        </div>
    );
}

export default HomepageSearch;
// https://image.tmdb.org/t/p/w1920/h600_multi_faces_filter(duotone,00192f,00baff)/22z44LPkMyf5nyyXvv8qQLsbom.jpg