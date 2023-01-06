import React from 'react'
import { useDispatch } from 'react-redux'
import { hideModalWindow } from '../store/modalWindowSlice'

interface IPropsModalWindow{
  children: React.ReactNode,
}
const ModalWindow = ({children}: IPropsModalWindow) =>{

  const dispatch = useDispatch()

  const handleOcClickBackground: React.MouseEventHandler = (event) =>{
    dispatch(hideModalWindow())
  }

  const handleDataContainerOnClick: React.MouseEventHandler = (event) =>{
    event.stopPropagation()    
  }

  return(
    <div className='fixed z-10 top-0 left-0 h-full overflow-full w-screen flex justify-center items-center backdrop-blur bg-black/50' onClick={handleOcClickBackground}>
      <div className='flex flex-col justify-center items-center rounded-lg bg-white min-w-[50%] min-h-[40%]' onClick={handleDataContainerOnClick}>
        {children}
      </div>
    </div>
  ) 
}

export default ModalWindow