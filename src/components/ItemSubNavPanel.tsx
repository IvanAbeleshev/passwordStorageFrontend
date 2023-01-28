import { useEffect, useState } from 'react'
import { iPasswordGroup } from '../interfaces/modelInterfaces'

interface iPropsItemSubNavPanel{
  delay: number,
  data: iPasswordGroup,
}
const ItemSubNavPanel=({data, delay}: iPropsItemSubNavPanel)=>{
  const [currentVisible, setCurrentVisible] = useState(0)
  useEffect(()=>{
    setTimeout(() => {
      setCurrentVisible(delay)
    }, delay)
  },[delay])
  
  return(
    <div 
      className={`
        transition-all 
        duration-300 
        ${currentVisible>0?
          'translate-y-0 opacity-100':
          'translate-y-[20px] opacity-0'
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