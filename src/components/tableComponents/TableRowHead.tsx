interface IPropsTableRow{
    data: string[],
}

const TableRowHead=({ data,}: IPropsTableRow)=>{

  return(
  <div className='table-row text-xl '>
    {
    data.map((element, index)=>
      <div key={index} className='table-cell text-left border-b-2 border-main'>{element}</div>
    )}
  </div>
  )
}

export default TableRowHead