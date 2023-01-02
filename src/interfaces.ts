export enum searchMode{
  employee = 'employee',
  service = 'service'
}

export enum userRoleType{
  admin = 'admin',
  user = 'user'
}

export interface iItemSubNavPanel{
  id: number,
  name: string,
  icon: string | null,
  idOwner: number | null
}