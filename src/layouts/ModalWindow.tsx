import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { hideModalWindow } from '../store/modalWindowSlice'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
interface iPropsModalWindow{
  children: React.ReactNode,
}
const ModalWindow = ({children}: iPropsModalWindow) =>{

  const dispatch = useDispatch()

  const handleOcClickBackground: React.MouseEventHandler = (event) =>{
    dispatch(hideModalWindow())
  }

  const handleDataContainerOnClick: React.MouseEventHandler = (event) =>{
    event.stopPropagation()    
  }

  return(
    <div 
      className='
        fixed 
        z-10 
        top-0 
        left-0 
        h-full 
        overflow-full 
        w-screen flex 
        justify-center 
        items-center 
        backdrop-blur 
        bg-black/50' 
      onMouseDown={handleOcClickBackground}
    >
      <div 
        className='
          relative
          flex 
          flex-col 
          justify-center 
          items-center 
          rounded-lg 
          bg-white 
          min-w-[50%] 
          min-h-[40%]' 
          onMouseDown={handleDataContainerOnClick}
      >
        <button 
          onClick={handleOcClickBackground}
          className='
            group 
            transition-all 
            flex 
            justify-center 
            items-center 
            absolute 
            right-3 
            top-3 
            border-2 
            p-1 
            w-7 
            h-7 
            rounded-md 
            border-black 
            hover:rounded-full 
            hover:bg-btn-err-hover'
        >
          <FontAwesomeIcon 
            className='transition-all group-hover:rotate-180' 
            icon={faXmark} 
          /> 
        </button>
        {children}
      </div>
    </div>
  ) 
}

export default ModalWindow