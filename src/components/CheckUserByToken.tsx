import axios from 'axios'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../common'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'
import { currentUserState, setInitialState, setValue } from '../store/slice'

interface ICheckUserByToken{
    children: React.ReactNode
}

const CheckUserByToken=({children}:ICheckUserByToken)=>{
    const userState = useSelector(currentUserState)
    const dispatch = useDispatch()

    useEffect(()=>{
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(accessToken){
            
            axiosInstance.get(`/users/checkUser`).then(response=>{
                if(response.status === 200){
                    const {id, login, accessToken, refreshToken} = response.data.data
                    if(userState.authState){
                        localStorage.setItem(ACCESS_TOKEN, accessToken)
                        localStorage.setItem(REFRESH_TOKEN, refreshToken)
                    }else{
                        dispatch(setValue({id, login, authState: true}))
                    }
                }
            }).catch((error)=>{
                if(axios.isAxiosError(error)){
                    dispatch(setInitialState())
                }
            })
        }

    }, [dispatch, userState.authState])
    return <>{children}</>
}

export default CheckUserByToken