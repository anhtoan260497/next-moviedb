import { CastItemInterface } from '@/features/MovieInfoSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './CastItem.module.scss'

function CastItem({ profile_path, character, name = '' }: CastItemInterface) {

    const [profilePath, setProfilePath] = useState(`https://www.themoviedb.org/t/p/w276_and_h350_face${profile_path}`)

    useEffect(() => {
        setProfilePath(`https://www.themoviedb.org/t/p/w276_and_h350_face${profile_path}`)
    },[profile_path])

    return (
        <div className={styles.container}>
            <Image src={profilePath} alt={name} width={130} height={175} 
            onError={() => setProfilePath('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg')} />
            <p className={styles.actorName}>{name}</p>
            <p className={styles.characterName}>{character}</p>
        </div>
    );
}

export default CastItem;