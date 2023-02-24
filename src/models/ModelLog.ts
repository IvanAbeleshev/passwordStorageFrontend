import { iLogItem } from '../interfaces/modelInterfaces'

class ModelLog implements iLogItem{
  id: number
  createdAt: Date
  actionType: string
  actionUser?: number
  metaData?: string
  details?: string

  constructor(data:iLogItem){
    this.id = data.id
    this.actionType = data.actionType
    this.actionUser = data.actionUser
    this.metaData = data.metaData
    this.details = data.details
    this.createdAt = data.createdAt
  }
}

export default ModelLog