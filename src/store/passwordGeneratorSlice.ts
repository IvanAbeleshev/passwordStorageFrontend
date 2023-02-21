import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { iPasswordGenerator } from '../interfaces/modelInterfaces'
import ServicePasswordGenerator from '../services/ServicePasswordGenerator'



interface iInitialState {
  loading: boolean,
  passwordGenerationSetting: iPasswordGenerator
  error: string
}

const initialState: iInitialState = {
  loading: false,
  passwordGenerationSetting:{
    passwordLength: 12,
    useUpperCaseSymbols: true,
    useExtraSymbols: true,
  },
  error: ''
}

export const fetchPasswordsGenerator = createAsyncThunk('passwordGenerator/fetchPasswordGenerator', ()=>
  ServicePasswordGenerator.getSetting().then(({payload})=>payload)
)
const passwordGeneratorSlice = createSlice({
  name: 'passwordGenerator',
  initialState: initialState,
  reducers:{
    setSettingPasswordLength:(state, action:PayloadAction<number>)=>{
      state.passwordGenerationSetting.passwordLength = action.payload
    },
    setSettingUseUpperCase:(state, action:PayloadAction<boolean>)=>{
      state.passwordGenerationSetting.useUpperCaseSymbols = action.payload
    },
    setSettingUseExtraSymbols:(state, action:PayloadAction<boolean>)=>{
      state.passwordGenerationSetting.useExtraSymbols = action.payload
    }
  },
  extraReducers: builder=>
  {
    builder.addCase(fetchPasswordsGenerator.pending, state=>{
      state.loading = true
    })
    builder.addCase(fetchPasswordsGenerator.fulfilled, (state, action)=>{
      state.loading = false
      if(action.payload)
        state.passwordGenerationSetting = action.payload
    })
    builder.addCase(fetchPasswordsGenerator.rejected, (state, action)=>{
      state.loading = false
      state.error = String(action.error.message)
    })
  },
})

export const { 
  setSettingPasswordLength, 
  setSettingUseExtraSymbols, 
  setSettingUseUpperCase
} = passwordGeneratorSlice.actions

export default passwordGeneratorSlice.reducer

