import { BACKEND_URL } from '../constans'
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
    if(data.img&&data.img.indexOf('http')>-1){
      this.img = data.img  
    }else if(data.img&&data.img.indexOf('http')<0){
      this.img          = `${BACKEND_URL}${data.img}`
    }
    
  }
  
  public getStructureData():iService{
    return({
      id: this.id,
      name: this.name,
      description: this.description,
      img: this.img,
    })
  }

  public getFormDataPackage(image?:Blob){
    const formData = new FormData()
    formData.append('name', this.name)
    this.id&&formData.append('id', String(this.id))
    this.description&&formData.append('description', this.description)
    image?formData.append('newImage', image):this.img&&formData.append('img', this.img.replaceAll(BACKEND_URL, ''))

    return formData
  }
}

export default ModelService