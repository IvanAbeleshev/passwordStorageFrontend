import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface iInitialState {
  status: boolean
}

const initialState: iInitialState = {
  status: false
}

const spinerSlice = createSlice({
  name: 'spiner',
  initialState: initialState,
  reducers:{
    setSpinerStatus:(state, action:PayloadAction<boolean>)=>{
      state.status = action.payload
    }
  }
})

export const { setSpinerStatus } = spinerSlice.actions

export default spinerSlice.reducer