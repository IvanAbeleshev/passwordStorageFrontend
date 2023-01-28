import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { iPasswordGroup } from '../interfaces/modelInterfaces'
import passwordsGroups from '../services/ServicePasswordGroup'
import { RootState } from './store'


interface iInitialState {
  loading: boolean,
  passwordsGroups: iPasswordGroup[],
  error: string
}

const initialState: iInitialState = {
  loading: false,
  passwordsGroups: [],
  error: ''
}

export const fetchPasswordsGroups = createAsyncThunk('passwordsGroups/fetchPasswordsGroups', ()=>
  passwordsGroups.getAllGroups().then(({payload}) => payload.map(element=>element.getStucturedData()))
)
const passwordsGroupsSlice = createSlice({
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
      state.passwordsGroups = action.payload
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

