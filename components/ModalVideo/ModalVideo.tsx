import React, { useEffect } from 'react';
import styles from './ModalVideo.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModalTrailers, TrailerItems } from '@/features/MovieSlice';
import { RootState } from '@/store/store';

ModalVideo.propTypes = {

};

function ModalVideo() {

    const choosingTrailer = useSelector<RootState, TrailerItems>(state => state.movieSlice.choosingTrailer)
    const dispatch =  useDispatch()
    const handleClickClose = () => {
        dispatch(setModalTrailers(false))
    }


    return (
        <div className={styles.container}>
            <div className={styles.closeButton}>
                <p className={styles.title}>{choosingTrailer.name}</p>
                <button className={styles.closeIcon} onClick={handleClickClose}><Icon style={{fill:'white'}} component={CloseIcon} /></button>
                </div>
            <iframe className={styles.video} src={`https://www.youtube.com/embed/${choosingTrailer.path}`} title={choosingTrailer.name} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

export default ModalVideo;