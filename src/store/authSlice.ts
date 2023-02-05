import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "./store"


interface IInitialStateUserSlice {
    id: number,
    login: string,
    authState: boolean | undefined
}

const initialStateUserSlice: IInitialStateUserSlice = {
    id: 0,
    login: '',
    authState: undefined
}

export const authSlice = createSlice({
    name: 'user',
    initialState: initialStateUserSlice,
    reducers:{
        setAuthValue: (state, action)=>{
            Object.assign(state, action.payload)
        },
        setAuthInitialState: (state)=>{
            state.authState = undefined
            state.id = 0
            state.login = ''
        },
        setFalseAuth: (state)=>{
            state.authState = undefined
            state.id = 0
            state.login = ''
        }

    }
})

//my actions
export const {setAuthInitialState, setAuthValue, setFalseAuth} = authSlice.actions

//exports selectors
export const currentUserState = (state: RootState)=>state.user

export default authSlice.reducer

