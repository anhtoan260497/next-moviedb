import React, { useEffect } from 'react';
import MovieDetailHeader from '@/components/MovieDetailHeader/MovieDetailHeader';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head'
import { setMovieInfo } from '@/features/MovieInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalVideo from '@/components/ModalVideo/ModalVideo';
import { RootState } from '@/store/store';
import MovieDetailContent from '@/components/MovieDetailContent/MovieDetailContent';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import CollectionDetailHeader from '@/components/CollectionDetailHeader/CollectionDetailHeader';
import CollectionDetailContent from '@/components/CollectionDetailContent/CollectionDetailContent';
import PageType from '@/components/PageType/PageType';
import { setCurrentPage, setListMovie } from '@/features/PageTypeSlice';

function MovieDetail(props: any) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const router = useRouter()
    const isTypePage = isNaN(parseInt(router.query.id as string))

    const modalTrailers = useSelector<RootState, boolean>(state => state.movieSlice.isModalTrailers)
    const type = router.query.type

    useEffect(() => {
        if (!props?.data?.id && !isTypePage) return
        
        if (props?.data?.id && !isTypePage) {
            dispatch(setMovieInfo(props.data))
            return
        }

        if( isTypePage) {
            dispatch(setListMovie(props.data.results)) 
            setCurrentPage(props.data.page)
        }
    }, [])


    return (
        <>
            <Head>
                <title>{`${!isTypePage ? (props.data.name || props.data.original_title || props.data.original_name) : (router.query.id as string).charAt(0).toUpperCase() + (router.query.id as string)?.slice(1).replaceAll('-', " ")} - The Movie Database (TMDB)`}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { !isTypePage ?  (<>
                <div>
                    {type === 'movie' || type === 'tv' ? <MovieDetailHeader /> : <CollectionDetailHeader />}
                    {type === 'movie' || type === 'tv' ? <MovieDetailContent /> : <CollectionDetailContent />}
                </div>
                {modalTrailers && <ModalVideo />}
            </>) : <PageType />}
        </>
    );
}

export default MovieDetail;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { type, id }: any = ctx.params
    if (isNaN(parseInt(id))) {
        const page = ctx?.query?.page || 1
        const respone = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_MOVIEDB}${type}/${id.replaceAll('-','_')}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${page || 1}`)
        const result = await respone.json()
        return {
            props: {
                data: result,
            }
        }
    }
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_MOVIEDB}${type}/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`)
    const data = await result.json()
    return {
        props: {
            data
        }
    }
}