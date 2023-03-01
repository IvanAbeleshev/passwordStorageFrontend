import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker, DatePickerProps, Drawer } from 'antd'
import { ChangeEventHandler, useEffect, useState } from 'react'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import LogItemViewer from '../components/LogItemViewer'
import Paginator from '../components/Paginator'
import TableRowDataLog from '../components/tableComponents/TableRowDataLog'
import TableRowHead from '../components/tableComponents/TableRowHead'
import ModelLog from '../models/ModelLog'
import ServiceChangeLog from '../services/ServiceChangeLog'
import { errorNotificator } from '../utils/notificator'
import dayjs from 'dayjs'
import { iFilterList } from '../interfaces'

const ChangeLogList=()=>{
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [idRow, setIdRow] = useState(0)
  const [isVisibleDetails, setIsVisibleDetails] = useState(false)
  const [actionsOption, setActionsOption] = useState<string[]>([])
  const [metadataOption, setMetadataOption] = useState<string[]>([])

  const [filterList, setFilterList] = useState({} as iFilterList)

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [countActiveFilters, setCountActiveFilters] = useState(0)

  const [dataList, setDataList] = useState<ModelLog[]>([])

  useEffect(()=>{
    ServiceChangeLog.getActions().then(({payload})=>{
      setActionsOption(payload)
    }).catch(error=>errorNotificator('Error read filter list', error.message))
    ServiceChangeLog.getMetadata().then(({payload})=>{
      setMetadataOption(payload)
    }).catch(error=>errorNotificator('Error read filter list', error.message))
  },[])

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
    ServiceChangeLog.getAll(currentPage, filterList).then(
      ({pages, payload})=>{
        setCountPages(pages)
        setDataList(payload)
      }
    ).catch(error=>errorNotificator('Read list', error.message))
  }, [currentPage, filterList])

  const onChangeDate = (name:string, 
    value: DatePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setFilterList({ ...filterList, [name]:dateString })
  }

  const changeActionSelector:ChangeEventHandler<HTMLSelectElement>=(event)=>{
    setFilterList({...filterList, [event.target.name]: event.target.value})
  }

  return(
    <>
      <Drawer 
        title='Filter panel' 
        placement='right' 
        onClose={()=>setIsFilterPanelOpen(false)} 
        open={isFilterPanelOpen}
      >
        <div className='flex flex-col gap-7'>
          <CustomPlaceholderInput
            placeholder='Start date'
            value={filterList.startDate?dayjs(filterList.startDate):null}
          >
            <DatePicker 
              value={filterList.startDate?dayjs(filterList.startDate):null}
              onChange={
                (value, dateString)=>
                  onChangeDate('startDate', value, dateString)
              }
              placeholder=''
              showTime 
              className='shadow-md border w-full rounded-full px-2' 
            />
          </CustomPlaceholderInput>

          <CustomPlaceholderInput
            placeholder='End date'
            value={filterList.endDate?dayjs(filterList.endDate):null}
          >
            <DatePicker 
              value={filterList.endDate?dayjs(filterList.endDate):null}
              onChange={
                (value, dateString)=>
                  onChangeDate('endDate', value, dateString)
              }
              placeholder=''
              showTime 
              className='shadow-md border w-full rounded-full px-2' 
            />
          </CustomPlaceholderInput>

          <select 
            name='actionFilterValue'
            className='shadow-md border w-full rounded-full px-2 bg-hover text-lg' 
            value={filterList.actionFilterValue}
            onChange={changeActionSelector}
          >
            <option>
              choose action filter
            </option>
            {actionsOption.map(element=>
            <option 
              value={element}
              key={element}
            >
              {element}
            </option>)
            }
          </select>

          <select 
            name='metadataTypes'
            className='shadow-md border w-full rounded-full px-2 bg-hover text-lg' 
            value={filterList.metadataTypes}
            onChange={changeActionSelector}
          >
            <option>
              choose metadata filter
            </option>
            {metadataOption.map(element=>
            <option 
              value={element}
              key={element}
            >
              {element}
            </option>)
            }
          </select>
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