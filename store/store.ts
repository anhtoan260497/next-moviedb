import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {toggleSlice} from '@/features/ToggleSlice'

const reducers = combineReducers({
   toggleSlice : toggleSlice.reducer
})

const store = configureStore({
    reducer : reducers,
    devTools : true,
})

export default store
export type RootState = ReturnType<typeof reducers>