import SearchContent from '@/components/SearchContent/SearchContent';
import { MovieInfo } from '@/features/MovieInfoSlice';
import { setSearchResult } from '@/features/SearchInfoSlice';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface searchData {
    data: MovieInfo[]
}


function search({ data }: searchData) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchResult(data))
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
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_MOVIEDB}search/multi?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&include_adult=false&query=${query}&page=1`)
    const data = await result.json()
    return {
        props: {
            data: data.results
        }
    }
}


export default search;  