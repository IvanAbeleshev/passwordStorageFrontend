import { useEffect, useState } from 'react'
import { iPasswordGroup } from '../../interfaces/modelInterfaces'

interface iPropsItemSubNavPanel{
  data: iPasswordGroup,
  subElement: boolean,
}
const ItemSubNavPanel=({ data, subElement }: iPropsItemSubNavPanel)=>{
  const [currentVisible, setCurrentVisible] = useState<boolean>(false)
  
  useEffect(()=>{
    setCurrentVisible(true)
  },[])

  return(
    <div 
      className={`
        transition-all 
        duration-500
        ${currentVisible?
          `${subElement?'translate-x-[12px]':'translate-x-0' } opacity-100`:
          '-translate-x-[100px] opacity-0'
        }`
      }
    >
      <div 
        className='
          flex 
          items-center 
          hover:bg-white 
          rounded-full 
          hover:cursor-pointer'
      >
        <img 
          className='w-[25px] h-[25px] rounded-full' 
          src={data.icon} 
          alt='icon' 
        />
        <span>{data.name}</span>
      </div>
    </div>
  )
}

export default ItemSubNavPanel