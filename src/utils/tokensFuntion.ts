import jwt_decode from 'jwt-decode'
import { iJWTDecode } from '../interfaces'
export const decodeToken=(token:string)=>{
  const result:iJWTDecode = jwt_decode(token)
  return result
}