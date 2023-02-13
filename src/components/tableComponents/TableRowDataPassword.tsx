import { Image } from 'antd'
import { MouseEventHandler, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { iPassword } from '../../interfaces/modelInterfaces'

interface iPropsTableRow{
  data: iPassword,
}

const TableRowDataPassword=({ data }:iPropsTableRow)=>{
  //['Password group', 'Employee', 'Service', 'Login', 'Comment']
  const navigator = useNavigate()
  const refPreviewEmployeeImg = useRef<HTMLDivElement>(null)
  const refPreviewServiceImg = useRef<HTMLDivElement>(null)
  const refPreviewPasswordGroupImg = useRef<HTMLDivElement>(null)
  const previewImg={
    maskClassName:'rounded-full'
  }

  const clicRowTable:MouseEventHandler<HTMLDivElement>=(event)=>{
    if(refPreviewEmployeeImg.current&&!refPreviewEmployeeImg.current.contains(event.target as HTMLElement)&&
    refPreviewServiceImg.current&&!refPreviewServiceImg.current.contains(event.target as HTMLElement)&&
    refPreviewPasswordGroupImg.current&&!refPreviewPasswordGroupImg.current.contains(event.target as HTMLElement))
      navigator(`/passwordItem/${data.id}`)
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
        <div ref={refPreviewPasswordGroupImg} className='w-fit '>
          <Image
            preview={previewImg} 
            src={data.passwordGroup?.icon} 
            width={40} 
            height={40} 
            loading='lazy' 
            alt='profile_photo'
            className='rounded-full pt-1'
          />
          <span>{data.passwordGroup?.name}</span>
        </div>
      </div>
      <div className='table-cell'>
        <div ref={refPreviewEmployeeImg} className='w-fit '>
          <Image
            preview={previewImg} 
            src={data.employee?.img} 
            width={40} 
            height={40} 
            loading='lazy' 
            alt='profile_photo'
            className='rounded-full pt-1'
          />
          <span>{data.employee?.name}</span>
        </div>
      </div>
      <div className='table-cell'>
        <div ref={refPreviewServiceImg} className='w-fit '>
          <Image
            preview={previewImg} 
            src={data.service?.img} 
            width={40} 
            height={40} 
            loading='lazy' 
            alt='profile_photo'
            className='rounded-full pt-1'
          />
          <span>{data.service?.name}</span>
        </div>
      </div>
      <div className='table-cell'>
        {data.login}
      </div>
      <div className='table-cell rounded-r-full'>
      {
          data.comment&&
            (data.comment.length>50?data.comment?.slice(0, 47)+'...':data.comment)
        }
      </div>
    </div>
  )
}

export default TableRowDataPassword