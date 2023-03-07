import Image from 'next/image';
import React from 'react';
import styles from './TrailerItem.module.scss'

TrailerItem.propTypes = {

};

function TrailerItem() {
    return (
        <div className={styles.container}>
            <div className={styles.posterContainer}>
                <Image className={styles.poster} src={'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg'} width={300} height={160} alt="the lust of ass" />
                <Image className={styles.playButton} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg' width={60} height={60} alt='playButton'/> 
            </div>
            <p>The Last of Us</p>
            <p>Episode 9 Review</p>
        </div>
    );
}

export default TrailerItem;