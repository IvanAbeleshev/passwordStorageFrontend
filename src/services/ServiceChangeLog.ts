import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import ModelLog from '../models/ModelLog'
import { axiosSecureInstance } from './axiosInstances'

interface iGetAll extends iDefaultResponseService{
  payload: ModelLog[],
  pages:number,
}

interface iGetItem extends iDefaultResponseService{
  payload: ModelLog
}

class ServiceChangeLog{
  private amountOnPage = 15
  
  public getAll=async(page:number):Promise<iGetAll>=>{
    try{
      const resultRequest = await axiosSecureInstance.post(`/changeLog?page=${page}&limit=${this.amountOnPage}`)
      const {rows, count} = resultRequest.data.data
      const payload:ModelLog[] = []
      for(let item of rows){
        payload.push(new ModelLog(item)) 
      }
      const tempResultOfDivide = count/this.amountOnPage
      const pages = tempResultOfDivide>Math.trunc(tempResultOfDivide)?Math.trunc(tempResultOfDivide)+1:Math.trunc(tempResultOfDivide)

      return {isError: false, pages, payload}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getItem=async(id:number):Promise<iGetItem>=>{
    try{
      const resultRequest = await axiosSecureInstance.get(`/changeLog/getOne?id=${id}`)
      const payload = new ModelLog(resultRequest.data.data)

      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
}

export default new ServiceChangeLog()