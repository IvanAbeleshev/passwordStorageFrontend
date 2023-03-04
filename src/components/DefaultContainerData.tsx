import { ReactNode } from 'react'

interface iDefaultContainerData{
  children:ReactNode
}

const DefaultContainerData=({ children }:iDefaultContainerData)=>{
  return(
    <div className='w-full px-12 max-sm:px-1 max-lg:px-6'>
      <div className='
        w-full 
        shadow-xl 
        shadow-main/60 
        rounded-xl 
        bg-hover/75 
        dark:bg-dcontainer/80
        p-5'>
        {children}
      </div>
    </div>
  )
}

export default DefaultContainerData