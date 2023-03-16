import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './CollectionActorItem.module.scss'

function CollectionActorItem({ profilePath, actorName, characterName }: { profilePath: string, actorName: string, characterName: string }) {

    const [profilePathSrc, setProfilePath] = useState(`https://www.themoviedb.org/t/p/w128_and_h128_face${profilePath}`)

    useEffect(() => {
        setProfilePath(`https://www.themoviedb.org/t/p/w128_and_h128_face${profilePath}`)
    }, [profilePath])

    return (
        <div className={styles.crewItem}>
            <Image src={profilePathSrc} alt={actorName || ''} width={60} height={60} onError={() => setProfilePath('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg')} />
            <div className={styles.nameContainer}>
                <p className={styles.actorName}>{actorName}</p>
                <p className={styles.characterName}>{characterName}</p>
            </div>
        </div>
    );
}

export default CollectionActorItem;