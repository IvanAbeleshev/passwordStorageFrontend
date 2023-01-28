import { BACKEND_URL } from '../constans'
import { iPasswordGroup } from '../interfaces/modelInterfaces'

class ModelPasswordsGroup{
  protected _id?:number
  protected _name:string = ''
  protected _icon?:string
  protected _idEmployee?:number

  constructor(incomingData:iPasswordGroup){
    this._id = incomingData.id
    this._name = incomingData.name
    this._icon = incomingData.icon?`${BACKEND_URL}${incomingData.icon}`:'img/NoImage.jpg'
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

  public getStucturedData=():iPasswordGroup=>{
    return({
      id: this._id?this._id:0,
      name: this._name,
      icon: this._icon,
      id_employee: this._idEmployee
    })
  }
}

export default ModelPasswordsGroup