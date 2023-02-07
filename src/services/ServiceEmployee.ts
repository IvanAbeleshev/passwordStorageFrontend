import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { iEmployee } from '../interfaces/modelInterfaces'
import ModelEmployee from '../models/ModelEmployee'
import Employee from '../models/ModelEmployee'
import { axiosSecureInstance } from './axiosInstances'

interface iGetEmployeeForSelector extends iDefaultResponseService{
  payload?: Employee[],
  countOfFinded?: number
}

interface iEmployeeList extends iDefaultResponseService{
  pages:number,
  dataList: ModelEmployee[]
}

class ServiceEmployee{
  private requiredAmountItems = 5
  private requiredAmountItemsForList = 20

  public getEmployeeList=async(page:number, searchString:string):Promise<iEmployeeList>=>{
    try{
      const requestResult = await axiosSecureInstance.get(`/employees?page=${page}&limit=${this.requiredAmountItemsForList}${searchString?`&searchString=${searchString}`:''}`)
      console.log('result request: ', requestResult)
      const {rows, count} = requestResult.data.data
      const dataList:ModelEmployee[] = []
      for(let item of rows){
        dataList.push(new ModelEmployee(item)) 
      }

      const tempResultOfDivide = count/this.requiredAmountItemsForList
      const pages = tempResultOfDivide>Math.trunc(tempResultOfDivide)?Math.trunc(tempResultOfDivide)+1:Math.trunc(tempResultOfDivide)

      return {isError: false, dataList, pages}
    }catch(error){
      throw new Error('cant`t get emploees list')
    }

  }

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

  public createEmployee=async(data:iEmployee, profileImage?:Blob):Promise<iDefaultResponseService>=>{
    const sendingPacket = new Employee(data).getFormDataPackage(profileImage)
    try{
      const resultRequest = await axiosSecureInstance.post('/employees/createOne', sendingPacket)
      return {isError:false, message: resultRequest.data.message}
    }catch(error){
      if(isAxiosError(error)){
        throw new Error(error.message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }
}

export default new ServiceEmployee()