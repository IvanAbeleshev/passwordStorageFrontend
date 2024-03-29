import { DatePicker } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import ImageUploader from '../components/ImageUploader'
import { iEmployee } from '../interfaces/modelInterfaces'
import ServiceEmployee from '../services/ServiceEmployee'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { errorNotificator, successNotificator } from '../utils/notificator'


const { RangePicker } = DatePicker

const EmployeeItem=()=>{
  const [profileBlob, setProfileBlob] = useState<Blob>()

  const [inputsData, setInputsData] = useState({} as iEmployee)

  const {id} = useParams()
  const navigator = useNavigate()

  useEffect(()=>{
    if(id !=='new'){ 
      ServiceEmployee.getItemEmployee(id).then(({payload})=>{
        setInputsData(payload.getStructureData())
      }).catch(error=>errorNotificator('Read error', error.message))
    }
  // eslint-disable-next-line
  }, [id])

  const changeInputsHandler:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(event)=>{
    setInputsData({...inputsData, [event.target.name]:event.target.value})
  }

  const createNewItem:MouseEventHandler=()=>{
    ServiceEmployee.createEmployee(inputsData, profileBlob).then(
      ()=>{
        successNotificator('Create success', `Created new employee: ${inputsData.name}`)
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Create error', error.message))
  }

  const saveChanges:MouseEventHandler=()=>{
    ServiceEmployee.changeItemEmployee(inputsData, id, profileBlob).then(
      ()=>{
        successNotificator('Change success', `Changed employee: ${inputsData.name}`)
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Change error', error.message))
  }
  
  const changeRange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if(dates){
      const [start, end] = dates
      setInputsData({...inputsData,
        employmentDate: start?.toDate(),
        dismissDate: end?.toDate()
      })
    }
  }
  return(
    <DefaultContainerData>
      <form 
        onSubmit={event=>event.preventDefault()}
        className='flex flex-col justify-center items-center w-full'
      >
        <div className='flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
          <div className='text-main dark:text-hover'>
            <ImageUploader setBlob={setProfileBlob} urlImg={inputsData.img} />
          </div>
          <div className='flex flex-col justify-between p-5 gap-5 dark:text-main'>
            <CustomPlaceholderInput
              placeholder='Name'
              value={inputsData.name}
            >
              <input 
                name='name'
                autoComplete='off'
                type='text' 
                className='shadow-md border w-full rounded-full px-2' 
                value={inputsData.name}
                onChange={changeInputsHandler}
              />
            </CustomPlaceholderInput>

            <CustomPlaceholderInput
              placeholder='Job title'
              value={inputsData.jobTitle}
            >
              <input 
                name='jobTitle'
                autoComplete='off'
                type='text' 
                className='shadow-md border w-full rounded-full px-2' 
                value={inputsData.jobTitle}
                onChange={changeInputsHandler}
              />
            </CustomPlaceholderInput>

            <RangePicker 
              value={[
                inputsData.employmentDate?dayjs(inputsData.employmentDate):null,
                inputsData.dismissDate?dayjs(inputsData.dismissDate):null
              ]}
              onChange={changeRange} 
              className='rounded-full shadow-md ' 
            />
          </div>
        </div>
        <div className='pt-7 dark:text-main'>
          <CustomPlaceholderInput
            placeholder='Comment'
            value={inputsData.comment}
          >
            <textarea 
              name='comment'
              rows={10} 
              cols={50} 
              autoComplete='off'
              className='shadow-md border w-full rounded-xl px-2' 
              value={inputsData.comment}
              onChange={changeInputsHandler}
            />
          </CustomPlaceholderInput>
        </div>
        <div className='pt-5 flex gap-10 text-hover'>
          <input 
            onClick={event=>{
              event.preventDefault()
              navigator(-1)
            }}
            type='button' 
            value='Back' 
            className='
              py-2 
              px-6 
              rounded-xl 
              shadow-md 
              bg-btn-s 
              hover:bg-btn-s-hover 
              hover:cursor-pointer'
          />
          {id==='new'?
            <input 
              onClick={createNewItem}
              type='button' 
              value='Create' 
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn 
                dark:bg-dbtn
                hover:bg-btn-hover 
                dark:hover:bg-dbtn-h
                hover:cursor-pointer' 
            />:
            <input 
              onClick={saveChanges}
              type='button' 
              value='Save changes' 
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn 
                dark:bg-dbtn
                hover:bg-btn-hover 
                dark:hover:bg-dbtn-h
                hover:cursor-pointer' 
            />
          }
        </div>
      </form>
      
    </DefaultContainerData>
      
  )
}

export default EmployeeItem