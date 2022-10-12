import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface IInitialStateUserSlice {
    id: number,
    login: string,
    token: string | null,
    authState: boolean
}

const initialStateUserSlice: IInitialStateUserSlice = {
    id: 0,
    login: '',
    token: localStorage.getItem('token'),
    authState: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUserSlice,
    reducers:{
        setValue: (state, {payload})=>{
            //its work  but its piece of shit
            state.id = payload.id
            state.login = payload.login
            state.token = payload.token
            state.authState = payload.authState
            localStorage.setItem('token', state.token as string)
        },
        setInitialState: (state)=>{
            state = JSON.parse(JSON.stringify(initialStateUserSlice))
            localStorage.removeItem('token')
        }
    }
})

//my actions
export const {setValue, setInitialState} = userSlice.actions

//exports selectors
export const currentUserState = (state: RootState)=>state.user

export default userSlice.reducer

