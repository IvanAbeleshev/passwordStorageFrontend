import { isAxiosError } from 'axios'
import { en_userRoleType, iDefaultResponseService } from '../interfaces'
import ModelUser from '../models/ModelUser'
import { axiosSecureInstance } from './axiosInstances'

interface iGetUsersList extends iDefaultResponseService{
  payload: ModelUser[],
  pages:number,
}

interface iGetUser extends iDefaultResponseService{
  payload: ModelUser
}

interface iChangeItem{
  login?: string,
  password?: string,
  role?: en_userRoleType,
  active:boolean
}

interface iGetUsersForSelector extends iDefaultResponseService{
  payload: ModelUser[],
  countOfFinded: number
}
class ServiceUser{
  private requiredAmountItemsForList = 20
  private requiredAmountItems = 5
  
  public changeUser=async(id:string, active:boolean, login?:string, password?:string, role?:en_userRoleType):Promise<iDefaultResponseService>=>{
    try{
      let sendingData:iChangeItem = {active}
      login&&(sendingData.login = login)
      password&&(sendingData.password = password)
      role&&(sendingData.role = role)
      await axiosSecureInstance.post(`/users/changeUser?id=${id}`, sendingData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getUser=async(userId:string):Promise<iGetUser>=>{
    try{
      const requestResult = await axiosSecureInstance.get(`/users/getOne?id=${userId}`)
      return {isError: false, payload: new ModelUser(requestResult.data.data)}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getUsersForSelector=async(search:string):Promise<iGetUsersForSelector>=>{
    try{
      const payload: ModelUser[] = []
      let countOfFinded = 0
      const requestResult = await axiosSecureInstance.get(`/users?page=1&limit=${this.requiredAmountItems}${search?`&searchString=${search}`:''}`)
      if(requestResult.data.data){
        const {count, rows} = requestResult.data.data
        for(let item of rows){
          payload.push(new ModelUser(item))
        }
        countOfFinded = count
      }
      return {isError: false, payload, countOfFinded }
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getUserList=async(page:number, search:string):Promise<iGetUsersList>=>{
    try{
      const requestResult = await axiosSecureInstance.get(`/users?page=${page}&limit=${this.requiredAmountItemsForList}${search?`&searchString=${search}`:''}`)
      const {rows, count} = requestResult.data.data
      const payload:ModelUser[] = []
      for(let item of rows){
        payload.push(new ModelUser(item)) 
      }
      const tempResultOfDivide = count/this.requiredAmountItemsForList
      const pages = tempResultOfDivide>Math.trunc(tempResultOfDivide)?Math.trunc(tempResultOfDivide)+1:Math.trunc(tempResultOfDivide)

      return{isError: false, payload, pages}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createUser=async(login:string, password:string, role:en_userRoleType, active:boolean):Promise<iDefaultResponseService>=>{
    try{
      await axiosSecureInstance.post(`/users`, {login, password, role, active})
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public changePassword=async(password:string):Promise<iDefaultResponseService>=>{
    try{
      await axiosSecureInstance.post('/users/changePassword', {password})
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
}

export default new ServiceUser()