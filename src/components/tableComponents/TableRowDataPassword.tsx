import { MouseEventHandler, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { iPassword } from '../../interfaces/modelInterfaces'
import SecureImage from '../SecureImage'

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
        hover:bg-main/80 
        hover:text-hover 
        hover:cursor-pointer 
        align-middle
        text-center'
    >
      <div 
        className='table-cell rounded-l-full align-middle max-sm:align-top'
      >
        <div 
          ref={refPreviewPasswordGroupImg} 
          className='w-fit flex items-center max-sm:flex-col'
        >
          <SecureImage
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
      <div className='table-cell align-middle max-sm:align-top px-1'>
        <div 
          ref={refPreviewEmployeeImg} 
          className='w-fit flex items-center max-sm:flex-col'
        >
          <SecureImage
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
      <div className='table-cell align-middle max-sm:align-top max-sm:rounded-r-full px-1'>
        <div 
          ref={refPreviewServiceImg} 
          className='w-fit flex items-center max-sm:flex-col'
        >
          <SecureImage
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
      <div className='table-cell max-sm:hidden align-middle max-sm:align-top px-1'>
        {data.login}
      </div>
      <div className='table-cell rounded-r-full max-sm:hidden align-middle max-sm:align-top'>
      {
        data.comment&&
          (data.comment.length>50?data.comment?.slice(0, 47)+'...':data.comment)
      }
      </div>
    </div>
  )
}

export default TableRowDataPassword