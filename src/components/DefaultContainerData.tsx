import { ReactNode } from 'react'

interface iDefaultContainerData{
  children:ReactNode
}

const DefaultContainerData=({ children }:iDefaultContainerData)=>{
  return(
    <div className='w-full px-12'>
      <div className='w-full shadow-xl shadow-main rounded-xl bg-hover p-5'>
        {children}
      </div>
    </div>
  )
}

export default DefaultContainerData