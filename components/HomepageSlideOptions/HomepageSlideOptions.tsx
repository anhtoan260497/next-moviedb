import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import MovieSlide from "../MoviesSlide/MovieSlide";
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

    const isLoading = useSelector<RootState>(state => state.movieSlice.isLoading)
    console.log(isLoading)

 return (
    <div className={styles.container}>
        <div className={styles.optionsContainer}>
            <p className={styles.title}>Trending</p>
            <ToggleOptions options={options} />
        </div>
        {!isLoading ? <MovieSlide /> : <Loader style={{marginTop:'calc(160px / 2)'}}/>}
    </div>
 )
}

export default HomepageTrending