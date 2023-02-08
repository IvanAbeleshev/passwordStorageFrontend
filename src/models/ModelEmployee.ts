import { BACKEND_URL } from '../constans'
import { iEmployee } from '../interfaces/modelInterfaces'

class ModelEmployee implements iEmployee{
  id?: number
  name: string = ''
  jobTitle?: string
  employmentDate?: Date
  dismissDate?: Date
  img?: string
  comment?: string
  
  constructor(incomingData:iEmployee){
    this.id              = incomingData.id
    this.name            = incomingData.name
    this.jobTitle        = incomingData.jobTitle
    this.employmentDate  = incomingData.employmentDate
    this.dismissDate     = incomingData.dismissDate
    this.img             = `${BACKEND_URL}${incomingData.img}`
    this.comment         = incomingData.comment
  }

  public getStructureData():iEmployee{
    return({
      name: this.name,
      comment: this.comment,
      dismissDate: this.dismissDate,
      employmentDate: this.employmentDate,
      id: this.id,
      img: this.img,
      jobTitle: this.jobTitle,
    })
  }

  public getFormDataPackage(image?:Blob){
    const formData = new FormData()
    formData.append('name', this.name)
    this.jobTitle&&formData.append('jobTitle', this.jobTitle)
    this.employmentDate&&formData.append('employmentDate', String(this.employmentDate))
    this.dismissDate&&formData.append('dismissDate', String(this.dismissDate))
    this.comment&&formData.append('comment', this.comment)
    image?formData.append('profileImg', image):this.img&&formData.append('img', this.img.replaceAll(BACKEND_URL, ''))

    return formData
  }
}

export default ModelEmployee