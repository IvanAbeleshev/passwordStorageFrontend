import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { en_notificationStatus } from '../interfaces'

interface iMessage{
  title: string,
  description: string,
  status: en_notificationStatus
}

interface iInitialState extends iMessage{
  time: string
}

const initialState: iInitialState = {
  time:'',
  title: '',
  description:'',
  status: en_notificationStatus.info
}

const notificationMessageSlice = createSlice({
  name: 'notificationMessage',
  initialState: initialState,
  reducers:{
    pushNotificationMessage: (state, action:PayloadAction<iMessage>)=>{
      Object.assign(state, action.payload)
      state.time = new Date().toISOString()
    }
  }
})

export const { pushNotificationMessage } = notificationMessageSlice.actions

export default notificationMessageSlice.reducer

