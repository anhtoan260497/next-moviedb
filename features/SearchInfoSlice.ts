import { createSlice } from "@reduxjs/toolkit";
import { MovieInfo } from "./MovieInfoSlice";

export interface SearchInfoSlice {
    searchResult : MovieInfo[]
}

const initialState : SearchInfoSlice = {
    searchResult : []
}

export const searchInfoSlice = createSlice({
    name : 'SearchInfo',
    initialState,
    reducers : {
        setSearchResult : (state,action) => {
            state.searchResult = action.payload
        }
    }
})

export const  {setSearchResult} =  searchInfoSlice.actions
export default searchInfoSlice.reducer