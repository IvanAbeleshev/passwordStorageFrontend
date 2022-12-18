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

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUserSlice,
    reducers:{
        setValue: (state, action:PayloadAction<IInitialStateUserSlice>)=>{
            Object.assign(state, action.payload)
        },
        setInitialState: (state)=>{
            state.authState = undefined
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

