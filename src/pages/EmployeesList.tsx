import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TableRowHead from '../components/tableComponents/TableRowHead'
import TableRowDataEmployee from '../components/tableComponents/TableRowDataEmployee'
import { searchSelectorString } from '../store/sliceSearch'
import { useAppSelector } from '../store/hooks/storeHooks'
import { iEmployee } from '../interfaces/modelInterfaces'
import DefaultContainerData from '../components/DefaultContainerData'
import ServiceEmployee from '../services/ServiceEmployee'
import Paginator from '../components/Paginator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { errorNotificator } from '../utils/notificator'

const EmployeesList=()=>{
  const [dataList, setDataList] = useState<iEmployee[]>([])
  const [countPages, setCountPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  
  const searchString = useAppSelector(searchSelectorString)
  const navigator = useNavigate()

  useEffect(()=>{
    
    ServiceEmployee.getEmployeeList(currentPage, searchString).then(
      ({dataList, pages})=>{
        setDataList(dataList.map(element=>element.getStructureData()))
        setCountPages(pages)
      }
    ).catch(error=>errorNotificator('List error', error.message))
    
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
          onClick={()=>navigator('/employeeItem/new')}  
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
              data={['Photo', 'Name', 'Job title', 'Employment date', 'Dismiss date', 'Comment']}
            />    
          </div>
          <div className='table-row-group'>
            {dataList.map(element=><TableRowDataEmployee data={element} key={element.id} />)}
          </div>
        </div>
      </DefaultContainerData>

      <Paginator countPages={countPages} currentPage={currentPage} onChange={setCurrentPage}/>
    </>
  )
}

export default EmployeesList