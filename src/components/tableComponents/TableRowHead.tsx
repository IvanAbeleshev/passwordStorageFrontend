import React from 'react'
import styles from '../../styles/components/table.module.css'

interface IPropsTableRow{
    data: string[],
}

const TableRowHead=({data, }: IPropsTableRow)=>{

    return(
        <tr className={`${styles.row} ${styles.head}`}>
        {data.map(element=><th key={element}>{element}</th>)}
        </tr>
    )
}

export default TableRowHead