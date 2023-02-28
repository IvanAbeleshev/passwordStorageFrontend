import dateFormat from 'dateformat'

export const formatDateToStandartDateFormat=(incomingDate: Date):string=>{
  return dateFormat(incomingDate, 'paddedShortDate')
}

export const formatDateToDefaultDateFormat=(incoming?: Date):string=>{

  return incoming?dateFormat(incoming, 'default'):''
}