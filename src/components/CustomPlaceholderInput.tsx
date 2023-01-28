import { ReactNode, useEffect, useState } from 'react'

interface iPropsCustomPlaceholderInput{
  children: ReactNode,
  placeholder: string,
  value?:any
}

const CustomPlaceholderInput=({ value, children, placeholder }:iPropsCustomPlaceholderInput)=>{
  const [focusGroup, setFocusGroup] = useState<boolean>(false)
  const [fillInput, setFillInput] = useState<boolean>(false)

  useEffect(()=>value?setFillInput(true):setFillInput(false),[value])

  return (
  <div className='relative w-full' onFocus={()=>setFocusGroup(true)} onBlur={()=>setFocusGroup(false)}>
    {children}
    <span 
      className={`
        ${(focusGroup||fillInput)&&
          `-translate-y-[18px] 
          translate-x-[6px]
          text-sm 
          px-2 
          bg-white 
          opacity-100
        `}
        absolute 
        pointer-events-none
        left-1
        top-0
        opacity-40
        transition-all`}
    >
      {placeholder}
    </span>
    
  </div>
  )
}

export default CustomPlaceholderInput