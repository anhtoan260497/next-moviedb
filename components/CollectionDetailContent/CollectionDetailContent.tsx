import { CastItemInterface, CrewItem, getCreditMovie } from '@/features/MovieInfoSlice';
import { RootState } from '@/store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CrewCollection from '../CrewCollection/CrewCollection';
import ListCollection from '../ListCollection/ListCollection';
import styles from './CollectionDetailContent.module.scss'

function CollectionDetailContent() {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const id = useSelector<RootState, number>(state => state.movieInfoSlice?.info?.parts?.[0].id || 0)
    const crews = useSelector<RootState,CrewItem[]>( state => state.movieInfoSlice.crew)
    const casts = useSelector<RootState,CastItemInterface[]>( state => state.movieInfoSlice.cast)

    useEffect(()=> {
        dispatch(getCreditMovie({
            type: 'movie',
            id: id.toString()
        }))
    },[])

    return (
        <div>
            <CrewCollection actors={casts} title='Featured Cast' />
            <CrewCollection actors={crews} title='Featured Crew' />
            <ListCollection />
        </div>
    );
}

export default CollectionDetailContent;