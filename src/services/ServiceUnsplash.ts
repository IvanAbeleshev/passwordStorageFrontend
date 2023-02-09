import axios, { isAxiosError } from 'axios'
import { API_KEY_UNSPLASH } from '../constans'
import { iDefaultResponseService } from '../interfaces'

interface iGetImage extends iDefaultResponseService{
  payload:string[]
}

class ServiceUnsplash{
  private unsplashInstance = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers:{
      'Authorization': 'Client-ID ' + API_KEY_UNSPLASH
    }
  })
  
  public getImage=async(searchQuery?:string):Promise<iGetImage>=>{
    if(!searchQuery)
      throw new Error('Search query is empty!')

    try{
      const payload:string[] = []
      const formatQuery = searchQuery.replaceAll(' ','-')
      const requestResult = await this.unsplashInstance.get(`/search/photos?page=1&query=${formatQuery}&per_page=9`)
      for(let item of requestResult.data.results){
        payload.push(item.urls.regular)
      }
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
    
  }
}

export default new ServiceUnsplash()