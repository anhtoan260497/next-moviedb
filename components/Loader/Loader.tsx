import React, { CSSProperties } from 'react';
import styles from './Loader.module.scss'

interface Style{
    style ?: CSSProperties
}

function Loader({style} : Style) {
    

    return (
        <div className={styles.ldsRing} style={style}><div></div><div></div><div></div><div></div></div>
    );
}

export default Loader;