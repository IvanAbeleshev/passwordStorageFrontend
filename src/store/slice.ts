import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../constans";
import { RootState } from "./store";


interface IInitialStateUserSlice {
    id: number,
    login: string,

    authState: boolean
}

const initialStateUserSlice: IInitialStateUserSlice = {
    id: 0,
    login: '',
    authState: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUserSlice,
    reducers:{
        setValue: (state, {payload})=>{
            //its work  but its piece of shit
            //state = JSON.parse(JSON.stringify(payload))
            state.id = payload.id
            state.login = payload.login
            state.authState = payload.authState
        },
        setInitialState: (state)=>{
            state.authState = false
            state.id = 0
            state.login = ''

        },

    }
})

//my actions
export const {setValue, setInitialState} = userSlice.actions

//exports selectors
export const currentUserState = (state: RootState)=>state.user

export default userSlice.reducer

