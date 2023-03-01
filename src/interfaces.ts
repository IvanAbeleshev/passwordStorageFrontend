export enum searchMode{
  employee = 'employee',
  service = 'service'
}

export enum en_userRoleType{
  admin = 'admin',
  user = 'user'
}

export interface iDefaultResponseService{
  isError: boolean,
  message?: string,
}

export interface iItemSubNavPanel{
  id: number,
  name: string,
  icon: string | null,
  idOwner: number | null
}

export interface iJWTDecode{
  id:number, 
  role: en_userRoleType, 
  login:string
}

export enum en_notificationStatus{
  success,
  error,
  info,
  warning
}

export interface iFilterList{
  startDate:string,
  endDate:string,
  actionFilterValue: string,
  metadataTypes: string,
}