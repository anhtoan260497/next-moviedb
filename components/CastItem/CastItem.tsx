import { CastItemInterface } from '@/features/MovieInfoSlice';
import Image from 'next/image';
import React from 'react';
import styles from './CastItem.module.scss'

function CastItem({profile_path, character, name = ''} : CastItemInterface) {
    return (
        <div className={styles.container}>
            <Image src={`https://www.themoviedb.org/t/p/w276_and_h350_face${profile_path}`} alt={name} width={130} height={175} />
            <p className={styles.actorName}>{name}</p>
            <p className={styles.characterName}>{character}</p>
        </div>
    );
}

export default CastItem;