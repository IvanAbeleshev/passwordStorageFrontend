import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ServiceChangeLog from '../services/ServiceChangeLog'
import ModelLog from '../models/ModelLog'
import { errorNotificator } from '../utils/notificator'
import CustomPlaceholderInput from './CustomPlaceholderInput'
import { formatDateToDefaultDateFormat } from '../utils/dateFunction'
import TableRowHead from './tableComponents/TableRowHead'

interface iPropsLogItemViewer{
  setVisible: Function
  selectedIdLog: number
}

const LogItemViewer=({ setVisible, selectedIdLog }:iPropsLogItemViewer)=>{
  const [data, setData] = useState<ModelLog>()

  useEffect(()=>{
    ServiceChangeLog.getItem(selectedIdLog).then(
      ({payload})=>{
        setData(payload)
      }
    ).catch(error=>errorNotificator('Read error', error.message))
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
        <div className='flex flex-col gap-7'>

          <div className='flex gap-7'>
            <CustomPlaceholderInput
              placeholder='Time'
              value={formatDateToDefaultDateFormat(data?.createdAt)}
            >
              <input 
                className='shadow-md border w-full rounded-full px-2'
                type='text'
                readOnly
                value={formatDateToDefaultDateFormat(data?.createdAt)}
              />  
            </CustomPlaceholderInput> 

            <CustomPlaceholderInput
              placeholder='User'
              value={data?.actionUserId}
            >
              <input 
                className='shadow-md border w-full rounded-full px-2'
                type='text'
                readOnly
                value={data?.actionUserId}
              />  
            </CustomPlaceholderInput> 
          </div>
          <div className='flex gap-7'>
            <CustomPlaceholderInput
              placeholder='Action'
              value={data?.actionType}
            >
              <input 
                className='shadow-md border w-full rounded-full px-2'
                type='text'
                readOnly
                value={data?.actionType}
              />  
            </CustomPlaceholderInput>

            <CustomPlaceholderInput
              placeholder='Meta data'
              value={data?.metaData}
            >
              <input 
                className='shadow-md border w-full rounded-full px-2'
                type='text'
                readOnly
                value={data?.metaData}
              />  
            </CustomPlaceholderInput> 
          </div>
          
          {
          data?.details&&
          <div className='py-3 border-t-2 border-main w-full'>
            {
              Array.isArray(data.detailsData)?
              <div className='table w-full'>
                <div className='table-header-group'>
                  <TableRowHead 
                    data={['Field', 'Previous value', 'Current value']}
                  />    
                </div>
                <div className='table-row-group'>
                  {data.detailsData.map(element=>
                    <div
                      className='table-row align-middle max-w-[80%] leading-8'
                    > 
                      <div className='table-cell px-1 border-r-2 border-main'>
                        {element.field}
                      </div>
                      <div className='table-cell px-1 border-r-2 border-main max-w-[400px] truncate'>
                        {element.previousValue}
                      </div>
                      <div className='table-cell max-w-[400px] truncate'>
                        {element.currentValue}
                      </div>
                    </div>
                  )}
                </div>
              </div>:
              <div className='table w-full'>
                <div className='table-header-group'>
                  <TableRowHead 
                    data={['Method', 'Message']}
                  />    
                </div>
                <div className='table-row-group'>
                  <div
                    className='table-row align-middle max-w-[80%] leading-8'
                  > 
                    <div className='table-cell px-1 border-r-2 border-main'>
                      {data.detailsData?.method}
                    </div>
                    <div className='table-cell px-1 max-w-[400px]'>
                      {data.detailsData?.error}
                    </div>
                  </div>
                </div>
              </div>
            }  
          </div>
          }
        </div>
      </div>
    </div>
  ) 
}

export default LogItemViewer