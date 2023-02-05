import { ReactNode } from 'react'

interface iPropsBackground{
  children: ReactNode
}
const Background=({ children }:iPropsBackground)=>{

  return(
    <div 
      className='
        w-screen 
        h-screen 
        bg-main-background 
        bg-400% 
        animate-movebg'
    >
      {children}
    </div>
  )
}

export default Background