import { setChooseStore } from "@/features/ToggleSlice";
import { RootState } from "@/store/store";
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
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setChooseStore(options[0].id))
    }, [])



    const renderToggleButton = () => {
        return options.map((item, key) => {
            return <button className={clsx(styles.optionItem, item.id === choose ? styles.isActive : '')} key={key} onClick={() => dispatch(setChooseStore(item.id))}>{item.name}</button>
        })
    }

    return (
        <div className={styles.container}>
            {renderToggleButton()}
        </div>
    )
}

export default ToggleOptions