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
           if(payload.employee){
                state.employee.selectedId = payload.employee.selectedId
                state.employee.value = payload.employee.value
           }
           if(payload.service){
                state.service.selectedId = payload.service.selectedId
                state.service.value = payload.service.value
           }
        },
        setInitialState:(state)=>{
            state.employee.selectedId = undefined
            state.employee.value = ''

            state.service.selectedId = undefined
            state.service.value = ''
        }
    }
})

//my actions
export const {setValue, setInitialState} = searchParamSlice.actions

//exports selectors
export const searchEmployeeParam = (state: RootState)=>state.searchParam.employee
export const searchServiceParam = (state: RootState)=>state.searchParam.service

export default searchParamSlice.reducer

