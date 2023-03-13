interface IPropsTableRow{
  data: string[],
  excludeLg?: string[],
  excludeMd?: string[],
  excludeSm?: string[],
}

const TableRowHead=({ data, excludeLg, excludeMd, excludeSm}: IPropsTableRow)=>{

  return(
  <div className='table-row text-xl'>
    {
    data.map((element, index)=>
      <div 
        key={index} 
        className={`
          pb-2 
          table-cell 
          text-left 
          border-b-2 
          border-main 
          dark:border-hover
          ${excludeLg&&excludeLg.includes(element)&&'max-lg:hidden'}
          ${excludeMd&&excludeMd.includes(element)&&'max-md:hidden'}
          ${excludeSm&&excludeSm.includes(element)&&'max-sm:hidden'}
        `}
      >
        {element}
      </div>
    )}
  </div>
  )
}

export default TableRowHead