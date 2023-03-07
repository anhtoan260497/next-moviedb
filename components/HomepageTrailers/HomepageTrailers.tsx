import React from 'react';
import ListTrailer from '../ListTrailer/ListTrailer';
import ToggleOptions from '../ToggleOptions/ToggleOptions';
import styles from './HomepageTrailers.module.scss'


function HomepageTrailers() {

    const options =
        [{
            id: 'tv',
            name: 'On TV'
        }, {
            id: 'movie',
            name: 'Theaters'
        }]
       
    return (
        <div className={styles.container} style={{backgroundImage:"url(' https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')"}}>
            <div className={styles.header}>
                <p className={styles.title}>Trailers</p>
                <ToggleOptions options={options} type="trailers" title='Trailers' isTrailerToggle />
            </div>
            <ListTrailer /> 
        </div>
    );
}

export default HomepageTrailers;