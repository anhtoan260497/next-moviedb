import axiosClient from "./axiosClient"


const getMovieInfo = {
    getMovieInfo : (type:string,id:number) => {
        const url = `${type}/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
        return axiosClient.get(url)
    }
}

export default getMovieInfo