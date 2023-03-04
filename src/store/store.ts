import { configureStore } from '@reduxjs/toolkit'
import modalWindowSlice from './modalWindowSlice'
import passwordsGroupsSlice from './passwordsGroupsSlice'
import authSlice from './authSlice'
import { searchSlice } from './sliceSearch'
import notificationMessageSlice from './notificationMessageSlice'
import spinerSlice from './spinerSlice'
import passwordFilterSlice from './passwordFilterSlice'
import passwordGeneratorSlice from './passwordGeneratorSlice'
import darkModeSlice from './darkModeSlice'

export const store = configureStore({
  reducer: {
    user: authSlice,
    search: searchSlice.reducer,
    passwordFilter: passwordFilterSlice,
    modalWindow: modalWindowSlice,
    notification: notificationMessageSlice,
    spiner: spinerSlice, 
    passwordsGroups: passwordsGroupsSlice,
    passwordGenerator: passwordGeneratorSlice,
    darkMode: darkModeSlice,
    
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch