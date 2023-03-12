import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {toggleSlice} from '@/features/ToggleSlice'
import {movieSlice} from '@/features/MovieSlice';
import {movieInfoSlice} from '@/features/MovieInfoSlice';
import {searchInfoSlice} from '@/features/SearchInfoSlice';

export interface Reducers {
    toggleSlice : ReturnType<typeof toggleSlice.reducer>
    movieSlice : ReturnType<typeof movieSlice.reducer>
    movieInfoSlice : ReturnType<typeof movieInfoSlice.reducer>
    searchInfoSlice : ReturnType<typeof searchInfoSlice.reducer> 

}

const reducers = combineReducers({
   toggleSlice : toggleSlice.reducer,
   movieSlice : movieSlice.reducer,
   movieInfoSlice : movieInfoSlice.reducer,
   searchInfoSlice : searchInfoSlice.reducer
})

const store = configureStore({
    reducer : reducers,
    devTools : true,
    
})

export default store
export type RootState = ReturnType<typeof reducers>