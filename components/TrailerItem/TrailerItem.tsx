import { setChoosingTrailer, setHoverTrailerItem, setModalTrailers, TrailerItems } from '@/features/MovieSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TrailerItem.module.scss'


function TrailerItem({ poster_path, name, video_name, path, id }: TrailerItems) {
    const dispatch = useDispatch()

    const handleClickTrailer = () => {
        dispatch(setModalTrailers(true))
        dispatch(setChoosingTrailer({poster_path, name, video_name, path, id}))
        // router.push(`/${path}`,undefined,{shallow: true})
    }

    const hoverItem = () => {
        const item = { poster_path, name, video_name, path, id }
        dispatch(setHoverTrailerItem(item))
    }

    return (
        <>
            <div className={styles.container} onMouseEnter={hoverItem}>
                <div className={styles.posterContainer} onClick={() => handleClickTrailer()}>
                    <Image className={styles.poster} src={`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${poster_path}`} width={300} height={160} alt={video_name} />
                    <Image className={styles.playButton} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg' width={60} height={60} alt='playButton' />
                </div>
                <p className={styles.videoName}>{video_name}</p>
                <p>{name}</p>
            </div>
        </>
    );
}

export default TrailerItem;