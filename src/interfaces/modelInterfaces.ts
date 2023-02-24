import { en_userRoleType } from "../interfaces"

export interface iEmployee{
  id?: number,
  name: string,
  jobTitle?: string,
  employmentDate?: Date,
  dismissDate?: Date,
  img?: string,
  comment?:string
}

export interface iPasswordGroup{
  id:number,
  name:string,
  icon?:string,
  id_employee?:number,
  employee?: iEmployee
}

export interface iService{
  id?:number,
  name:string,
  description?:string,
  img?: string
}

export interface iPassword{
  id?: number, 
  login?: string,
  password: string,
  comment?: string,
  serviceId: number,
  employeeId: number,
  passwordGroupId: number,
  employee?: iEmployee,
  passwordGroup?: iPasswordGroup,
  service?: iService
}

export interface iUser{
  id?: number,
  login: string,
  role: en_userRoleType,
  active: boolean
}

export interface iPasswordGenerator{
  passwordLength:number,
  useUpperCaseSymbols:boolean,
  useExtraSymbols:boolean,
}

export interface iLogItem{
  id:number,
  createdAt: Date,
  actionUser?:number,
  actionType:string,
  metaData?:string,
  details?:string,
}