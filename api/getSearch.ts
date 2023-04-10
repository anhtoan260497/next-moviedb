import axiosClient from "./axiosClient"

const getSearch = {
     getSearchWithParams : (params ?:string | string[], pages ?: number, type ?: string) => {
        const url = `search/${type}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&include_adult=false&query=${params}&page=${pages}`
        return axiosClient.get(url)
    },
    getTrendingTitle : (type ?: 'all' | 'movie' | 'tv' | 'person', time ?: 'day' | 'week') => {
        const url = `trending/${type || 'movie'}/${time || 'day'}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
        return axiosClient.get(url)
    }
}

export default getSearch