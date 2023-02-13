import { iPassword } from '../interfaces/modelInterfaces'
import ModelEmployee from './ModelEmployee'
import ModelPasswordsGroup from './ModelPasswordGroup'
import ModelService from './ModelService'

class ModelPassword implements iPassword{
  id?: number
  login?: string
  comment?: string
  password: string = ''
  serviceId: number = 0
  employeeId: number = 0
  passwordGroupId: number = 0
  _employee?:ModelEmployee
  _passwordGroup?:ModelPasswordsGroup
  _service?:ModelService
  
  public constructor(data:iPassword){
    this.password = data.password
    this.id = data.id
    this.login = data.login
    this.comment = data.comment
    this.serviceId = data.serviceId
    this.employeeId = data.employeeId
    this.passwordGroupId = data.passwordGroupId
    data.employee&&(this._employee = new ModelEmployee(data.employee))
    data.passwordGroup&&(this._passwordGroup = new ModelPasswordsGroup(data.passwordGroup))
    data.service&&(this._service = new ModelService(data.service))
  }

  public getStructureData=():iPassword=>{
    return{
      id: this.id,
      login: this.login,
      password: this.password,
      comment: this.comment,
      serviceId: this.serviceId,
      employeeId: this.employeeId,
      passwordGroupId: this.passwordGroupId,
      service: this._service?.getStructureData(),
      employee: this._employee?.getStructureData(),
      passwordGroup: this._passwordGroup?.getStucturedData(),
    }
  }
}

export default ModelPassword