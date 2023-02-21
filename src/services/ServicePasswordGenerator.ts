import { isAxiosError } from 'axios'
import { settingPasswordGenerator } from '../constans'
import { iDefaultResponseService } from '../interfaces'
import { iPasswordGenerator } from '../interfaces/modelInterfaces'
import { axiosSecureInstance } from './axiosInstances'

interface iGetSetting extends iDefaultResponseService{
  payload?:iPasswordGenerator
}
class ServicePasswordGenerator{
  public getSetting=async():Promise<iGetSetting>=>{
    try{
      const resultRequest = await axiosSecureInstance.post(
        '/applicationSetting/getPasswordGenerator', 
        {name: settingPasswordGenerator}
      )
      const payload:iPasswordGenerator = JSON.parse(resultRequest.data.data.setting)
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }
  
  public setSetting=async(payload:iPasswordGenerator)=>{
    try{
      await axiosSecureInstance.post(
        '/applicationSetting/setPasswordGenerator',
        {name: settingPasswordGenerator, setting: JSON.stringify(payload)})
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

export default new ServicePasswordGenerator()