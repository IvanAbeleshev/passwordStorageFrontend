import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { searchSelectorString } from '../store/sliceSearch'
import DefaultContainerData from '../components/DefaultContainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TableRowHead from '../components/tableComponents/TableRowHead'
import Paginator from '../components/Paginator'
import ServiceUser from '../services/ServiceUser'
import { iUser } from '../interfaces/modelInterfaces'
import TableRowDataUsers from '../components/tableComponents/TableRowDataUsers'



const UsersList=()=>{
  const [dataList, setDataList] = useState<iUser[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)

  const searchString = useSelector(searchSelectorString)

  const navigator = useNavigate()
  
  useEffect(()=>{

    ServiceUser.getUserList(currentPage, searchString).then(
      ({payload, pages})=>{
        setCountPages(pages)
        setDataList(payload.map(element=>element.getStructureData()))
      })
  },[currentPage, searchString])

  return(
  <>
    <DefaultContainerData>
      <button 
        className='
          px-7 
          py-2 
          border-2 
          border-transparent 
          rounded-full
          bg-btn
          hover:bg-btn-hover
          text-hover'
        onClick={()=>navigator('/userItem/new')}  
      >
        <FontAwesomeIcon
            className=''
            icon={faPlus}
          />
      </button>
    </DefaultContainerData>
    
    <div className='h-10'/>

    <DefaultContainerData>
      <div className='table w-full'>
        <div className='table-header-group'>
          <TableRowHead 
            data={['Active', 'Username', 'Role']}
          />    
        </div>
        <div className='table-row-group'>
          {dataList.map(item=><TableRowDataUsers data={item} key={item.id} />)}
        </div>
      </div>
    </DefaultContainerData>

    <Paginator 
      countPages={countPages}
      currentPage={currentPage}
      onChange={setCurrentPage}
    />
  </>
  )
}

export default UsersList