import { axiosSecureInstance } from './axiosInstances'

class ServiceSecureImage{

  public getImage=async(urlImg:string):Promise<Blob>=>{
    const result = await axiosSecureInstance.get(urlImg, {responseType:'blob'})
    return result.data
  }

}

export default new ServiceSecureImage()