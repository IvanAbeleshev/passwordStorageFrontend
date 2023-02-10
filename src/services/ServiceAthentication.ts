import { isAxiosError } from 'axios'
import { REFRESH_TOKEN } from '../constans'
import { iDefaultResponseService } from '../interfaces'
import { axiosFreeInstance, axiosSecureInstance } from './axiosInstances'

interface iCheckExistanceUser extends iDefaultResponseService{
  payload?:{
    totpBase32:string,
    urlForAutintificator: string
  }
}

interface iCreateFirstUser extends iDefaultResponseService{
  payload:{
    totpBase32:string,
    urlForAutintificator: string
  }
}

interface iSignIn extends iDefaultResponseService{
  payload:{
    accessToken:string,
    refreshToken:string
  }
}

interface iRefresh extends iDefaultResponseService{
  payload?:{
    accessToken:string,
    refreshToken:string
  }
}

class ServiceAuthentication{

  public refresh=async():Promise<iRefresh>=>{
    try{
      const refresh = localStorage.getItem(REFRESH_TOKEN)
      if(refresh){
        const resultRequest = await axiosFreeInstance.post('/users/refresh', {refresh})
        const {accessToken, refreshToken} = resultRequest.data.data
        return {isError: false, payload:{accessToken, refreshToken}}
      }
      return {isError: true, message: 'refresh token is not valid'}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public signIn=async(login:string, password:string, code2FA:string):Promise<iSignIn>=>{
    try{
      const resultRequest = await axiosSecureInstance.post('/users/signIn', {login, password, code2FA})
      const {accessToken, refreshToken} = resultRequest.data.data
      return {isError: false, payload:{accessToken, refreshToken}}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createFirstUser=async(login:string, password:string):Promise<iCreateFirstUser>=>{
    try{
      const resultRequest = await axiosSecureInstance.post('/users/createFirstUser', {login, password})
      return {isError:false, payload: resultRequest.data.data}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public checkExistanceUser=async(login:string, password:string):Promise<iCheckExistanceUser>=>{
    try{
      const resultRequest = await axiosSecureInstance.post('/users/checkUser',{login, password})
      return {isError:false, payload: resultRequest.data.data}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
  
  public checkAdminUser=async():Promise<iDefaultResponseService>=>{
    try{
      const resultRequest = await axiosSecureInstance.get('/users/checkAdmin')
      const {isError} = resultRequest.data
      return {isError}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.response?.data.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

}

export default new ServiceAuthentication()