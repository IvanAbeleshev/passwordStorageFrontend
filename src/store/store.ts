import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice'
import { searchSlice } from './sliceSearch'
import { searchParamSlice } from './sliceSearchParam'
import subPanelStatusSlice from './subMenuStatusSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
    searchParam: searchParamSlice.reducer,
    subNavPanel: subPanelStatusSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch