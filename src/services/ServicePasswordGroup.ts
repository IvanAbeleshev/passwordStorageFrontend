import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import ModelPasswordsGroup from '../models/ModelPasswordGroup'
import { axiosSecureInstance } from './axiosInstances'

interface iGetAllGroups extends iDefaultResponseService{
  payload: ModelPasswordsGroup[]
}

class ServicePasswordGroup{
  public getAllGroups=async():Promise<iGetAllGroups>=>{
    try{
      const resultRequest = await axiosSecureInstance.get('/groups')
      const payload:ModelPasswordsGroup[] = []
      for(let item of resultRequest.data.data){
        payload.push(new ModelPasswordsGroup(item))
      }
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createGroup=async(name:string, employeeId?:number, icon?:Blob):Promise<iDefaultResponseService>=>{
    try{
      const formData = new FormData()
      formData.append('name', name)
      if(employeeId){
        formData.append('employeeId', String(employeeId))
      }
      let additionalContentType
      if(icon){
        additionalContentType = {headers: {'Content-Type': 'multipart/form-data'}}
        formData.append('icon', icon)
      }

      await axiosSecureInstance.post('/groups/create', formData , additionalContentType)
      return {isError:false}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }
}

export default new ServicePasswordGroup()