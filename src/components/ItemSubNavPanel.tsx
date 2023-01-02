import { useEffect, useState } from 'react'

interface iPropsItemSubNavPanel{
  delay: number,
}
const ItemSubNavPanel=({delay}: iPropsItemSubNavPanel)=>{
  const [currentVisible, setCurrentVisible] = useState(0)
  useEffect(()=>{
    setTimeout(() => {
      setCurrentVisible(delay)
    }, delay);
  },[delay])
  return(
    <div className={`transition-all duration-300 ${currentVisible>0?'translate-y-0 opacity-100':'translate-y-[20px] opacity-0'}`}>
      <div className='flex items-center hover:bg-white rounded-full hover:cursor-pointer'>
        <img className='w-[25px] h-[25px] rounded-full' src='img/NoImage.jpg' alt='icon' />
        <span>title</span>
      </div>
    </div>
  )
}

export default ItemSubNavPanel