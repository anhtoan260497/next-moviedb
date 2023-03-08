import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {toggleSlice} from '@/features/ToggleSlice'
import {movieSlice} from '@/features/MovieSlice';

export interface Reducers {
    toggleSlice : ReturnType<typeof toggleSlice.reducer>
    movieSlice : ReturnType<typeof movieSlice.reducer>
}

const reducers = combineReducers({
   toggleSlice : toggleSlice.reducer,
   movieSlice : movieSlice.reducer
})

const store = configureStore({
    reducer : reducers,
    devTools : true,
})

export default store
export type RootState = ReturnType<typeof reducers>