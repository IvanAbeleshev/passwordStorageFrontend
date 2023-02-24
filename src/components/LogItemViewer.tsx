import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ServiceChangeLog from '../services/ServiceChangeLog'

interface iPropsLogItemViewer{
  setVisible: Function
  selectedIdLog: number
}

const LogItemViewer=({ setVisible, selectedIdLog }:iPropsLogItemViewer)=>{


  useEffect(()=>{
    ServiceChangeLog.getItem(selectedIdLog).then(
      ({payload})=>{
        console.log(payload)      
      }
    )
  },[selectedIdLog])
  const handleOcClickBackground: React.MouseEventHandler = (event) =>{
    setVisible(false)
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
        {/* content will be here */}
      </div>
    </div>
  ) 
}

export default LogItemViewer