import { MouseEventHandler, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { iService } from '../../interfaces/modelInterfaces'
import SecureImage from '../SecureImage'

interface iPropsTableRow{
  data: iService,
}

const TableRowDataService=({data}: iPropsTableRow)=>{
  const navigator = useNavigate()
  const refPreviewEmployeeImg = useRef<HTMLDivElement>(null)
  const previewImg={
    maskClassName:'rounded-full'
  }

  const clicRowTable:MouseEventHandler<HTMLDivElement>=(event)=>{
    if(refPreviewEmployeeImg.current&&!refPreviewEmployeeImg.current.contains(event.target as HTMLElement))
      navigator(`/service/${data.id}`)
  }


  return(
    <div
      onClick={clicRowTable}
      className='
        table-row 
        text-xl 
        hover:bg-main 
        hover:text-hover 
        hover:cursor-pointer 
        align-middle'
    >
      <div 
        className='table-cell rounded-l-full align-middle'
      >
        <div ref={refPreviewEmployeeImg} className='w-fit '>
          <SecureImage 
            preview={previewImg} 
            src={data.img} 
            width={40} 
            height={40} 
            loading='lazy' 
            alt='profile_photo'
            className='rounded-full pt-1'
          />
        </div>
      </div>
      <div className='table-cell'>
        {data.name}
      </div>
      <div className='table-cell rounded-r-full'>
        {
          data.description&&
            (data.description.length>50?data.description?.slice(0, 47)+'...':data.description)
        }
      </div>
    </div>
  )
}

export default TableRowDataService