import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import InputSelect from '../components/InputSelect'
import { searchMode } from '../interfaces'
import { searchEmployeeParam, searchServiceParam, setValue } from '../store/sliceSearchParam'
import styles from '../styles/pages/passwordItem.module.css'
import { faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosInstance, { defaultErrorHandler } from '../common'
import DefaultContainerData from '../components/DefaultContainerData'
import ServiceSelector from '../components/selectors/ServiceSelector'
import EmployeeSelector from '../components/selectors/EmployeeSelector'
import { iEmployee, iPassword, iPasswordGroup, iService } from '../interfaces/modelInterfaces'
import GroupSelector from '../components/selectors/GroupSelector'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import ServicePassword from '../services/ServicePassword'
import { errorNotificator, successNotificator } from '../utils/notificator'

const PasswordItem=()=>{
  const [employee, setEmployee] = useState<iEmployee>()
  const [service, setService] = useState<iService>()
  const [group, setGroup] = useState<iPasswordGroup>()

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [properPassword, setProperPassword] = useState(false)
  const [passwordBeforeChange, setPasswordBeforeChange] = useState('')
  const [inputsData, setInputsData] = useState<iPassword>({} as iPassword)
  const [enableSubmit, setEnableSubmit] = useState(false)

  const navigator = useNavigate()
  const{id} = useParams()

  useEffect(()=>{
    setInputsData({...inputsData, passwordGroupId: group?.id||0})
  },[group])

  useEffect(()=>{
    setInputsData({...inputsData, serviceId: service?.id||0})
  },[service])

  useEffect(()=>{
    setInputsData({...inputsData, employeeId: employee?.id||0})
  },[employee])

  const changeInputs:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(event)=>{
    setInputsData({...inputsData, [event.target.name]:event.target.value})
  }
  // useEffect(()=>{
  //     if(id === 'new'){
  //         setVisiblePassword(true)
  //         setProperPassword(true)
  //     }
  // },[id])

  // useEffect(()=>{
  //     if(id !== 'new'){
  //         axiosInstance.get(`/passwords/getOne?id=${id}`).then(replyRequest =>{
  //             const {login, password, comment, employee, service} = replyRequest.data.data
  //             setData({login, password, comment})
  //             dispatch(setValue({
  //                 employee:{value: employee.name, selectedId: employee.id},
  //                 service:{value: service.name, selectedId: service.id}
  //             }))
  //         }).catch(defaultErrorHandler)   
  //     }
  // },[id])

  // useEffect(()=>{
  //     if(employeeState.selectedId && serviceState.selectedId){
  //         return setEnableSubmit(true)
  //     }
  //     setEnableSubmit(false)
  // }, [employeeState.selectedId, serviceState.selectedId])

  // const handleCreateButton=()=>{
  //     const sendingData = {login: data.login, password: data.password, comment: data.comment, serviceId: serviceState.selectedId, employeeId: employeeState.selectedId}
      
  //     axiosInstance.post(`/passwords/create`, sendingData).then(replyRequest =>{navigator(-1)}).catch(defaultErrorHandler)
  // }

  // const handleChangeItem=()=>{
  //     const sendingData = {login: data.login, password: data.password, comment: data.comment, serviceId: serviceState.selectedId, employeeId: employeeState.selectedId}
      
  //     axiosInstance.post(`/passwords/changeItem?id=${id}`, sendingData).then(replyRequest =>{navigator(-1)}).catch(defaultErrorHandler)
  // }

  // const changeVisible=()=>{
  //     if(id!=='new' && !properPassword){
  //         axiosInstance.get(`/passwords/getCorectPassword?id=${id}`).then(replyRequest =>{
  //             setData({...data, password: replyRequest.data.data})
  //             setProperPassword(true)
  //             setVisiblePassword(!visiblePassword)
  //         }).catch(defaultErrorHandler)
  //     }else{
  //         setVisiblePassword(!visiblePassword)
  //     }

  // }

  // const onChange:React.ChangeEventHandler=(event)=>{
  //     const target = event.target as HTMLInputElement
  //     if(target.name === 'password' && !properPassword){
  //         const additionalValue = target.value.replace(passwordBeforeChange, '')
  //         axiosInstance.get(`/passwords/getCorectPassword?id=${id}`).then(replyRequest =>{
  //             setData({...data, password: replyRequest.data.data+additionalValue})
  //             setProperPassword(true)
  //         }).catch(defaultErrorHandler)
  //     }else(
  //         setData({...data, [target.name]:target.value})
  //     )
  // }
  // const passwordFocus: React.FocusEventHandler =(event)=>{
  //     const target = event.target as HTMLInputElement
  //     setPasswordBeforeChange(target.value)    
  // }

  const createPassword:MouseEventHandler=()=>{
    ServicePassword.createPassword(inputsData).then(
      ()=>{
        successNotificator('Create success', `Added new password to storage`)
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Create error', error.message))
  }

  return(
  <>
    <DefaultContainerData>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='flex justify-center items-stretch gap-5 min-w-[40%]'>
          <div className='flex flex-col gap-5 basis-1/2'>
            <ServiceSelector validation={true} setSelectedService={setService}/>
            <EmployeeSelector validation={true} setSelectedEmployee={setEmployee} />
            <GroupSelector validation={true} setSelectedGroup={setGroup} />
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
                name='password'
                value={inputsData.password}
                onChange={changeInputs}
                autoComplete='new-password'
                type='password' 
                className='shadow-md border w-full rounded-full px-2'
              />
            </CustomPlaceholderInput>
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