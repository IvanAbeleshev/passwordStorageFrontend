import { ReactNode } from 'react'
import { iEmployee } from '../../interfaces/modelInterfaces'
import SecureImage from '../SecureImage'

interface iPropsItemsParentNavPanel{
  item: iEmployee,
  children: ReactNode|ReactNode[]
}

const ItemsParentNavPanel=({ item, children }:iPropsItemsParentNavPanel)=>{

  return(
    <div 
      className='hover:cursor-default'
    >
      <div 
        className='
          flex 
          items-center 
          border-b-2
          text-lg' 
      >
        <SecureImage
          width={25} 
          height={25}
          preview={false}
          className='w-[25px] h-[25px] rounded-full' 
          src={item.img} 
          alt='icon' 
        />
        <span>{item.name}</span>
      </div>
      <div className='p-2 flex flex-col gap-y-1'>
        {children}
      </div>
    </div>
  )
}

export default ItemsParentNavPanel