import {CastItemInterface } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import CastItem from '../CastItem/CastItem';
import styles from './Cast.module.scss'

function Cast() {

    const cast = useSelector<RootState, CastItemInterface[]>(state => state.movieInfoSlice.cast)

    const renderCastItem = () => {
       return cast.map((item:CastItemInterface) => {
            return <CastItem key={item.id} profile_path={item.profile_path}  character={item.character || item.original_name} name={item.name}/>
        })
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Series Cast</p>
            <div className={styles.castContainer}> 
                <div className={styles.castContainerScroll}>
                   {renderCastItem()}
                </div>
            </div>
        </div>
    );
}

export default Cast;