import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import ServiceUser from '../services/ServiceUser'
import { errorNotificator, successNotificator } from '../utils/notificator'

interface iPasswordsData{
  password:string,
  confirmPassword:string
}

const ChangePassword=()=>{
  const [passwordsInput, setPasswordsInput] = useState<iPasswordsData>({} as iPasswordsData)
  const [isShowPasswords, setIsShowPasswords] = useState(false)

  const navigator = useNavigate()

  const changeHandler:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setPasswordsInput({...passwordsInput, [event.target.name]: event.target.value})
  }

  const changePassword:MouseEventHandler=()=>{
    ServiceUser.changePassword(passwordsInput.password).then(
      ()=>{
        successNotificator('Change success', 'The password of this accaunt is changed')
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Change error', error.message))
  }

  return(
    <DefaultContainerData>
      <form className='flex flex-col items-center gap-7 p-3 dark:text-main'>
        <h1 className='text-2xl dark:text-hover'>Change your password</h1>
        <CustomPlaceholderInput
          placeholder='Password'
          value={passwordsInput.confirmPassword}
        >
        <input 
          autoComplete='new-password'
          className='shadow-md border w-full rounded-full px-2'
          value={passwordsInput.confirmPassword}
          onChange={changeHandler}
          type={isShowPasswords?'text':'password'} 
          name='confirmPassword' 
        />
        </CustomPlaceholderInput>

        <CustomPlaceholderInput
          placeholder='Confirm password'
          value={passwordsInput.password}
        >
        <input 
          autoComplete='new-password'
          className='shadow-md border w-full rounded-full px-2'
          value={passwordsInput.password}
          onChange={changeHandler}
          type={isShowPasswords?'text':'password'}
          name='password' 
        />
        </CustomPlaceholderInput>
        <Popover content='Change visible passwords' title='Visible'>
          <FontAwesomeIcon
            onClick={()=>setIsShowPasswords(!isShowPasswords)}
            className='
              text-btn 
              dark:text-dbtn 
              hover:text-btn-hover 
              c
              hover:cursor-pointer 
              text-xl'
            icon={isShowPasswords?faEyeSlash:faEye}
          />
        </Popover>
        {passwordsInput.password!==passwordsInput.confirmPassword&&
          <h2 className='text-lg text-center text-btn-err-hover'>
            The password doesn`t equal confirm password!
          </h2>
        }

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
          <input 
            disabled={passwordsInput.password!==passwordsInput.confirmPassword}
            type='button' 
            value='Change password' 
            onClick={changePassword}
            className={`
              ${
                passwordsInput.password!==passwordsInput.confirmPassword?
                  'bg-btn-err hover:bg-btn-err-hover':
                  'bg-btn dark:bg-dbtn hover:bg-btn-hover dark:hover:bg-dbtn-h'
              }
              py-2 
              px-6 
              rounded-xl 
              shadow-md 
               
              hover:cursor-pointer`
            }
          />
        </div>
      </form>
    </DefaultContainerData>
  )
}

export default ChangePassword