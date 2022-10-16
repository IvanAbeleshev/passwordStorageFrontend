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
        <>
        {typeColumn===tableColumnType.data?data.map(element=><td>{element}</td>):data.map(element=><th>{element}</th>)}
        </>
    )
}

export default TableRow