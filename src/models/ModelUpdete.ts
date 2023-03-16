import { iUpdateLog } from '../interfaces/modelInterfaces'

class ModelUpdate implements iUpdateLog{
  date: Date
  description: string
  title: string

  constructor(data:iUpdateLog){
    this.date = data.date
    this.description = data.description
    this.title = data.title
  }
}

export default ModelUpdate