import {MovieInfo, SeasonInfoInterface } from '@/features/MovieInfoSlice';
import { premieredString } from '@/helper';
import { RootState } from '@/store/store';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SeasonInfo.module.scss'

function SeasonInfo() {
    const info =  useSelector<RootState, MovieInfo>( state => state.movieInfoSlice.info)

    const renderOverview = () => {
            return premieredString(info.first_air_date || '2023/01/01', info.original_name || '', info?.seasons?.[0]?.name || '')
    }

    console.log(info)

    return (
        <div className={styles.container}>
            <p className={styles.title}>Current Season</p>
            <div className={styles.seasonContainer}>
                <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w260_and_h390_bestv2${info.poster_path}`} width={130} height={190} alt='the lust of ass' />
                <div className={styles.seasonInfo}>
                    <div className={styles.seasonNumber}>
                        <p className={styles.number}>Season 1</p>
                        <div className={styles.yearAndEpisode}>
                            <p>{info.first_air_date?.split('-')?.[0]}</p>|
                            <p>{info.seasons?.[info.seasons?.length-1 || 0]?.episode_count} {info.seasons?.[info.seasons?.length-1 || 0]?.episode_count || 0 > 1 ? 'episode' : 'episodes'}</p> 
                        </div>
                    </div>
                    <p>{renderOverview()}</p>
                </div>
            </div>
        </div>
    );
}

export default SeasonInfo;