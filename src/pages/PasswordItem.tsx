import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultContainerData from '../components/DefaultContainerData'
import ServiceSelector from '../components/selectors/ServiceSelector'
import EmployeeSelector from '../components/selectors/EmployeeSelector'
import { iEmployee, iPassword, iPasswordGroup, iService } from '../interfaces/modelInterfaces'
import GroupSelector from '../components/selectors/GroupSelector'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import ServicePassword from '../services/ServicePassword'
import { errorNotificator, infoNotificator, successNotificator } from '../utils/notificator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlock, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Popconfirm } from 'antd'
import { useAppSelector } from '../store/hooks/storeHooks'

const PasswordItem=()=>{
  const [employee, setEmployee] = useState<iEmployee>()
  const [service, setService] = useState<iService>()
  const [group, setGroup] = useState<iPasswordGroup>()

  const [inputsData, setInputsData] = useState<iPassword>({} as iPassword)
  const [isPasswordLock, setIsPasswordLock] = useState(true)
  const [isQuestionFill, setIsQuestionFill] = useState(false)

  const navigator = useNavigate()
  const{id} = useParams()
  const countFilters = useAppSelector(state=>state.passwordFilter.countActiveFilter)
  const filters = useAppSelector(state=>state.passwordFilter.filters)

  useEffect(()=>{
    setInputsData({...inputsData, passwordGroupId: group?.id||0})
  // eslint-disable-next-line
  },[group])

  useEffect(()=>{
    setInputsData({...inputsData, serviceId: service?.id||0})
  // eslint-disable-next-line
  },[service])

  useEffect(()=>{
    setInputsData({...inputsData, employeeId: employee?.id||0})
  // eslint-disable-next-line
  },[employee])

  const changeInputs:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(event)=>{
    setInputsData({...inputsData, [event.target.name]:event.target.value})
  }
  
  useEffect(()=>{
    if(id==='new'&&countFilters>0){
      setIsQuestionFill(true)
    }
  },[id, countFilters])

  useEffect(()=>{
    if(id !== 'new'){
      ServicePassword.getPasswordItem(id).then(
        ({payload})=>{
          setInputsData(payload.getStructureData())
        }
      ).catch(error=>{
        errorNotificator('Read error', error.message)
        navigator('/')
      })
    }else{
      setIsPasswordLock(false)
    }
  },[id, navigator])

  const createPassword:MouseEventHandler=()=>{
    ServicePassword.createPassword(inputsData).then(
      ()=>{
        successNotificator('Create success', `Added new password to storage`)
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Create error', error.message))
  }

  const changeItem:MouseEventHandler=()=>{
    if(isPasswordLock){
      const sendingData:Partial<iPassword> = {...inputsData}
      delete sendingData.password
      ServicePassword.changePassword(sendingData, id).then(
        ()=>{
          successNotificator('Changed success', `Item ${inputsData.login} is changed`)
          navigator(-1)
        }
      ).catch(error=>errorNotificator('Create error', error.message))
    }else{
      ServicePassword.changePassword(inputsData, id).then(
        ()=>{
          successNotificator('Changed success', `Item ${inputsData.login} is changed`)
          navigator(-1)
        }
      ).catch(error=>errorNotificator('Create error', error.message))
    }
  }

  const changeLockPassword=()=>{
    setIsPasswordLock(!isPasswordLock)
    setInputsData({...inputsData, password: ''})
    if(isPasswordLock){
      ServicePassword.getPropertyPassword(id).then(
        ({payload})=>{
          setInputsData({...inputsData, password: payload})
          infoNotificator('Get password', 'The password is received from db!')
        }
      )
    }
  }

  return(
  <>
    {isQuestionFill&&
      <div 
        className='
          fixed 
          top-0 
          left-0 
          bg-main/80 
          h-screen 
          w-screen 
          z-10 flex 
          justify-center 
          items-center'
      >
        <div className='relative bg-hover min-w-[30%] min-h-[30%] rounded-xl p-5 flex flex-col items-center justify-between'>
          <button 
            onClick={()=>setIsQuestionFill(false)}
            className='
              group 
              transition-all 
              flex 
              justify-center 
              items-center 
              absolute 
              right-3 
              top-3 
              border-2 
              p-1 
              w-7 
              h-7 
              rounded-md 
              border-black 
              hover:rounded-full 
              hover:bg-btn-err-hover'
          >
            <FontAwesomeIcon 
              className='transition-all group-hover:rotate-180' 
              icon={faXmark} 
            /> 
          </button>
          <h1 className='text-xl'>Autocomplete by filter fields?</h1>
          {filters.passwordGroup&&
          <h3>-password group: {filters.passwordGroup.name}</h3>
          }
          {filters.employee&&
          <h3>-employee: {filters.employee.name}</h3>
          }
          {filters.service&&
          <h3>-service: {filters.service.name}</h3>
          }
          <div className='flex gap-10 text-hover'>
            <button 
              onClick={()=>setIsQuestionFill(false)}
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn-s 
                hover:bg-btn-s-hover 
                hover:cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={()=>{
                setInputsData({...inputsData, ...filters})
                setIsQuestionFill(false)
              }}
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn 
                hover:bg-btn-hover 
                hover:cursor-pointer' 
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
    }
    <DefaultContainerData>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='flex justify-center items-stretch gap-5 min-w-[40%]'>
          <div className='flex flex-col gap-5 basis-1/2'>
            <GroupSelector 
              validation={true} 
              setSelectedGroup={setGroup} 
              selectedPasswordGroup={inputsData.passwordGroup} 
            />
            <EmployeeSelector 
              validation={true} 
              setSelectedEmployee={setEmployee} 
              selectedEmployee={inputsData.employee} 
            />
            <ServiceSelector 
              validation={true} 
              setSelectedService={setService} 
              selectedService={inputsData.service} 
            />
          </div>
          <div className='flex flex-col gap-5 basis-1/2'>
            <CustomPlaceholderInput
              placeholder='Login'
              value={inputsData.login}
            >
              <input 
                name='login'
                value={inputsData.login}
                onChange={changeInputs}
                autoComplete='new-password'
                type='text' 
                className='shadow-md border w-full rounded-full px-2'
              />
            </CustomPlaceholderInput>
            <CustomPlaceholderInput
              placeholder='Password'
              value={inputsData.password}
            >
              <input 
                disabled={isPasswordLock}
                name='password'
                value={inputsData.password}
                onChange={changeInputs}
                autoComplete='new-password'
                type={isPasswordLock?'password':'text'}
                className='shadow-md border w-full rounded-full px-2'
              />
            </CustomPlaceholderInput>
            <div>
              {isPasswordLock&&
                <Popconfirm
                  overlayClassName='text-main'
                  title='Unlock password'
                  description='Are you sure to unlock password?'
                  onConfirm={changeLockPassword}
                  okText='Unlock'
                  cancelText='Cancel'
                >
                  <FontAwesomeIcon
                    className='
                      text-btn 
                      text-2xl 
                      hover:text-btn-hover 
                      hover:cursor-pointer'
                    icon={faUnlock}
                  />
                </Popconfirm>
              }
            </div>
          </div>
        </div>
        <div>
          <CustomPlaceholderInput
            placeholder='Comment'
            value={inputsData.comment}
          >
            <textarea 
              value={inputsData.comment}
              onChange={changeInputs}
              name='comment'
              rows={10} 
              cols={50} 
              autoComplete='off'
              className='shadow-md w-full border rounded-xl px-2' 
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
              onClick={createPassword}
              type='button' 
              value='Create' 
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn 
                hover:bg-btn-hover 
                hover:cursor-pointer' 
            />:
            <input 
              onClick={changeItem}
              type='button' 
              value='Save changes' 
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn 
                hover:bg-btn-hover 
                hover:cursor-pointer' 
            />
          }
        </div>
      </div>
    </DefaultContainerData>
  </>
  )
}

export default PasswordItem