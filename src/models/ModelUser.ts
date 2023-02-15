import { en_userRoleType } from '../interfaces'
import { iUser } from '../interfaces/modelInterfaces'

class ModelUser implements iUser{
  id?: number
  login: string = ''
  role: en_userRoleType = en_userRoleType.user
  active: boolean = false

  public constructor(data: iUser){
    this.id = data.id
    this.login = data.login
    this.role = data.role
    this.active = data.active
  }

  public getStructureData():iUser{
    return({
      id: this.id,
      login: this.login,
      role: this.role,
      active: this.active
    })
  }
}

export default ModelUser