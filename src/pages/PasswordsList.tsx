import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TableRowHead from '../components/tableComponents/TableRowHead'
import TableRowDataPassword from '../components/tableComponents/TableRowDataPassword'
import DefaultContainerData from '../components/DefaultContainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import ServicePassword from '../services/ServicePassword'
import { iEmployee, iPassword, iPasswordGroup, iService } from '../interfaces/modelInterfaces'
import { errorNotificator } from '../utils/notificator'
import Paginator from '../components/Paginator'
import { Drawer } from 'antd'
import ServiceSelector from '../components/selectors/ServiceSelector'
import EmployeeSelector from '../components/selectors/EmployeeSelector'
import GroupSelector from '../components/selectors/GroupSelector'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { setPasswordFilterItem } from '../store/passwordFilterSlice'

const PasswordsList=()=>{
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [data, setData] = useState<iPassword[]>([])

  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const countActiveFilters = useAppSelector(state=>state.passwordFilter.countActiveFilter)
  const filters = useAppSelector(state=>state.passwordFilter.filters)

  const setFilterGroup=(passwordGroup?:iPasswordGroup)=>{
    dispatch(setPasswordFilterItem({passwordGroup}))
  }

  const setFilterEmployee=(employee?:iEmployee)=>{
    dispatch(setPasswordFilterItem({employee}))
  }

  const setFilterService=(service?:iService)=>{
    dispatch(setPasswordFilterItem({service}))
  }

  useEffect(()=>{
    ServicePassword.getPasswordList(currentPage, 
      filters.employee?.id,
      filters.service?.id,
      filters.passwordGroup?.id
      ).then(({ pages, payload })=>{
      setData(payload.map(item=>item.getStructureData()))
      setCountPages(pages)
    }
  ).catch(error=>errorNotificator('List error', error.message))
  }, [currentPage, filters])

  return (
  <>
    <Drawer 
      title='Filter panel' 
      placement='right' 
      onClose={()=>setIsFilterPanelOpen(false)} 
      open={isFilterPanelOpen}
    >
      <div className='flex flex-col gap-7'>
        <GroupSelector setSelectedGroup={setFilterGroup} selectedPasswordGroup={filters.passwordGroup} />
        <EmployeeSelector setSelectedEmployee={setFilterEmployee} selectedEmployee={filters.employee} />
        <ServiceSelector setSelectedService={setFilterService} selectedService={filters.service} />
      </div>
    </Drawer>
    <DefaultContainerData>
      <div className='flex justify-between'>
        <div>
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
                icon={faPlus}
              />
          </button>
        </div>
        <div className='relative group'>
          {
            countActiveFilters>0&&
            <div className='group-hover:animate-bounce absolute right-0 top-[-10px] bg-btn-err  text-hover text-center text-sm w-5 h-5 rounded-full'>
              {countActiveFilters}
            </div>
          }
          <button 
            onClick={()=>setIsFilterPanelOpen(true)}
            className='
              px-7 
              py-2 
              border-2 
              border-transparent 
              rounded-full
              bg-btn
              hover:bg-btn-hover
              text-hover'
          >
            <FontAwesomeIcon
                icon={faFilter}
              />
          </button>
        </div>
      </div>
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
          {data.map(element=><TableRowDataPassword key={element.id} data={element} />)}
        </div>
      </div>
    </DefaultContainerData>

    <Paginator 
      countPages={countPages}
      currentPage={currentPage}
      onChange={setCurrentPage}
    />
  </>)
}

export default PasswordsList