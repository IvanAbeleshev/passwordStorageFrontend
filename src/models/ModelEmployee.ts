import { iEmployee } from '../interfaces/modelInterfaces'

class Employee{
  private _id?: number
  private _name: string
  private _jobTitle?: string
  private _employmentDate?: Date
  private _dismissDate?: Date
  private _img?: string
  private _comment?: string
  
  constructor(incomingData:iEmployee){
    this._id              = incomingData.id
    this._name            = incomingData.name
    this._jobTitle        = incomingData.jobTitle
    this._employmentDate  = incomingData.employmentDate
    this._dismissDate     = incomingData.dismissDate
    this._img             = incomingData.img
    this._comment         = incomingData.comment
  }

  get id(){
    return this._id
  }
  get name(){
    return this._name
  }
  get jobTitle(){
    return this._jobTitle
  }
  get employmentDate(){
    return this._employmentDate
  }
  get dismissDate(){
    return this._dismissDate
  }
  get img(){
    return this._img
  }
  get comment(){
    return this._comment
  }
}

export default Employee