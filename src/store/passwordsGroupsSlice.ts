import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { iItemSubNavPanel } from '../interfaces'
import passwordsGroups from '../services/passwordsGroups'
import { RootState } from './store'


interface iInitialState {
  loading: boolean,
  passwordsGroups: iItemSubNavPanel[],
  error: string
}

const initialState: iInitialState = {
  loading: false,
  passwordsGroups: [],
  error: ''
}

export const fetchPasswordsGroups = createAsyncThunk('passwordsGroups/fetchGroups', ()=>
  passwordsGroups.getAllGroups().then(response => response)
)
export const passwordsGroupsSlice = createSlice({
  name: 'passwordsGroups',
  initialState: initialState,
  reducers:{

  },
  extraReducers: builder=>
  {
    builder.addCase(fetchPasswordsGroups.pending, state=>{
      state.loading = true
    })
    builder.addCase(fetchPasswordsGroups.fulfilled, (state, action)=>{
      state.loading = false
      state.passwordsGroups = action.payload!
    })
    builder.addCase(fetchPasswordsGroups.rejected, (state, action)=>{
      state.loading = false
      state.passwordsGroups = []
      state.error = String(action.error.message)
    })
  },
})

export const selectorPasswordsGroups = (state: RootState)=>state.passwordsGroups

export default passwordsGroupsSlice.reducer

