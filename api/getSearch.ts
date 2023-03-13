import axiosClient from "./axiosClient"

const getSearch = {
     getSearchWithParams : (params:string, pages : number) => {
        const url = `search/multi?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&include_adult=false&query=${params}&page=1`
        return axiosClient.get(url)
    }
}

export default getSearch