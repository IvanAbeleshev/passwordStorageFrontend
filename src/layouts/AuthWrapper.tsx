import React, {useEffect} from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'
import ServiceAthentication from '../services/ServiceAthentication'
import { currentUserState, setAuthValue } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { fetchPasswordsGenerator } from '../store/passwordGeneratorSlice'
import { decodeToken } from '../utils/tokensFuntion'

interface iAuthWrapper{
  children: React.ReactNode
}

const AuthWrapper=({children}:iAuthWrapper)=>{
  const userState = useAppSelector(currentUserState)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    ServiceAthentication.refresh().then((response)=>{
      if(response.payload){
        localStorage.setItem(ACCESS_TOKEN, response.payload.accessToken)
        localStorage.setItem(REFRESH_TOKEN, response.payload.refreshToken)
        const resultDecodeJWT = decodeToken(response.payload.accessToken)
        dispatch(setAuthValue({
          id: resultDecodeJWT.id,
          login: resultDecodeJWT.login,
          authState:true
        }))
        dispatch(fetchPasswordsGenerator())
      }else{
        dispatch(setAuthValue({authState: false}))
      }    
    }).catch(()=>dispatch(setAuthValue({authState: false})))
  }, [dispatch, userState.authState])
  return <>{userState.authState!==undefined&&children}</>
}

export default AuthWrapper