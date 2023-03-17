import { CastItemInterface, CrewItem } from '@/features/MovieInfoSlice';
import Image from 'next/image';
import React from 'react';
import CollectionActorItem from '../CollectionActorItem/CollectionActorItem';
import styles from './CrewCollection.module.scss'

function CrewCollection({ actors, title }: { actors: CrewItem[] | CastItemInterface[], title : string }) {  
    
    const renderActors = () => {
        return actors.map((item, key) => (<CollectionActorItem key={key} profilePath={item.profile_path || ''} actorName={item.name || ''} characterName={item.character || item.known_for_department || ''} />))
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.crewContainer}>
                {renderActors()}
            </div>
        </div>
    );
}

export default CrewCollection;