import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { useState, FormEventHandler, ChangeEventHandler } from 'react'
import passwordsGroups from '../services/passwordsGroups'
import Button from 'antd/es/button'

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
  });

const PasswordGroupItem=()=>{
  const [inputsData, setInputsData] = useState<iInputsData>({name:''})
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

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
    <form className='flex flex-col items-center gap-3 p-5' onSubmit={submitForm}>
      <div className='flex items-center gap-3'>
        <div>
          <Upload {...props}>
            <button className='transition-all border-8 border-[#23a6d5] h-[150px] w-[150px] rounded-full shadow-xl hover:border-[#16ddf7]'>upload</button>
          </Upload>
        </div>
        
        <div className='flex flex-col gap-5'>
          <input className='shadow-2xl border-2 shadow-black' value={inputsData?.name} onChange={changeInputHandler} type='text' name='name' id='name' placeholder='Name' />
          <input className='shadow-2xl border-2 shadow-black' type='text' name='ownew' id='owner' placeholder='Owner' />
        </div>
      </div>
      
      <button className='bg-black text-white hover:bg-black/80'>Create</button>
    </form>
  )
}

export default PasswordGroupItem