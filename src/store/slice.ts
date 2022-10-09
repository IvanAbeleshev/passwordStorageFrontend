import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface IInitialStateUserSlice {
    id: number,
    login: string,
    token: string | null
}

const initialStateUserSlice: IInitialStateUserSlice = {
    id: 0,
    login: '',
    token: localStorage.getItem('token')
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUserSlice,
    reducers:{
        setValue: (state, {payload})=>{
            state = {...state, ...payload}
        },
    }
})

//my actions
export const {setValue} = userSlice.actions

//exports selectors
export const currentUserState = (state: RootState)=>state.user

export default userSlice.reducer