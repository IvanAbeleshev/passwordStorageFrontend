import { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { searchSelectorString } from '../store/sliceSearch'
import DefaultContainerData from '../components/DefaultContainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TableRowHead from '../components/tableComponents/TableRowHead'
import Paginator from '../components/Paginator'



const UsersList=()=>{
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)

  const[countState, setCountState] = useState(0)
  const[rowsState, setRowsState] = useState([])

  const {pageIndex} = useParams()
  const searchString = useSelector(searchSelectorString)

  const navigator = useNavigate()
    
    // useEffect(()=>{
    //     const resolveFunction=(response:AxiosResponse)=>{
    //         const {count, rows}: {count:string, rows: IDataRowsUser[]} = response.data.data
    //         setCountState(count)
    //         setRowsState(rows)     
    //     }

    //     axiosInstance.get(`/users?page=${pageIndex}&limit=${LIMIT_ITEMS_ON_PAGE}${searchString?`&searchString=${searchString}`:''}`).then(resolveFunction)

    // }, [pageIndex, searchString])

    // const addNewItem: React.MouseEventHandler=()=>{
    //     navigator('/userItem/new')
    // }

    // const navigateByPath=(path:number)=>{
    //     const handleOnClick:React.MouseEventHandler=()=>{
    //         navigator(`/userItem/${path}`)    
    //     }
    //     return handleOnClick
    // }
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
            data={['Username', 'Role']}
          />    
        </div>
        <div className='table-row-group'>
          
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