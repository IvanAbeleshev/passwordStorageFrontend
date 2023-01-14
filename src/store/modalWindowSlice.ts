import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'


interface iInitialState {
  status: boolean
}

const initialState: iInitialState = {
  status: false
}

export const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState: initialState,
  reducers:{
    showModalWindow: (state)=>{
      state.status = true
    },
    hideModalWindow: (state)=>{
      state.status = false
    },
    toggleModalWIndow: (state)=>{
      state.status = !state.status
    }
  }
})

export const { hideModalWindow, showModalWindow, toggleModalWIndow } = modalWindowSlice.actions

export const selectorModalWindowVisible = (state: RootState)=>state.modalWindow.status

export default modalWindowSlice.reducer

