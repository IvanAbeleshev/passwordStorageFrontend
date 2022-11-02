import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IInitialStateSearch{
    searchString: string    
}

const initialStateSearch: IInitialStateSearch ={
    searchString: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialStateSearch,
    reducers:{
        setValue:(state, {payload})=>{
            state.searchString = payload
        }
    }
})

//my actions
export const {setValue} = searchSlice.actions

//exports selectors
export const serchSelectorString = (state: RootState)=>state.search.searchString

export default searchSlice.reducer

