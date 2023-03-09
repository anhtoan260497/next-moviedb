import { TrailerItems } from '@/features/MovieSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ListTrailer from '../ListTrailer/ListTrailer';
import ToggleOptions from '../ToggleOptions/ToggleOptions';
import styles from './HomepageTrailers.module.scss'


function HomepageTrailers() {

    const hoverTrailerItem = useSelector<RootState, TrailerItems>(state => state.movieSlice.hoverTrailerItem)
    const trailerItems:any = useSelector<RootState>(state => state.movieSlice.trailers)
    const choose = useSelector<RootState, string>(state => state.toggleSlice.chooseTrailers)

    const [style, setStyle] = useState({})

    useEffect(() => {
        setTimeout(() => {
            setStyle({ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces${hoverTrailerItem.poster_path})` })
        }, 200);
    }, [hoverTrailerItem])

    useEffect(()=>{
        if(!trailerItems?.[choose]) return
        setTimeout(() => {
            setStyle({ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces${trailerItems[choose][0].poster_path})` })
        }, 200);
    },[choose, trailerItems])

    const options =
        [{
            id: 'tv',
            name: 'On TV'
        }, {
            id: 'movie',
            name: 'In Theaters'
        }]

    return (
        <div className={styles.container} style={style}>
            <div className={styles.header}>
                <p className={styles.title}>Trailers</p>
                <ToggleOptions options={options} type="trailers" title='Trailers' isTrailerToggle />
            </div>
            <ListTrailer />
        </div>
    );
}

export default HomepageTrailers;