import { en_userRoleType } from '../interfaces'
import { iUser } from '../interfaces/modelInterfaces'

class ModelUser implements iUser{
  id?: number
  login: string = ''
  role: en_userRoleType = en_userRoleType.user

  public constructor(data: iUser){
    this.id = data.id
    this.login = data.login
    this.role = data.role
  }

  public getStructureData():iUser{
    return({
      id: this.id,
      login: this.login,
      role: this.role
    })
  }
}