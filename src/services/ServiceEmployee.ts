import { iDefaultResponseService } from '../interfaces'
import Employee from '../models/ModelEmployee'
import { axiosSecureInstance } from './axiosInstances'

interface iGetEmployeeForSelector extends iDefaultResponseService{
  payload?: Employee[],
  countOfFinded?: number
}

class ServiceEmployee{
  private requiredAmountItems = 5

  public getEmployeeForSelector=async(searchText:string):Promise<iGetEmployeeForSelector>=>{
    try{
      const payload: Employee[] = []
      let countOfFinded = 0
      const requestResult = await axiosSecureInstance.get(`/employees?page=1&limit=${this.requiredAmountItems}${searchText?`&searchString=${searchText}`:''}`)
      if(requestResult.data.data){
        const {count, rows} = requestResult.data.data
        for(let item of rows){
          payload.push(new Employee(item))
        }
        countOfFinded = count
      }
      return {isError: false, payload, countOfFinded }
    }catch(error){
      throw new Error('cant`t get emploees list')
    }
    

  }
}

export default new ServiceEmployee()