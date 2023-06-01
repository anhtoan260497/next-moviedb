import SearchContent from '@/components/SearchContent/SearchContent';
import { MovieInfo } from '@/features/MovieInfoSlice';
import { searchData, SearchItem, setCurrentPage, setFilter, setIsLoading, setSearchResult, setTotalPages } from '@/features/SearchInfoSlice';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function search( props : searchData) {

    const dispatch = useDispatch()
    const router = useRouter()
    const type = router.query.type
    const currentPage = router.query.page

    useEffect(() => {
        dispatch(setSearchResult(props))
        dispatch(setFilter(router.query.type))
        dispatch(setIsLoading(false))
        dispatch(setTotalPages(props[(type as string)].totalPages))
        dispatch(setCurrentPage(currentPage))
    }, [])

    return (
        <>
            <Head>
                <title>The Movie Database</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <SearchContent />
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const query = ctx.query.query
    const currentPage = ctx.query.page
    const type = ['movie','tv','collection','person','company','keyword']
    const propsData:searchData = {}
    for(let i = 0 ; i < type.length ; i ++) {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_MOVIEDB}search/${type[i]}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&include_adult=false&query=${query}&page=${currentPage}`)
            const data = await result.json()

            propsData[type[i]] = {
                type : type[i],
                totalPages : data.total_pages,
                totalResults : data.total_results,
                data : data.results
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return {
        props: {
            ...propsData
        }
    }
}


export default search;  