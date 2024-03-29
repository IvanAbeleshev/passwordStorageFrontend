import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from '../constans'
import { setFalseAuth } from '../store/authSlice'
import { globalStore } from '../constans'
import { setSpinerStatus } from '../store/spinerSlice'

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
  globalStore.dispatch(setSpinerStatus(true))
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
  globalStore.dispatch(setSpinerStatus(false))
  return res
},

async (err) => {
  globalStore.dispatch(setSpinerStatus(false))
  const originalConfig: AxiosRequestConfig = err.config
  if (originalConfig.url !== "/" && err.response) {
    // Access Token was expired
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    if (err.response.status === 401&&refresh) {
      try {
        const rs = await axiosFreeInstance.post('/users/refresh', {refresh})
        const { accessToken, refreshToken } = rs.data.data
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        localStorage.setItem(REFRESH_TOKEN, refreshToken)

        return axiosSecureInstance(originalConfig)
      }catch (_error) {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        globalStore.dispatch(setFalseAuth())
        return Promise.reject(_error)
      }
    }
  }

  return Promise.reject(err)
})

export {axiosFreeInstance, axiosSecureInstance}