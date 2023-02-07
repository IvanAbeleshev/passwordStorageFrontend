import { Image } from 'antd'
import { iEmployee } from '../../interfaces/modelInterfaces'
import { formatDateToStandartDateFormat } from '../../utils/dateFunction'

interface iPropsTableRow{
  data: iEmployee,
}

const TableRowDataEmployee=({data}: iPropsTableRow)=>{
  //'Photo', 'Name', 'Job title', 'Employment date', 'Dismiss date', 'Comment'
  return(
    <div className='table-row text-xl'>
      <div className='table-cell'>
        <Image src={data.img} width={40} height={40} loading='lazy' alt='profile_photo'/>
      </div>
      <div className='table-cell'>
        {data.name}
      </div>
      <div className='table-cell'>
        {data.jobTitle}
      </div>
      <div className='table-cell'>
        {data.employmentDate&&formatDateToStandartDateFormat(data.employmentDate)}
      </div>
      <div className='table-cell'>
        {data.dismissDate&&formatDateToStandartDateFormat(data.dismissDate)}
      </div>
      <div className='table-cell'>
        {data.comment}
      </div>
    </div>
  )
}

export default TableRowDataEmployee