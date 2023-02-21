import { InputNumber, Switch } from 'antd'
import { SwitchChangeEventHandler } from 'antd/es/switch'
import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DefaultContainerData from '../components/DefaultContainerData'
import ServicePasswordGenerator from '../services/ServicePasswordGenerator'
import { useAppSelector } from '../store/hooks/storeHooks'
import { 
  setSettingPasswordLength, 
  setSettingUseExtraSymbols, 
  setSettingUseUpperCase 
} from '../store/passwordGeneratorSlice'
import { errorNotificator, successNotificator } from '../utils/notificator'


const PasswordGenerationSetting=()=>{

  const navigator = useNavigate()

  const passwordGeneratorSettings = useAppSelector(state=>state.passwordGenerator.passwordGenerationSetting)
  const dispatch = useDispatch()

  const changeValue=(value:number|null)=>{
    if(value)
      dispatch(setSettingPasswordLength(value))
  }

  const useUpperCaseChange:SwitchChangeEventHandler=(checked)=>{
    dispatch(setSettingUseUpperCase(checked))
  }
  
  const useExtraSymbolsChange:SwitchChangeEventHandler=(checked)=>{
    dispatch(setSettingUseExtraSymbols(checked))
  }

  const saveChange:MouseEventHandler=()=>{
    ServicePasswordGenerator.setSetting({
      passwordLength: passwordGeneratorSettings.passwordLength, 
      useUpperCaseSymbols: passwordGeneratorSettings.useUpperCaseSymbols, 
      useExtraSymbols: passwordGeneratorSettings.useExtraSymbols
    }).then(
      ()=>{
        successNotificator('Changed settings', 'Password generator settings was saved')
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Error saving', error.message))
  }

  return(
    <DefaultContainerData>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl'>
          Password generation settings
        </h1>
        <form 
          onSubmit={event=>event.preventDefault()}
          className='flex flex-col gap-5 py-5'
        >
          <div className='flex items-center gap-3'>
            <label htmlFor='passwordLength'>
              Length passwords:
            </label>
            <InputNumber 
              value={passwordGeneratorSettings.passwordLength}
              onChange={changeValue}
              className='shadow-md border w-full rounded-full px-2'
              id='passwordLength'
              name='passwordLength'
              min={6} 
              max={32} 
              defaultValue={8} 
            />
          </div>
          <div className='flex items-center gap-3'>
            <label htmlFor='useUpperCaseSymbols'>
              Use uppercase symbols:
            </label>
            <Switch 
              checked={passwordGeneratorSettings.useUpperCaseSymbols}
              onChange={useUpperCaseChange}
              id='useUpperCaseSymbols'
            />
          </div>
          <div className='flex items-center gap-3'>
            <label htmlFor='useExtraSymbols'>
              Use extra symbols:
            </label>
            <Switch 
              checked={passwordGeneratorSettings.useExtraSymbols}
              onChange={useExtraSymbolsChange}
              id='useExtraSymbols'
            />
          </div>
        </form>
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
            onClick={saveChange}
            type='button' 
            value='Save setting' 
            className='
              py-2 
              px-6 
              rounded-xl 
              shadow-md 
              bg-btn 
              hover:bg-btn-hover 
              hover:cursor-pointer' 
          />
        </div>
      </div>
    </DefaultContainerData>
  )
}

export default PasswordGenerationSetting