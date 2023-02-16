import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { iPasswordGroup } from '../../interfaces/modelInterfaces'
import { useAppDispatch } from '../../store/hooks/storeHooks'
import { setPasswordFilterItem } from '../../store/passwordFilterSlice'
import SecureImage from '../SecureImage'

interface iPropsItemSubNavPanel{
  data: iPasswordGroup,
  subElement: boolean,
}
const ItemSubNavPanel=({ data, subElement }: iPropsItemSubNavPanel)=>{
  const dispatch = useAppDispatch()

  const clickItemHandle:MouseEventHandler=()=>{
    dispatch(setPasswordFilterItem({passwordGroup:data}))
  }

  return(
    <Link 
      to={'/passwordsList/1'}
      onClick={clickItemHandle}
    >
      <div 
        className='
          flex 
          items-center 
          hover:bg-white 
          rounded-full 
          hover:cursor-pointer'
      >
        <SecureImage
          preview={false}
          width={25}
          height={25}
          className='w-[25px] h-[25px] rounded-full' 
          src={data.icon} 
          alt='icon' 
        />
        <span>{data.name}</span>
      </div>
    </Link>
  )
}

export default ItemSubNavPanel