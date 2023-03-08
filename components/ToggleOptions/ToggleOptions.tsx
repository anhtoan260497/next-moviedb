import { getPopular, getTrailers, getTrending } from "@/features/MovieSlice";
import { setChooseStore } from "@/features/ToggleSlice";
import { MovieList } from "@/pages";
import { RootState } from "@/store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "../HomepageSlideOptions/HomepageSlideOptions";
import styles from './ToggleOptions.module.scss'


const ToggleOptions = ({ options, type, isTrailerToggle }: Options) => {

    const choose = useSelector<RootState, string | void>(state => type === 'trending' ? state.toggleSlice.chooseTrending : type === 'trailers' ? state.toggleSlice.chooseTrailers : state.toggleSlice.choosePopular)
    const listPopular: any = useSelector<RootState>(state => state.movieSlice.popular)
    const [isLoadPoplularFirstTime, setIsLoadPopularFirstTime] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    useEffect(() => {
        if (type === 'trending') {
            dispatch(setChooseStore({ type, value: options[0].id }))
            dispatch(getTrending(options[0].id))
            return
        }

        if (type === 'popular') {
            dispatch(setChooseStore({ type, value: options[0].id }))
            dispatch(getPopular(options[0].id))
        }

        if(type === 'trailers'){
            dispatch(getTrailers())
            dispatch(setChooseStore({ type, value: options[0].id }))
        }
    }, [])


    const handleClickChoose = (id: string) => {
        if (choose === id) return
        dispatch(setChooseStore({ type, value: id }))
        if (type === 'trending') {
            dispatch(getTrending(id))
        }
        if (type === 'popular') {
            dispatch(getPopular(id))
        }

        if (type === 'trailers') {
         
        }
    }



    const renderToggleButton = () => {
        return options.map((item, key) => {
            return <button className={clsx(styles.optionItem, item.id === choose ? styles.isActive : '', isTrailerToggle && styles.trailers, isTrailerToggle && item.id === choose && styles.isActiveTrailer)} key={key} onClick={() => handleClickChoose(item.id)}>{item.name}</button>
        })
    }

    return (
        <div className={clsx(styles.container, isTrailerToggle && styles.containerTrailer)}>
            {renderToggleButton()}
        </div>
    )
}

export default ToggleOptions