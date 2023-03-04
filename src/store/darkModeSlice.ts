import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DARK_MODE } from '../constans'
import { RootState } from "./store"


interface iInitialState {
  isDarkMode: boolean,
}

const initialState: iInitialState= {
  isDarkMode: localStorage.getItem(DARK_MODE)?true:false
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers:{
    setDarkMode:(state, action:PayloadAction<boolean>)=>{
      state.isDarkMode = action.payload
      localStorage.setItem(DARK_MODE, action.payload?'dark':'light')
    }
  }
})

//my actions
export const {setDarkMode} = darkModeSlice.actions

//exports selectors
export const getDarkModeValue = (state: RootState)=>state.darkMode.isDarkMode

export default darkModeSlice.reducer

