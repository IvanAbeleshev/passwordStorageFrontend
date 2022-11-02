import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice'
import { searchSlice } from './sliceSearch'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch