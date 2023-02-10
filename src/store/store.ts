import { configureStore } from '@reduxjs/toolkit'
import modalWindowSlice from './modalWindowSlice'
import passwordsGroupsSlice from './passwordsGroupsSlice'
import authSlice from './authSlice'
import { searchSlice } from './sliceSearch'
import { searchParamSlice } from './sliceSearchParam'
import notificationMessageSlice from './notificationMessageSlice'
import spinerSlice from './spinerSlice'

export const store = configureStore({
  reducer: {
    user: authSlice,
    search: searchSlice.reducer,
    searchParam: searchParamSlice.reducer,
    modalWindow: modalWindowSlice,
    notification: notificationMessageSlice,
    spiner: spinerSlice, 
    passwordsGroups: passwordsGroupsSlice,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch