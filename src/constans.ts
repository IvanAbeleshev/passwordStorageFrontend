import { EnhancedStore } from '@reduxjs/toolkit'

export const BACKEND_URL = 'http://localhost:7001'
export const LIMIT_ITEMS_ON_PAGE = 10

export const API_KEY_UNSPLASH = 'CKeoTf6sFeQLRgeqKdztLgEttZxnym716dMseBbKkcg'
export const API_SECRET_KEY_UNSPLASH = 'mtEE_dJhXvC87zoq0kgo0AQrvrevmvV64gv5BcRmumU'

//localStorage constant
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export let globalStore:EnhancedStore
export const injectStore = (incomingStore:EnhancedStore) => {
  globalStore = incomingStore
}

//-------------------------------------seting--------------------------------
export const settingPasswordGenerator = 'passwordGenerator'