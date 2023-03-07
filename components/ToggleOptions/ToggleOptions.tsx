import { getTrending } from "@/features/MovieSlice";
import { setChooseStore } from "@/features/ToggleSlice";
import { RootState } from "@/store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './ToggleOptions.module.scss'

interface Options {
    options: OptionItem[]
}

interface OptionItem {
    name: string,
    id: string
}


const ToggleOptions = ({ options }: Options) => {

    const choose = useSelector<RootState, string | void>(state => state.toggleSlice.choose)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    useEffect(() => {
        dispatch(setChooseStore(options[0].id))
        dispatch(getTrending(options[0].id))
    }, [])

    const handleClickChoose = (id: string) => {
        if(choose === id) return 
        dispatch(setChooseStore(id))
        dispatch(getTrending(id))
    }



    const renderToggleButton = () => {
        return options.map((item, key) => {
            return <button className={clsx(styles.optionItem, item.id === choose ? styles.isActive : '')} key={key} onClick={() => handleClickChoose(item.id)}>{item.name}</button>
        })
    }

    return (
        <div className={styles.container}>
            {renderToggleButton()}
        </div>
    )
}

export default ToggleOptions