import { Switch } from 'antd'
import DefaultContainerData from '../components/DefaultContainerData'
import { getDarkModeValue, setDarkMode } from '../store/darkModeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'

const SwitchDarkMode=()=>{
  const isDarkMode = useAppSelector(getDarkModeValue)
  const dispatch = useAppDispatch()

  const changeMode=(checked:boolean)=>{
    dispatch(setDarkMode(checked))
  }

  return(
    <DefaultContainerData>
      <div className='flex gap-2'>
        <h3>Dark mode:</h3>
        <Switch 
          checked={isDarkMode} 
          onChange={changeMode} 
        />
      </div>
    </DefaultContainerData>
  )
}

export default SwitchDarkMode