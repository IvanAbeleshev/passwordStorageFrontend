import ModelLog from '../../models/ModelLog'
import { formatDateToDefaultDateFormat } from '../../utils/dateFunction'

interface IPropsTableRow{
  data: ModelLog,
  selectRow: Function
}

const TableRowDataLog=({ data, selectRow }: IPropsTableRow)=>{

  return(
    <div
      onClick={()=>{
        selectRow(data.id)
      }}
      className='
        table-row 
        text-xl 
        hover:bg-main 
        hover:text-hover 
        hover:cursor-pointer 
        align-middle'
    >
      <div className='table-cell pl-2 rounded-l-full'>
        {formatDateToDefaultDateFormat(data.createdAt)}
      </div>
      <div className='table-cell'>
        {data.actionType}
      </div>
      <div className='table-cell'>
        {data.actionUser?.login}
      </div>
      <div className='table-cell pr-2 rounded-r-full'>
        {data.metaData}
      </div>
    </div>
  )
}

export default TableRowDataLog