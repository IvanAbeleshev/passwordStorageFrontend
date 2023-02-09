import { iService } from '../interfaces/modelInterfaces'

class ModelService implements iService{
  id?: number | undefined
  img?: string | undefined
  description?: string | undefined
  name: string = ''

  constructor(data: iService){
    this.name         = data.name
    this.id           = data.id
    this.description  = data.description
    this.img          = data.img
  }
  
}

export default ModelService