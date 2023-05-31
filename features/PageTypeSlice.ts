import { createSlice } from "@reduxjs/toolkit";
import { MovieInfo } from "./MovieInfoSlice";

interface PageSliceState {
    listMovie : MovieInfo[];
    page : number
}

const initialState : PageSliceState  =  {
    listMovie : [],
    page : 1    
}

export const pageTypeSlice =  createSlice({
    name : 'PageType',
    initialState,
    reducers : {
        setListMovie(state,action) {
            state.listMovie = action.payload
        },
        setCurrentPage(state,action) {
            state.page =  action.payload
        }
    }
})

export const {setListMovie,setCurrentPage} =  pageTypeSlice.actions
export default pageTypeSlice.reducer