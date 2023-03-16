import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import ModelUpdate from '../models/ModelUpdete'
import { axiosSecureInstance } from './axiosInstances'

interface iGetUpdateList extends iDefaultResponseService{
  payload: ModelUpdate[]
}

class ServiceDescriptionOfUpdate{
  public getChangeList=async(amount?:number):Promise<iGetUpdateList>=>{
    try{
      const payload:ModelUpdate[] = []
      const resultRequest = await axiosSecureInstance.get(`/update${amount?`?amount=${amount}`:''}`)
      for(let item of resultRequest.data.data){
        payload.push(new ModelUpdate(item))
      }
      return { isError:false, payload }
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
}

export default new ServiceDescriptionOfUpdate()