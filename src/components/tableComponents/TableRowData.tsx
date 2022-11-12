import React from 'react'
import { IDataRows } from '../../pages/Services'
import styles from '../../styles/components/table.module.css'
import generallyStyles from '../../styles/generallyStyles.module.css'

interface IPropsTableRow{
    data: IDataRows,
    onClick: React.MouseEventHandler
}

const TableRowData=({data, onClick}: IPropsTableRow)=>{
    //'Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date'
    return(
        <tr onClick={onClick}className={generallyStyles.tableRow}>
            <td className={generallyStyles.cell}>{data.id}</td>
            <td className={generallyStyles.cell}><img className={generallyStyles.imgSmall} src={data.img?data.img:'/img/NoImage.jpg'} alt="servicesLogo" /></td>
            <td className={generallyStyles.cell}>{data.name}</td>
            <td className={generallyStyles.cell}>{data.desctiption}</td>
            <td className={generallyStyles.cell}>{String(data.createdAt)}</td>
            <td className={generallyStyles.cell}>{String(data.updatedAt)}</td>
        </tr>
    )
}

export default TableRowData