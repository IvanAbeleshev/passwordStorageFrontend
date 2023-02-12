import { isAxiosError } from 'axios'
import { iDefaultResponseService } from '../interfaces'
import { iEmployee } from '../interfaces/modelInterfaces'
import ModelEmployee from '../models/ModelEmployee'
import Employee from '../models/ModelEmployee'
import { axiosSecureInstance } from './axiosInstances'

interface iGetEmployeeForSelector extends iDefaultResponseService{
  payload: Employee[],
  countOfFinded: number
}

interface iEmployeeList extends iDefaultResponseService{
  pages:number,
  dataList: ModelEmployee[]
}

interface iGetItemEmloyee extends iDefaultResponseService{
  payload: ModelEmployee
}

class ServiceEmployee{
  private requiredAmountItems = 5
  private requiredAmountItemsForList = 20

  public changeItemEmployee=async(data:iEmployee, id?:string, profileImage?:Blob):Promise<iDefaultResponseService>=>{
    if(!id)
      throw new Error('id employee is missing!')

    try{
      const formData = new ModelEmployee(data).getFormDataPackage(profileImage)
      await axiosSecureInstance.post(`/employees/changeOne?id=${id}`, formData)
      return {isError: false}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public getItemEmployee=async(id?:string):Promise<iGetItemEmloyee>=>{
    if(!id)
      throw new Error('id employee is missing!')

    try{
      const requestResult = await axiosSecureInstance.get(`/employees/getOne?id=${id}`)
      const payload = new ModelEmployee(requestResult.data.data)
      return {isError: false, payload}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }

  public getEmployeeList=async(page:number, searchString:string):Promise<iEmployeeList>=>{
    try{
      const requestResult = await axiosSecureInstance.get(`/employees?page=${page}&limit=${this.requiredAmountItemsForList}${searchString?`&searchString=${searchString}`:''}`)
      const {rows, count} = requestResult.data.data
      const dataList:ModelEmployee[] = []
      for(let item of rows){
        dataList.push(new ModelEmployee(item)) 
      }

      const tempResultOfDivide = count/this.requiredAmountItemsForList
      const pages = tempResultOfDivide>Math.trunc(tempResultOfDivide)?Math.trunc(tempResultOfDivide)+1:Math.trunc(tempResultOfDivide)

      return {isError: false, dataList, pages}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
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
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }
  }

  public createEmployee=async(data:iEmployee, profileImage?:Blob):Promise<iDefaultResponseService>=>{
    const sendingPacket = new Employee(data).getFormDataPackage(profileImage)
    try{
      const resultRequest = await axiosSecureInstance.post('/employees/createOne', sendingPacket)
      return {isError:false, message: resultRequest.data.message}
    }catch(error){
      if(isAxiosError(error)){
        const message=error.response?.data.message||error.message
        throw new Error(message)
      }
      throw new Error('error in algoritm frontEnd part')
    }

  }
}

export default new ServiceEmployee()