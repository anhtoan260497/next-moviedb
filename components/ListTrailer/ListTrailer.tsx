import { TrailerItems } from '@/features/MovieSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import TrailerItem from '../TrailerItem/TrailerItem';
import styles from './ListTrailer.module.scss'

function ListTrailer() {
    const trailerItems: any = useSelector<RootState>(state => state.movieSlice.trailers)
    const typeOfTrailer: any = useSelector<RootState>(state => state.toggleSlice.chooseTrailers)
    const containerRef = useRef<HTMLInputElement>(null)

    const renderTrailerItem = () => {
        if (typeOfTrailer === '' || Object.keys(trailerItems).length === 0) return
        return trailerItems[typeOfTrailer].map((item: TrailerItems) => <TrailerItem key={item.id} poster_path={item.poster_path} name={item.name} video_name={item.video_name} path={item.path} id={item.id} type={typeOfTrailer} />)
    }

    useEffect(() => {
        if (containerRef.current !== null) {
            containerRef.current.classList.remove(styles.active)
        }

         setTimeout(() => {
            if (containerRef.current !== null) {
                containerRef.current.classList.add(styles.active)
            }
        }, 500)
    },[typeOfTrailer])

    

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.scrollContainer} >
                {typeOfTrailer && renderTrailerItem()}
            </div>
        </div>
    );
}

export default ListTrailer;