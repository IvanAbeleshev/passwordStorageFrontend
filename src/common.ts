import axios, {AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from './constans'
import { store } from './store/store'
import { setFalseAuth } from './store/slice'

export const defaultErrorHandler=(error:any)=>{
    if(axios.isAxiosError(error)){
        alert(error.response?.data.message)
    }
}

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,

})
  
axiosInstance.interceptors.request.use(
(config:AxiosRequestConfig) => {
    const token = String(localStorage.getItem(ACCESS_TOKEN))
    if (token) {
        config.headers!["Authorization"] = 'Bearer ' + token
    }
    return config
},
(error) => {
    return Promise.reject(error)
}
)
  
axiosInstance.interceptors.response.use(
(res) => {
    return res
},

async (err) => {
    const originalConfig: AxiosRequestConfig = err.config
    if (originalConfig.url !== "/" && err.response) {
    // Access Token was expired
    if (err.response.status === 401) {
        try {
            const rs = await axios.post(`${BACKEND_URL}/users/checkUser`, {
                refresh: localStorage.getItem(REFRESH_TOKEN),
            })
            const { accessToken, refreshToken } = rs.data.data
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)

            return axiosInstance(originalConfig)
        } catch (_error) {
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(REFRESH_TOKEN)
            store.dispatch(setFalseAuth())
            return Promise.reject(_error)
        }
    }
    }

    return Promise.reject(err)
}
)

export default axiosInstance