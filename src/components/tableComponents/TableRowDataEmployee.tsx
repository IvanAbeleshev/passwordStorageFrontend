import { MouseEventHandler, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { iEmployee } from '../../interfaces/modelInterfaces'
import { formatDateToStandartDateFormat } from '../../utils/dateFunction'
import SecureImage from '../SecureImage'

interface iPropsTableRow{
  data: iEmployee,
}

const TableRowDataEmployee=({ data }: iPropsTableRow)=>{
  //'Photo', 'Name', 'Job title', 'Employment date', 'Dismiss date', 'Comment'
  const navigator = useNavigate()
  const refPreviewEmployeeImg = useRef<HTMLDivElement>(null)
  const previewImg={
    maskClassName:'rounded-full'
  }

  const clicRowTable:MouseEventHandler<HTMLDivElement>=(event)=>{
    if(refPreviewEmployeeImg.current&&!refPreviewEmployeeImg.current.contains(event.target as HTMLElement))
      navigator(`/employeeItem/${data.id}`)
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
        '
    >
      <div 
        ref={refPreviewEmployeeImg} 
        className='table-cell rounded-l-full align-middle'
      >
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
      <div className='table-cell align-middle'>
        {data.name}
      </div>
      <div className='table-cell max-sm:rounded-r-full align-middle'>
        {data.jobTitle}
      </div>
      <div className='table-cell max-sm:hidden align-middle'>
        {data.employmentDate&&formatDateToStandartDateFormat(data.employmentDate)}
      </div>
      <div className='table-cell max-sm:hidden max-lg:rounded-r-full align-middle'>
        {data.dismissDate&&formatDateToStandartDateFormat(data.dismissDate)}
      </div>
      <div className='table-cell rounded-r-full max-lg:hidden align-middle'>
        {
          data.comment&&
            (data.comment.length>50?data.comment?.slice(0, 47)+'...':data.comment)
        }
      </div>
    </div>
  )
}

export default TableRowDataEmployee