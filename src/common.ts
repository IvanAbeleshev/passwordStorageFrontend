import axios, {AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from './constans'

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
    const originalConfig = err.config

    if (originalConfig.url !== "/" && err.response) {
    // Access Token was expired
    if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
        const rs = await axiosInstance.post('/login/refresh/', {
            refresh: localStorage.getItem(REFRESH_TOKEN),
        });

        const { accessToken } = rs.data
        localStorage.setItem(ACCESS_TOKEN, accessToken)

        return axiosInstance(originalConfig)
        } catch (_error) {
        return Promise.reject(_error)
        }
    }
    }

    return Promise.reject(err)
}
)

export default axiosInstance