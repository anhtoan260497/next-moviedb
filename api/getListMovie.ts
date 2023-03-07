import axiosClient from "./axiosClient"


const getListMovie = {
    getPopular : (type : string,page = 1) => {
        const url = `${type}/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${page}`
        return axiosClient.get(url)
    },
    getTrending : (type:string,timeWindow ?: string ) => {
        const url = `/trending/${type}/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
        console.log(url)
        return axiosClient.get(url)
    }
}

export default getListMovie