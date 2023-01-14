import { Image, Upload } from 'antd'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { useState, FormEventHandler, ChangeEventHandler } from 'react'
import passwordsGroups from '../services/passwordsGroups'


interface iInputsData{
  name: string,
  owner?: string,
  icon?: string
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  })

const PasswordGroupItem=()=>{
  const [inputsData, setInputsData] = useState<iInputsData>({name:''})
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('')

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setPreviewImage(URL.createObjectURL(file))
      
      return false
    },
    fileList,
  }

  const submitForm: FormEventHandler=(event)=>{
    event.preventDefault()
    passwordsGroups.createGroup(inputsData.name)
  }

  const changeInputHandler: ChangeEventHandler=(event)=>{
    const target = event.target as HTMLInputElement
    setInputsData({...inputsData, [target.name]:target.value})
  }

  return(
    <form 
      className='flex flex-col items-center gap-3 p-5' 
      onSubmit={submitForm}
    >
      <div className='flex items-center gap-3'>
        <div>
          {
            previewImage===''?
            <Upload {...props}>
              <button 
                className='
                  transition-all 
                  border-8 
                  border-btn 
                  h-[150px] 
                  w-[150px] 
                  rounded-full 
                  shadow-xl 
                  hover:border-btn-hover'
              >
                upload
              </button>
            </Upload>:
            <div className='pic-container relative'>
              <Image
                className='rounded-full'
                width={150}
                src={previewImage}
              />
              <div className='absolute top-0 right-0 text-white pic-container-hover:cursor-pointer'>
                escape
              </div>
            </div>
          }
        </div>
        
        <div className='flex flex-col gap-5'>
          <input 
            className='border-2 shadow-black shadow-md rounded-md' 
            value={inputsData?.name} 
            onChange={changeInputHandler} 
            type='text' 
            name='name' 
            id='name'
            placeholder='Name' 
          />
          <input 
            className='border-2 shadow-black shadow-md rounded-md' 
            type='text' 
            name='ownew' 
            id='owner' 
            placeholder='Owner' 
          />
        </div>
      </div>
      
      <button className='bg-btn px-3 py-2 rounded-full hover:bg-btn-hover'>
        Create
      </button>
    </form>
  )
}

export default PasswordGroupItem