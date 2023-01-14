import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'


interface iInitialState {
  status: boolean
}

const initialState: iInitialState = {
  status: false
}

export const navPanelStatusSlice = createSlice({
  name: 'subNavMenuStatus',
  initialState: initialState,
  reducers:{
    toggleStatusSubNavpanel: (state)=>{
      state.status = !state.status
    },
    showSubNavPanel: (state)=>{
      state.status = true
    },
    hideSubNavPanel: (state)=>{
      state.status = false
    }
  }
})

export const { hideSubNavPanel, showSubNavPanel, toggleStatusSubNavpanel } = navPanelStatusSlice.actions

export const selectorStatusSubMenu = (state: RootState)=>state.subNavPanel.status

export default navPanelStatusSlice.reducer

