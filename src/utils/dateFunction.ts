import dateFormat from 'dateformat'

export const formatDateToStandartDateFormat=(incomingDate: Date):string=>{
  return dateFormat(incomingDate, 'paddedShortDate')
}