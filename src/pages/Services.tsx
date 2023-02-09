import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../common'
import DefaultContainerData from '../components/DefaultContainerData'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { LIMIT_ITEMS_ON_PAGE } from '../constans'
import { searchSelectorString } from '../store/sliceSearch'

export interface IDataRows{
  id:number
  img?: string,
  name: string,
  desctiption?: string,
  createdAt: Date,
  updatedAt: Date,
}
const Services=()=>{
  const[countState, setCountState]:[number, Function] = useState(0)
  const[rowsState, setRowsState]:[IDataRows[], Function] = useState([])

  const {servicesId} = useParams()

  const searchString = useSelector(searchSelectorString)

  const navigator = useNavigate()
  
  useEffect(()=>{

    axiosInstance.get(`/services?page=${servicesId}&limit=${LIMIT_ITEMS_ON_PAGE}${searchString?`&searchString=${searchString}`:''}`).then(
      response=>{
          const {count, rows}: {count:string, rows: IDataRows[]} = response.data.data
          setCountState(count)
          setRowsState(rows)                
    }).catch()
  }, [servicesId, searchString])

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
        onClick={()=>navigator('/service/new')}  
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
            data={['Image', 'Name', 'Description']}
          />    
        </div>
        <div className='table-row-group'>
        
        </div>
      </div>
    </DefaultContainerData>
  </>
  )
}

export default Services