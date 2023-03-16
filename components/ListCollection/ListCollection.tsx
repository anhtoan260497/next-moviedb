import { MovieInfo } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ListCollection.module.scss'
import {premieredString} from '@/helper'

function ListCollection() {

    const listCollection = useSelector<RootState, MovieInfo[]>(state => state.movieInfoSlice.info.parts || [])

    const renderListCollection = () => {
        return listCollection.map((item,key) => (
            <a href={`/${item.media_type}/${item.id}`} key={key} className={styles.collectionItem}>
                <Image src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2/${item.poster_path}`} width={90} height={141} alt={item.name || ''} />
                <div className={styles.collectionInfo}>
                    <div className={styles.nameAndDate}>
                        <h3 className={styles.name}>{item.original_title}</h3>
                        <p className={styles.date}>{premieredString(item.release_date || '')}</p>
                    </div>
                    <p className={styles.overview}>{item.overview}</p>
                </div>
            </a>
        ))
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>{listCollection.length} Movies</p>
            <div className={styles.listContainer}>
                {renderListCollection()}
            </div>
        </div>
    );
}

export default ListCollection;