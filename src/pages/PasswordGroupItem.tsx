import { UploadFile } from 'antd'
import { useState, FormEventHandler, ChangeEventHandler } from 'react'
import ImageUploader from '../components/ImageUploader'
import EmployeeSelector from '../components/selectors/EmployeeSelector'
import Employee from '../models/ModelEmployee'


interface iInputsData{
  name: string,
  owner?: string,
  icon?: string
}

const PasswordGroupItem=()=>{
  const [inputsData, setInputsData] = useState<iInputsData>({name:''})
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()

  const submitForm: FormEventHandler=(event)=>{
    event.preventDefault()
    // passwordsGroups.createGroup(inputsData.name)
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
        <ImageUploader fileList={fileList} setFileList={setFileList} />
        
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
          <EmployeeSelector setSelectedEmployee={setSelectedEmployee} />
        </div>
      </div>
      
      <button className='bg-btn px-4 py-3 text-xl rounded-full hover:bg-btn-hover'>
        Create
      </button>
    </form>
  )
}

export default PasswordGroupItem