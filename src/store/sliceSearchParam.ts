import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IInitialStateSearchParam{
    employee: {
        value: string,
        selectedId: number|undefined
    },
    service: {
        value: string,
        selectedId: number|undefined
    },
}

const initialStateSearchParam: IInitialStateSearchParam ={
    employee:{
        value: '',
        selectedId: undefined
    },
    service:{
        value: '',
        selectedId: undefined
    }
}

export const searchParamSlice = createSlice({
    name: 'searchParam',
    initialState: initialStateSearchParam,
    reducers:{
        setValue:(state, {payload})=>{
            
        },
        setInitialState:(state)=>{

        }
    }
})

//my actions
export const {setValue, setInitialState} = searchParamSlice.actions

//exports selectors
export const searchEmployeeParam = (state: RootState)=>state.searchParam.employee
export const searchServiceParam = (state: RootState)=>state.searchParam.service

export default searchParamSlice.reducer

