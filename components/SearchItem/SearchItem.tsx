import { MovieInfo } from '@/features/MovieInfoSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './SearchItem.module.scss'

function SearchItem({ original_title, original_name, release_date, first_air_date, overview, poster_path, type, id }: MovieInfo) {

    const [path, setPath] = useState(`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${poster_path}`)

    useEffect(() => {
        setPath(`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${poster_path}`)
    }, [poster_path])

    return (
        <a href={`/${type}/${id}`} className={styles.container}>
            <Image src={path} alt='poster' width={94} height={140} onError={() => setPath('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg')} />
            <div className={styles.content}>
                <p className={styles.title}>{original_title || original_name}</p>
                <p className={styles.date}>{release_date || first_air_date}</p>
                <p className={styles.description}>{overview}</p>
            </div>
        </a>
    );
}

export default SearchItem;