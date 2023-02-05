import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { axiosSecureInstance } from './axiosInstances'

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

class ServiceAuthentication{
  public signIn=async(login:string, password:string, code2FA:string):Promise<iSignIn>=>{
    try{
      const resulRequest = await axiosSecureInstance.post('/users/signIn', {login, password, code2FA})
      const {accessToken, refreshToken} = resulRequest.data.data
      return {isError: false, payload:{accessToken, refreshToken}}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }

  public createFirstUser=async(login:string, password:string):Promise<iCreateFirstUser>=>{
    try{
      const resulteRequest = await axiosSecureInstance.post('/users/createFirstUser', {login, password})
      return {isError:false, payload: resulteRequest.data.data}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public checkExistanceUser=async(login:string, password:string):Promise<iCheckExistanceUser>=>{
    try{
      const resulteRequest = await axiosSecureInstance.post('/users/checkUser',{login, password})
      return {isError:false, payload: resulteRequest.data.data}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
  
  public checkAdminUser=async():Promise<iDefaultResponseService>=>{
    try{
      const resulteRequest = await axiosSecureInstance.get('/users/checkAdmin')
      const {isError} = resulteRequest.data
      return {isError}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

}

export default new ServiceAuthentication()