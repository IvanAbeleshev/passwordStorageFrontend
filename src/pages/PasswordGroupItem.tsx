import { UploadFile } from 'antd'
import { useState, FormEventHandler, ChangeEventHandler, MouseEventHandler } from 'react'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import ImageUploader from '../components/ImageUploader'
import EmployeeSelector from '../components/selectors/EmployeeSelector'
import Employee from '../models/ModelEmployee'
import ServicePasswordGroup from '../services/ServicePasswordGroup'
import { useAppDispatch } from '../store/hooks/storeHooks'
import { hideModalWindow } from '../store/modalWindowSlice'
import { fetchPasswordsGroups } from '../store/passwordsGroupsSlice'


interface iInputsData{
  name: string,
  owner?: string,
  icon?: string
}

interface iValidationPasswordGroupForm{
  [key:string]: boolean
}

const PasswordGroupItem=()=>{
  const [inputsData, setInputsData] = useState<iInputsData>({name:''})
  const [iconBlob, setIconBlob] = useState<Blob>()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()
  const [validation, setValidation] = useState<iValidationPasswordGroupForm>({name: false})

  const dispatch = useAppDispatch()
  const submitForm: FormEventHandler=(event)=>{
    event.preventDefault()
  }

  const validateInputs=(name:string, value:string)=>{
    switch(name){
      case 'name':{
        value.length>=3?
          setValidation({...validation, [name]:true}):
          setValidation({...validation, [name]:false})
        break
      }
      default:{
        setValidation({...validation, [name]:true})
      }
    }
  }

  const changeInputHandler: ChangeEventHandler=(event)=>{
    const target = event.target as HTMLInputElement
    validateInputs(target.name, target.value)
    setInputsData({...inputsData, [target.name]:target.value})
  }

  const clickCreate:MouseEventHandler=()=>{

    ServicePasswordGroup.createGroup(inputsData.name, selectedEmployee?.id, iconBlob).then(
      ()=>{
        dispatch(fetchPasswordsGroups())
        dispatch(hideModalWindow())
      })
    
  }

  return(
    <form 
      className='flex flex-col items-center gap-3 p-5' 
      onSubmit={submitForm}
    >
      <div className='flex items-center gap-3'>
        <ImageUploader setBlob={setIconBlob} />
        
        <div className='flex flex-col gap-7'>
          <CustomPlaceholderInput
            placeholder='Name' 
            value={inputsData?.name}
          >
            <input 
              className={`
                ${!validation.name&&'bg-rose-300'}
                border 
                border-main 
                shadow-black 
                shadow-md 
                rounded-md`}
              value={inputsData?.name}
              onChange={changeInputHandler} 
              type='text' 
              name='name' 
              id='name'
            />
          </CustomPlaceholderInput>
          <EmployeeSelector setSelect={setSelectedEmployee} />
        </div>
      </div>
      
      <button 
        onClick={clickCreate}
        className='bg-btn px-4 py-3 text-xl rounded-full hover:bg-btn-hover'
      >
        Create
      </button>
    </form>
  )
}

export default PasswordGroupItem