import axios from 'axios'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKEND_URL } from '../constans'
import { currentUserState, setInitialState, setValue, upadateToken } from '../store/slice'

interface ICheckUserByToken{
    children: React.ReactNode
}

const CheckUserByToken=({children}:ICheckUserByToken)=>{
    const userState = useSelector(currentUserState)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(userState.token){
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + userState.token
                }
              }
            axios.get(`${BACKEND_URL}/users/checkUser`, config).then(response=>{
                if(response.status === 200){
                    const {id, login, token} = response.data.data
                    if(userState.authState){
                        dispatch(upadateToken(token))
                    }else{
                        dispatch(setValue({id, login, token, authState: true}))
                    }
                }
            }).catch((error)=>{
                if(axios.isAxiosError(error)){
                    dispatch(setInitialState())
                }
            })
        }

    }, [dispatch, userState.authState, userState.token])
    return <>{children}</>
}

export default CheckUserByToken