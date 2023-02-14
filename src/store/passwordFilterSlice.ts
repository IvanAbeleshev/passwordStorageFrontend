import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { iEmployee, iPasswordGroup, iService } from '../interfaces/modelInterfaces'

interface iFilterItem{
  employee?:iEmployee,
  service?:iService,
  passwordGroup?:iPasswordGroup
}

interface iInitialState{
  countActiveFilter: number,
  filters:iFilterItem
}

const initialState: iInitialState ={
  countActiveFilter:0,
  filters:{
    employee: undefined,
    service: undefined,
    passwordGroup: undefined,
  }
}

const passwordFilterSlica = createSlice({
  name: 'passwordFilter',
  initialState: initialState,
  reducers:{
    setPasswordFilterItem: (state, action:PayloadAction<iFilterItem>)=>{
      Object.assign(state.filters, action.payload)
      let counterActiveFilters = 0
      let keys: keyof typeof state.filters
      for(keys in state.filters){
        if(state.filters[keys])
        counterActiveFilters++
      }
      state.countActiveFilter = counterActiveFilters
    }
  }
})

export const { setPasswordFilterItem } = passwordFilterSlica.actions


export default passwordFilterSlica.reducer

