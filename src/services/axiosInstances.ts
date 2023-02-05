import { EnhancedStore } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from '../constans'
import { setFalseAuth } from '../store/authSlice'

let store:EnhancedStore
export const injectStore = (incomingStore:EnhancedStore) => {
  store = incomingStore
}
export const defaultErrorHandler=(error:any)=>{
  if(axios.isAxiosError(error)){
    alert(error.response?.data.message)
  }
}

const axiosFreeInstance = axios.create({
  baseURL: BACKEND_URL,
})

const axiosSecureInstance = axios.create({
  baseURL: BACKEND_URL,
})
  
axiosSecureInstance.interceptors.request.use(
(config:AxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (token) {
    config.headers!['Authorization'] = 'Bearer ' + token
  }
  return config
},
(error) => {
  return Promise.reject(error)
}
)
  
axiosSecureInstance.interceptors.response.use(
(res) => {
  return res
},

async (err) => {
  const originalConfig: AxiosRequestConfig = err.config
  if (originalConfig.url !== "/" && err.response) {
  // Access Token was expired
  if (err.response.status === 401) {
    try {
      const rs = await axiosFreeInstance.post('/users/refresh', {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      })
      const { accessToken, refreshToken } = rs.data.data
      localStorage.setItem(ACCESS_TOKEN, accessToken)
      localStorage.setItem(REFRESH_TOKEN, refreshToken)

      return axiosSecureInstance(originalConfig)
    } catch (_error) {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      store.dispatch(setFalseAuth())
      return Promise.reject(_error)
    }
  }
  }

  return Promise.reject(err)
})

export {axiosFreeInstance, axiosSecureInstance}