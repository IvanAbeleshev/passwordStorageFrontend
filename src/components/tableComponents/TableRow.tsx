import React from 'react'

interface IPropsTableRow{
    data: string[],
    typeColumn: tableColumnType
}

export enum tableColumnType{
    head = 'head',
    data = 'data'
}

const TableRow=({data, typeColumn}: IPropsTableRow)=>{
    return(
        <tr>
        {typeColumn===tableColumnType.data?data.map(element=><td key={element}>{element}</td>):data.map(element=><th key={element}>{element}</th>)}
        </tr>
    )
}

export default TableRow