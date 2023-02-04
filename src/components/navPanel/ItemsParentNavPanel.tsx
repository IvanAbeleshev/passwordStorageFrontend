import { ReactNode, useEffect, useState } from 'react'
import { iEmployee } from '../../interfaces/modelInterfaces'

interface iPropsItemsParentNavPanel{
  item: iEmployee,
  children: ReactNode|ReactNode[]
}

const ItemsParentNavPanel=({ item, children }:iPropsItemsParentNavPanel)=>{
  const [visible, setVisible] = useState<boolean>(false)
  
  useEffect(()=>{
    setVisible(true)
  },[])

  return(
    <div 
      className={`
        transition-all 
        duration-300 
        hover:cursor-default
        ${visible?
          'translate-x-0 opacity-100':
          '-translate-x-[100px] opacity-0'
        }`
      }
    >
      <div 
        className='
          flex 
          items-center 
          border-b-2
          text-lg' 
      >
        <img 
          className='w-[25px] h-[25px] rounded-full' 
          src={item.img} 
          alt='icon' 
        />
        <span>{item.name}</span>
      </div>
      {children}
    </div>
  )
}

export default ItemsParentNavPanel