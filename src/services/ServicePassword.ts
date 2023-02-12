import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { iPassword } from '../interfaces/modelInterfaces'
import { axiosSecureInstance } from './axiosInstances'

class ServicePassword{
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
}

export default new ServicePassword()