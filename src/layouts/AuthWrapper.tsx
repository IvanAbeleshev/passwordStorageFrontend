import axios from 'axios'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../common'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'
import { currentUserState, setAuthValue } from '../store/authSlice'

interface iAuthWrapper{
    children: React.ReactNode
}

const AuthWrapper=({children}:iAuthWrapper)=>{
    const userState = useSelector(currentUserState)
    const dispatch = useDispatch()

    useEffect(()=>{
        const refresh = localStorage.getItem(REFRESH_TOKEN)
        if(refresh){
            axiosInstance.post(`/users/refresh`, {refresh}).then(response=>{
                const {accessToken, refreshToken} = response.data.data
                if(userState.authState){
                    localStorage.setItem(ACCESS_TOKEN, accessToken)
                    localStorage.setItem(REFRESH_TOKEN, refreshToken)
                }else{
                    dispatch(setAuthValue({id: 0, login:'', authState: true}))
                }
            }).catch((error)=>{
                if(axios.isAxiosError(error)){
                    dispatch(setAuthValue({id: 0, login:'', authState: false}))
                }
            })
        }else(
            dispatch(setAuthValue({id: 0, login:'', authState: false}))
        )

    }, [dispatch, userState.authState])
    return <>{userState.authState!==undefined&&children}</>
}

export default AuthWrapper