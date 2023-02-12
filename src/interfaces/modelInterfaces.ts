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
  passwordGroupId: number
}