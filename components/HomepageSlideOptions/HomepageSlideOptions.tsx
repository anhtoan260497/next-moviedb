import { RootState } from "@/store/store";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import MovieSlide from "../MoviesSlide/MovieSlide";
import ToggleOptions from "../ToggleOptions/ToggleOptions";
import styles from './HomepageSlideOptions.module.scss'

export interface Options {
    options: OptionItem[],
    title ?: string,
    type : string,
    isTrailerToggle ?: boolean
}

export interface OptionItem {
    name: string,
    id: string
}


const HomepageTrending = ({options,title, type }:Options) => {

const isLoading:any = useSelector<RootState>(state => type === 'trending' ? state.movieSlice.isLoading : state.movieSlice.isLoadingPopular)
 return (
    <div className={styles.container}>
        <div className={styles.optionsContainer}>
            <p className={styles.title}>{title}</p>
            <ToggleOptions type={type} options={options} />
        </div>
        {!isLoading ? <MovieSlide type={type} /> : <Loader style={{marginTop:'calc(160px / 2)'}}/>}
    </div>
 )
}

export default HomepageTrending