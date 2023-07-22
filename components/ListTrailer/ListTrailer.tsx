import { TrailerItems } from '@/features/MovieSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import TrailerItem from '../TrailerItem/TrailerItem';
import styles from './ListTrailer.module.scss'

const trailers = {
    tv: [
        {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/57clBMPX25NNO6nmDw3TV3zQaQE.jpg',
            name: 'Secret Invasion',
            video_name: 'Hulu Promo',
            id: '114472',
            path: 'zR8XYqhichI'
        },
        {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/uMoO0foD2oLQ0hY0ppb0oaryV4v.jpg',
            name: 'The Summer I Turned Pretty',
            video_name: 'Season 2 Official Trailer',
            id: '194766',
            path: 'AOPE3mvYjRk'
        },
        {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/vV5LKWmuysEe5wsuZJGbdiL5XJ2.jpg',
            name: 'The Walking Dead: Dead City',
            video_name: 'Official Teaser Trailer',
            id: '194583',
            path: 'Zu2z-SY3hCk'
        },
        {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/mAJ84W6I8I272Da87qplS2Dp9ST.jpg',
            name: 'Dirty Linen',
            video_name: 'Dirty Linen | Full Trailer',
            id: '202250',
            path: 'kceO0BuiygI'
        },
    ],
    movie: [
        {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/gJjSWUYHCulhJS5LBQmEEKmkpyD.jpg',
            name: 'Ruby Gillman, Teenage Kraken',
            video_name: 'Watch at Home on 7/18',
            id: '1040148',
            path: 'Uu-e_TBlxjA'
        }, {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/1kSpSW5geG01phAYENdFeWDZXMy.jpg',
            name: 'Mission: Impossible - Dead Reckoning Part One',
            video_name: 'This mission is fully loaded',
            id: '575264',
            path: 'iaZO3yRF1bk'
        }, {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/hPcP1kv6vrkRmQO3YgV1H97FE5Q.jpg',
            name: 'Insidious: The Red Door',
            video_name: 'Philippines Spot 13',
            id: '614479',
            path: 'jEWfbNMA07I'
        }, {
            poster_path: 'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
            name: 'Barbie',
            video_name: 'Kicking off Summer with Barbie and Ken',
            id: '346698',
            path: '0BJi-Uhzqgk'
        },
    ]
}


function ListTrailer() {
    // const trailerItems: any = useSelector<RootState>(state => state.movieSlice.trailers)
    const trailerItems:any = trailers
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
    }, [typeOfTrailer])



    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.scrollContainer} >
                {typeOfTrailer && renderTrailerItem()}
            </div>
        </div>
    );
}

export default ListTrailer;