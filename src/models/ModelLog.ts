import { iLogItem } from '../interfaces/modelInterfaces'

interface iChangeDetails{
  field: string,
  currentValue: any,
  previousValue: any
}
interface iErrorDetails{
  method: string,
  error: string
}

class ModelLog implements iLogItem{
  id: number
  createdAt: Date
  actionType: string
  actionUserId?: number
  metaData?: string
  details?: string
  detailsData?: iChangeDetails[]|iErrorDetails

  constructor(data:iLogItem){
    this.id = data.id
    this.actionType = data.actionType
    this.actionUserId = data.actionUserId
    this.metaData = data.metaData
    this.details = data.details
    this.createdAt = data.createdAt
    if(data.details)
      this.detailsData = JSON.parse(data.details)
  }
}

export default ModelLog