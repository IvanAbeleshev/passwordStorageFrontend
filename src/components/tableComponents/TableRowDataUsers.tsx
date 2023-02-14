interface IPropsTableRow{
  data: any
}

const TableRowDataUsers=({data}: IPropsTableRow)=>{
  return(
    <div
      className='
        table-row 
        text-xl 
        hover:bg-main 
        hover:text-hover 
        hover:cursor-pointer 
        align-middle'
    >
      <div className='table-cell'>
        {data.name}
      </div>
      <div className='table-cell'>
        {
          data.description&&
            (data.description.length>50?data.description?.slice(0, 47)+'...':data.description)
        }
      </div>
    </div>
  )
}

export default TableRowDataUsers