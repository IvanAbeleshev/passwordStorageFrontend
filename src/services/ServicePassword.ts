import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { iPassword } from '../interfaces/modelInterfaces'
import ModelPassword from '../models/ModelPassword'
import { axiosSecureInstance } from './axiosInstances'

interface iGetPasswordList extends iDefaultResponseService{
  payload: ModelPassword[],
  pages: number
}

interface iGetPasswordItem extends iDefaultResponseService{
  payload: ModelPassword
}

interface iGetPropertyPassword extends iDefaultResponseService{
  payload: string
}

class ServicePassword{
  private requiredAmountItemsForList = 20
  
  public changePassword=async(sendingData:iPassword|Partial<iPassword>, id?:string)=>{
    if(!id)
      throw new Error('id item is missing')

    try{
      await axiosSecureInstance.post(`/passwords/changeItem?id=${id}`, sendingData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }

  public getPropertyPassword=async(id?:string):Promise<iGetPropertyPassword>=>{
    if(!id)
      throw new Error('id item is missing')
      
    try{
      const requestResult = await axiosSecureInstance(`/passwords/getCorectPassword?id=${id}`)
      return {isError: false, payload: requestResult.data.data }
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getPasswordItem=async(id?:string):Promise<iGetPasswordItem>=>{
    if(!id)
      throw new Error('id item is missing')
      
    try{
      const requestResult = await axiosSecureInstance.get(`/passwords/getOne?id=${id}`)
      const payload = new ModelPassword(requestResult.data.data)
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createPassword=async(sendingData:iPassword):Promise<iDefaultResponseService>=>{
    try{
      await axiosSecureInstance.post(`/passwords/create`, sendingData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getPasswordList=async(page:number, employeeId?:number, serviceId?:number, passwordGroupId?:number):Promise<iGetPasswordList>=>{
    try{
      const requestResult = await axiosSecureInstance.get(`/passwords?page=${page}&limit=${this.requiredAmountItemsForList}`)
      const {rows, count} = requestResult.data.data
      const payload:ModelPassword[] = []
      for(let item of rows){
        payload.push(new ModelPassword(item)) 
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

}

export default new ServicePassword()