import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { iService } from '../interfaces/modelInterfaces'
import ModelService from '../models/ModelService'
import { axiosSecureInstance } from './axiosInstances'

interface iGetServiceList extends iDefaultResponseService{
  payload: ModelService[],
  pages: number,
}

interface iGetServiceItem extends iDefaultResponseService{
  payload: ModelService,
}

class ServiceOfServices{
  private requiredAmountItemsForList = 20

  public changeService=async(dataItem:iService, imgFile?:Blob):Promise<iDefaultResponseService>=>{
    try{
      const formData = new ModelService(dataItem).getFormDataPackage(imgFile)
      axiosSecureInstance.post('/services/update', formData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getServiceItem=async(id?:string):Promise<iGetServiceItem>=>{
    if(!id)
      throw new Error('id employee is missing!')

    try{
      const requestResult = await axiosSecureInstance.get(`/services/getOne?id=${id}`)
      const payload = new ModelService(requestResult.data.data)
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getServiceList=async(page:number, searchString?:string):Promise<iGetServiceList>=>{
    try{
      const payload:ModelService[] = []
      const requestResult = await axiosSecureInstance.get(`/services?page=${page}&limit=${this.requiredAmountItemsForList}${searchString?`&searchString=${searchString}`:''}`)
      for(let item of requestResult.data.data.rows){
        payload.push(new ModelService(item))
      }
      
      const tempResultOfDivide = requestResult.data.data/this.requiredAmountItemsForList
      const pages = tempResultOfDivide>Math.trunc(tempResultOfDivide)?Math.trunc(tempResultOfDivide)+1:Math.trunc(tempResultOfDivide)

      return{isError:false, payload, pages}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createItem=async(dataItem:iService, imgFile?:Blob):Promise<iDefaultResponseService>=>{
    try{
      const formData = new ModelService(dataItem).getFormDataPackage(imgFile)
      axiosSecureInstance.post('/services/createOne', formData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
}

export default new ServiceOfServices()