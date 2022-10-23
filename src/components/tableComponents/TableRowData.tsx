import React from 'react'
import { IDataRows } from '../../pages/Services'
import styles from '../../styles/components/table.module.css'

interface IPropsTableRow{
    data: IDataRows,
    onClick: React.MouseEventHandler
}

const TableRowData=({data, onClick}: IPropsTableRow)=>{
    //'Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date'
    return(
        <tr onClick={onClick}className={`${styles.row} ${styles.data}`}>
            <td className={styles.cell}>{data.id}</td>
            <td className={styles.cell}><img className={styles.imgIcon} src={data.img?data.img:'/img/NoImage.jpg'} alt="servicesLogo" /></td>
            <td className={styles.cell}>{data.name}</td>
            <td className={styles.cell}>{data.desctiption}</td>
            <td className={styles.cell}>{String(data.createdAt)}</td>
            <td className={styles.cell}>{String(data.updatedAt)}</td>
        </tr>
    )
}

export default TableRowData