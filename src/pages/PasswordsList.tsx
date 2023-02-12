import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { searchMode } from '../interfaces'
import InputSelect from '../components/InputSelect'
import TableRowDataPassword from '../components/tableComponents/TableRowDataPassword'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { useSelector } from 'react-redux'
import { searchEmployeeParam, searchServiceParam } from '../store/sliceSearchParam'
import generallyStyles from '../styles/generallyStyles.module.css'
import axiosInstance, { defaultErrorHandler } from '../common'
import DefaultContainerData from '../components/DefaultContainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export interface IDataPassword{
    id?: number,
    employee: {
        name: string,
        img?: string
    },
    service:{
        name: string,
        img: string
    },
    comment?: string,
    createdAt: Date,
    updatedAt: Date,
}

const PasswordsList=()=>{
  const [rowsState, setRowState]:[IDataPassword[], Function] = useState([])

  const navigator = useNavigate()
  const employeeState = useSelector(searchEmployeeParam)
  const serviceState = useSelector(searchServiceParam)
  const {pageIndex} = useParams()

  // useEffect(()=>{

  //   axiosInstance.get(`${BACKEND_URL}/passwords?page=${pageIndex}
  //               &limit=${LIMIT_ITEMS_ON_PAGE}
  //               ${employeeState.selectedId?`&employeeId=${employeeState.selectedId}`:''}
  //               ${serviceState.selectedId?`&serviceId=${serviceState.selectedId}`:''}`).then(replyRequest =>{
  //           setRowState(replyRequest.data.data.rows)
  //           setCountState(replyRequest.data.data.count)
  //   }).catch(defaultErrorHandler)
  // },[employeeState.selectedId, serviceState.selectedId, pageIndex])

  return (
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
          onClick={()=>navigator('/passwordItem/new')}  
        >
          <FontAwesomeIcon
              className=''
              icon={faPlus}
            />
        </button>
    </DefaultContainerData>
      
    <div className='h-10' />

    <DefaultContainerData>
      <div className='table w-full'>
        <div className='table-header-group'>
          <TableRowHead 
            data={['Password group', 'Employee', 'Service', 'Login', 'Comment']}
          />    
        </div>
        <div className='table-row-group'>
          
        </div>
      </div>
    </DefaultContainerData>
  </>)
}

export default PasswordsList