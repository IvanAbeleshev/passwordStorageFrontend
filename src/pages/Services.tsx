import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import DefaultContainerData from '../components/DefaultContainerData'
import Paginator from '../components/Paginator'
import TableRowDataService from '../components/tableComponents/TableRowDataService'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { iService } from '../interfaces/modelInterfaces'
import ServicesOfServices from '../services/ServicesOfServices'
import { searchSelectorString } from '../store/sliceSearch'

const Services=()=>{
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [data, setData] = useState<iService[]>([])

  const searchString = useSelector(searchSelectorString)

  const navigator = useNavigate()
  
  useEffect(()=>{
    ServicesOfServices.getServiceList(currentPage, searchString).then(
      ({ pages, payload })=>{
        setData(payload.map(item=>item.getStructureData()))
        setCountPages(pages)
      }
    )
  }, [currentPage, searchString])

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
          {data.map(element=><TableRowDataService key={element.id} data={element} />)}
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

export default Services