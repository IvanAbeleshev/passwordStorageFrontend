import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TableRowHead from '../components/tableComponents/TableRowHead'
import TableRowDataPassword from '../components/tableComponents/TableRowDataPassword'
import DefaultContainerData from '../components/DefaultContainerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import ServicePassword from '../services/ServicePassword'
import { iPassword } from '../interfaces/modelInterfaces'
import { errorNotificator } from '../utils/notificator'
import Paginator from '../components/Paginator'
import { Drawer } from 'antd'

const PasswordsList=()=>{
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [data, setData] = useState<iPassword[]>([])

  const navigator = useNavigate()
  useEffect(()=>{
    ServicePassword.getPasswordList(currentPage).then(({ pages, payload })=>{
      setData(payload.map(item=>item.getStructureData()))
      setCountPages(pages)
    }
  ).catch(error=>errorNotificator('List error', error.message))
  }, [currentPage])

  return (
  <>
    <Drawer 
      title='Filter panel' 
      placement='right' 
      onClose={()=>setIsFilterPanelOpen(false)} 
      open={isFilterPanelOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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
        <div>
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