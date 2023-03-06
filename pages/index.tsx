import getListMovie from '@/api/getListMovie'
import HomepageSearch from '@/components/HomepageSearch/HomepageSearch'
import HomepageSlideOptions from '@/components/HomepageSlideOptions/HomepageSlideOptions'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'


export interface MovieList {
  adult: boolean,
  backdrop_path: string,
  genres_ids: Number[],
  id: number,
  original_languege: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

interface dataProps {
  dataMovieList: MovieList[]
}


export default function Home({ dataMovieList }: dataProps) {
  const firstSlideOptions = [{
    name: 'Today',
    id: 'day'
  }, {
    name: 'This week',
    id: 'week'
  }]
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {dataMovieList.length > 0 && <HomepageSearch backgroundImage={dataMovieList[0].backdrop_path} />}
      <HomepageSlideOptions options={firstSlideOptions} />
    </>
  )
}

export const getStaticProps: GetStaticProps<dataProps> = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_MOVIEDB}/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${1}`)
    const data = await result.json()
    return {
      props: {
        dataMovieList: data.results
      }
    }
  } catch (err) {
    return {
      props: {
        dataMovieList: []
      }
    }
  }
}
