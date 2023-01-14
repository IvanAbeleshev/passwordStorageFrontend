import axiosInstance from '../common'

class PasswordGroupsServices{
  public getAllGroups=async()=>{
    try{
      const resultRequest = await axiosInstance.get('/groups/')
      return resultRequest.data.data
    }catch(error){
      return undefined
    }
  }

  public createGroup=async(name: string)=>{
    try{
      const resultRequest = await axiosInstance.post('/groups/create', {name})
      return resultRequest.data.data
    }catch(error){
      return undefined
    }

  }
}

export default new PasswordGroupsServices()