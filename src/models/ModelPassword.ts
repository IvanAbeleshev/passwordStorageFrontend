import { iPassword } from '../interfaces/modelInterfaces'

class ModelPassword implements iPassword{
  id?: number
  login?: string
  comment?: string
  password: string = ''
  serviceId: number = 0
  employeeId: number = 0
  passwordGroupId: number = 0
  
  public constructor(data:iPassword){
    this.password = data.password
    this.id = data.id
    this.login = data.login
    this.comment = data.comment
    this.serviceId = data.serviceId
    this.employeeId = data.employeeId
    this.passwordGroupId = data.passwordGroupId
  }
}

export default ModelPassword