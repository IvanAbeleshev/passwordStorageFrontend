import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Drawer } from 'antd'
import { useEffect, useState } from 'react'
import DefaultContainerData from '../components/DefaultContainerData'
import LogItemViewer from '../components/LogItemViewer'
import Paginator from '../components/Paginator'
import TableRowDataLog from '../components/tableComponents/TableRowDataLog'
import TableRowHead from '../components/tableComponents/TableRowHead'
import ModelLog from '../models/ModelLog'
import ServiceChangeLog from '../services/ServiceChangeLog'

const ChangeLogList=()=>{
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [idRow, setIdRow] = useState(0)
  const [isVisibleDetails, setIsVisibleDetails] = useState(false)

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [countActiveFilters, setCountActiveFilters] = useState(0)

  const [dataList, setDataList] = useState<ModelLog[]>([])


  useEffect(()=>{
    if(idRow){
      setIsVisibleDetails(true)
    }
  },[idRow, setIsVisibleDetails])

  useEffect(()=>{
    if(!isVisibleDetails){
      setIdRow(0)
    }
  },[isVisibleDetails])

  useEffect(()=>{
    ServiceChangeLog.getAll(currentPage).then(
      ({pages, payload})=>{
        setCountPages(pages)
        setDataList(payload)
      }
    )
  }, [currentPage])

  return(
    <>
      <Drawer 
        title='Filter panel' 
        placement='right' 
        onClose={()=>setIsFilterPanelOpen(false)} 
        open={isFilterPanelOpen}
      >
        <div className='flex flex-col gap-7'>
        </div>
      </Drawer>
      <DefaultContainerData>
        <div className='flex flex-row-reverse relative group'>
          
          {
            countActiveFilters>0&&
            <div 
              className='
                group-hover:animate-bounce 
                absolute 
                right-0 
                top-[-10px] 
                bg-btn-err 
                text-hover 
                text-center 
                text-sm 
                w-5 
                h-5 
                rounded-full'
            >
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
      </DefaultContainerData>

      <div className='h-10' />

      <DefaultContainerData>
        <div className='table w-full'>
          <div className='table-header-group'>
            <TableRowHead 
              data={['Date', 'Action type', 'User', 'Meta data']}
            />    
          </div>
          <div className='table-row-group'>
            {dataList.map(element=>
              <TableRowDataLog 
                data={element} 
                selectRow={setIdRow}
                key={element.id} 
              />
            )}
          </div>
        </div>
      </DefaultContainerData>

      <Paginator 
        countPages={countPages} 
        currentPage={currentPage} 
        onChange={setCurrentPage}
      />

      {isVisibleDetails&&
        <LogItemViewer 
          setVisible={setIsVisibleDetails} 
          selectedIdLog={idRow} 
        />
      }
    </>
  )
}

export default ChangeLogList