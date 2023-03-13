import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { iUser } from '../../interfaces/modelInterfaces'

interface IPropsTableRow{
  data: iUser
}

const TableRowDataUsers=({data}: IPropsTableRow)=>{
  const navigator = useNavigate()
  return(
    <div
      onClick={()=>navigator(`/userItem/${data.id}`)}
      className='
        table-row 
        text-xl 
        hover:bg-main/80 
        hover:text-hover 
        hover:cursor-pointer 
        align-middle'
    >
      <div className='table-cell pl-2 rounded-l-full'>
        {data.active?
          <FontAwesomeIcon
            className='text-green-400'
            icon={faCheck}
          />:
          <FontAwesomeIcon
            className='text-btn-err-hover'
            icon={faCircleXmark}
          />
        }
      </div>
      <div className='table-cell'>
        {data.login}
      </div>
      <div className='table-cell pr-2 rounded-r-full'>
        {data.role}
      </div>
    </div>
  )
}

export default TableRowDataUsers