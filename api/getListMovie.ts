import axiosClient from "./axiosClient"


const getListMovie = {
    getPopular : (page = 1) => {
        const url = `movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${page}`
        return axiosClient.get(url)
    },
    getTrending : (type:'all' | 'movie' | 'tv' | 'persion',timeWindow: string) => {
        const url = `/trending/${type}/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
        return axiosClient.get(url)
    }
}

export default getListMovie