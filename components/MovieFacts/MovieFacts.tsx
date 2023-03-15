import { MovieInfo } from '@/features/MovieInfoSlice';
import { convertRevenue } from '@/helper';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './MovieFacts.module.scss'

function MovieFacts() {

    const info = useSelector<RootState, MovieInfo>(state => state.movieInfoSlice.info)
    const companyProd = info?.production_companies?.[info?.production_companies.length - 1]
    const router = useRouter()

    return (
        <div className={styles.container}>
            {router.query.type === 'tv' && <h3 className={styles.movieTitle}>Facts</h3>}
            <div className={styles.status}>
                <p className={styles.statusTitle}>Status</p>
                <p className={styles.statusContent}>{info.status}</p>
            </div>

            {router.query.type === 'tv' && <div className={styles.status}>
                <p className={styles.statusTitle}>Network</p>
                <Image className={styles.image} src={`https://www.themoviedb.org/t/p/h60${companyProd?.logo_path}`} alt='icon' width={60} height={50} />
            </div>}

            {router.query.type === 'tv' && <div className={styles.status}>
                <p className={styles.statusTitle}>Type</p>
                <p className={styles.statusContent}>{info.type}</p>
            </div>}

            <div className={styles.status}>
                <p className={styles.statusTitle}>Original Language</p>
                <p className={styles.statusContent}>{info.spoken_languages?.[0]?.english_name}</p>
            </div>

            {router.query.type === 'movie' &&
                <>
                    <div className={styles.status}>
                        <p className={styles.statusTitle}>Budget</p>
                        <p className={styles.statusContent}>${convertRevenue(info.budget || 0)}</p>
                    </div>

                    {info.revenue ? <div className={styles.status}>
                        <p className={styles.statusTitle}>Revenue</p>
                        <p className={styles.statusContent}> ${convertRevenue(info.revenue || 0)}</p>
                    </div> : ''}
                </>}
        </div>
    );
}

export default MovieFacts;