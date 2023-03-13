import { ReactNode, useEffect, useState } from 'react'

interface iPropsCustomPlaceholderInput{
  children: ReactNode,
  placeholder: string,
  value?:any,
  bias?:number
}

const CustomPlaceholderInput=({ value, children, placeholder, bias=0 }:iPropsCustomPlaceholderInput)=>{
  const [focusGroup, setFocusGroup] = useState<boolean>(false)
  const [fillInput, setFillInput] = useState<boolean>(false)

  useEffect(()=>value?setFillInput(true):setFillInput(false),[value])

  return (
  <div className='relative w-full' onFocus={()=>setFocusGroup(true)} onBlur={()=>setFocusGroup(false)}>
    {children}
    <span 
      className={`
        ${(focusGroup||fillInput)?
          `-translate-y-[18px] 
          translate-x-[6px]
          text-sm 
          px-2 
          bg-white 
          opacity-100
          rounded-t-lg
        `:
        'opacity-40'
        }
        absolute 
        pointer-events-none
        left-2
        ${bias===0&&'top-0'}
        ${bias===1&&'top-[5px]'}
        ${bias===2&&'top-[10px]'}
        ${bias===3&&'top-[15px]'}
        ${bias===4&&'top-[20px]'}
        ${bias>=5&&'top-[25px]'}
        transition-all`}
    >
      {placeholder}
    </span>
    
  </div>
  )
}

export default CustomPlaceholderInput