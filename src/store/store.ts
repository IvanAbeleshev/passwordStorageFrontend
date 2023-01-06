import { configureStore } from '@reduxjs/toolkit'
import modalWindowSlice from './modalWindowSlice'
import passwordsGroupsSlice from './passwordsGroupsSlice'
import { userSlice } from './slice'
import { searchSlice } from './sliceSearch'
import { searchParamSlice } from './sliceSearchParam'
import subPanelStatusSlice from './subMenuStatusSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
    searchParam: searchParamSlice.reducer,
    subNavPanel: subPanelStatusSlice,
    modalWindow: modalWindowSlice,
    passwordsGroups: passwordsGroupsSlice
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch