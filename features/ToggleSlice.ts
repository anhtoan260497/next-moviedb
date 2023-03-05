import {createSlice} from '@reduxjs/toolkit'

export const toggleSlice = createSlice({
    name : 'toggleSlice',
    initialState : {
        choose : ''
    },
    reducers : {
        setChooseStore(state,action) {
           state.choose = action.payload
        }
    }
})

export const {setChooseStore} = toggleSlice.actions
export default toggleSlice.reducer