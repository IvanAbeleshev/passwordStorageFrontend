export enum searchMode{
  employee = 'employee',
  service = 'service'
}

export enum userRoleType{
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
  role: userRoleType, 
  login:string
}

export enum en_notificationStatus{
  success,
  error,
  info,
  warning
}