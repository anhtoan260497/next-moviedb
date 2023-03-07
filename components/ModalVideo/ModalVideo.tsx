import React from 'react';
import styles from './ModalVideo.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setModalTrailers } from '@/features/MovieSlice';

ModalVideo.propTypes = {

};

function ModalVideo() {

    const dispatch =  useDispatch()
    const handleClickClose = () => {
        dispatch(setModalTrailers(false))
    }

    return (
        <div className={styles.container}>
            <div className={styles.closeButton}><button className={styles.closeIcon} onClick={handleClickClose}><Icon component={CloseIcon} /></button></div>
            <iframe className={styles.video} src="https://www.youtube.com/embed/8SWhBsbxmpk" title="The Last of Us | Opening Credits | HBO Max" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

export default ModalVideo;