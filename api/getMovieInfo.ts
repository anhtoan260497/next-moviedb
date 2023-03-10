import axiosClient from "./axiosClient"


const getMovieInfo = {
    getMovieInfo : (type:string,id:number) => {
        const url = `${type}/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },
    getVideoFilm : (type ?: string | string[], id ?: string | string[]) => {
        const url = `${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },
    getCreditFilm : (type ?: string | string[], id ?: string | string[]) => {
        const url = `${type}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },
    getReviewFilm : (type ?: string | string[] , id ?: string | string[]) =>{
        const url = `${type}/${id}/reviews?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`
        return axiosClient.get(url)
    },
    getRecommendationFilms :(type ?: string | string[] , id ?: string | string[]) => {
        const url =`${type}/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`
        return axiosClient.get(url)
    },
    getExternalIds : (type ?: string | string[] , id ?: string | string[]) => {
        const url = `${type}/${id}/external_ids?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
        return axiosClient.get(url)
    }
}

export default getMovieInfo