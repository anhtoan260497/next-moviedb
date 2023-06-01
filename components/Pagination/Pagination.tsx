import { RootState } from '@/store/store';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss'
import { searchData } from '@/features/SearchInfoSlice';
import { Pagination } from '@mui/material';

function PaginationComp() {
    const router = useRouter()
    const totalPages = useSelector<RootState, number>(state => state.searchInfoSlice.totalPages)
    const type = useSelector<RootState, string>(state => state.searchInfoSlice.filter)
    const searchResult = useSelector<RootState, searchData>(state => state.searchInfoSlice.searchResult)
    const filter = useSelector<RootState, string>(state => state.searchInfoSlice.filter)
    const [isShowPagination, setIsShowPagination] = useState<boolean>(true)
    const  [isDisabled,setIsDisabled] = useState<boolean>(false)

    console.log(router.query)

    const createLinkPagination = (pageNumber: number) => {
        const query = router.query.query
        return `/search?query=${query}&page=${pageNumber}&type=${type}`
    }

    const handleChangePage = (page: number) => {
        const query = router.query.query
        setIsDisabled(true)
        window.location.href = `/search?query=${query}&page=${page}&type=${type}`
    }

    useEffect(() => {
        const resultArr = Object.values(searchResult)
        const result = resultArr.filter(item => item.type === filter)
        if (result.length === 0) setIsShowPagination(false)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.pagination}>
               {isShowPagination && <Pagination page={parseInt(router.query.page as string)} onChange={(e, value) => { handleChangePage(value)}} count={totalPages} disabled={isDisabled} size="small" />}
            </div>
        </div>
    );
}

export default PaginationComp;