import axios from 'axios'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserState, setInitialState, setValue } from '../store/slice'

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
            axios.get('http://localhost:5555/users/checkUser', config).then(response=>{
                if(response.status === 200){
                    const {id, login, token} = response.data.data
                    dispatch(setValue({id, login, token, authState: true}))
                }
            }).catch((error)=>{
                if(axios.isAxiosError(error)){
                    dispatch(setInitialState())
                }
            })
        }

    }, [])
    return <>{children}</>
}

export default CheckUserByToken