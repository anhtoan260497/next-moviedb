import React from "react";
import ToggleOptions from "../ToggleOptions/ToggleOptions";
import styles from './HomepageSlideOptions.module.scss'

interface Options {
    options: OptionItem[]
}

interface OptionItem {
    name: string,
    id: string
}


const HomepageTrending = ({options}:Options,listfilm : string[]) => {
 return (
    <div className={styles.container}>
        <div className={styles.optionsContainer}>
            <p className={styles.title}>Trending</p>
            <ToggleOptions options={options} />
        </div>
    </div>
 )
}

export default HomepageTrending