import React from 'react'
import { IDataRowsUser } from '../../pages/UsersList'
import generallyStyles from '../../styles/generallyStyles.module.css'

interface IPropsTableRow{
    data: IDataRowsUser,
    onClick: React.MouseEventHandler
}

const TableRowDataUsers=({data, onClick}: IPropsTableRow)=>{
    return(
        <tr onClick={onClick}className={generallyStyles.tableRow}>
            <td className={generallyStyles.cell}>{data.id}</td>
            <td className={generallyStyles.cell}>{data.login}</td>
            <td className={generallyStyles.cell}>{String(data.createdAt)}</td>
            <td className={generallyStyles.cell}>{String(data.updatedAt)}</td>
        </tr>
    )
}

export default TableRowDataUsers