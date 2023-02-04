import { BACKEND_URL } from '../constans'
import { iPasswordGroup } from '../interfaces/modelInterfaces'
import ModelEmployee from './ModelEmployee'

class ModelPasswordsGroup{
  protected _id?:number
  protected _name:string = ''
  protected _icon?:string
  protected _idEmployee?:number
  protected _employee?: ModelEmployee

  constructor(incomingData:iPasswordGroup){
    this._id = incomingData.id
    this._name = incomingData.name
    this._icon = incomingData.icon?`${BACKEND_URL}${incomingData.icon}`:'img/NoImage.jpg'
    this._employee = incomingData.employee&&new ModelEmployee(incomingData.employee)
  }
  
  public get id(){
    return this._id
  }
  public get name(){
    return this._name
  }
  public get icon(){
    return this._icon
  }
  public get idEmmployee(){
    return this._idEmployee
  }
  public get employee(){
    return this._employee
  }

  public getStucturedData=():iPasswordGroup=>{
    return({
      id: this._id?this._id:0,
      name: this._name,
      icon: this._icon,
      id_employee: this._idEmployee,
      employee: this._employee?.getStructureData()
    })
  }
}

export default ModelPasswordsGroup