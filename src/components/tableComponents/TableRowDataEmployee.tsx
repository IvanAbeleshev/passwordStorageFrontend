import React from 'react'
import { BACKEND_URL } from '../../constans'
import { IDataEmployee } from '../../pages/EmployeeItem'
import styles from '../../styles/components/table.module.css'

interface IPropsTableRow{
    data: IDataEmployee,
    onClick?: React.MouseEventHandler
}

const TableRowDataEmployee=({data, onClick}: IPropsTableRow)=>{
    //'Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date'
    console.log(`${BACKEND_URL}/${data.img}`)
    return(
        <tr onClick={onClick}className={`${styles.row} ${styles.data}`}>
            <td className={styles.cell}>{data?.id}</td>
            <td className={styles.cell}>{data.name}</td>
            <td className={styles.cell}>{data.jobTitle}</td>
            <td className={styles.cell}>{String(data.employmentDate)}</td>
            <td className={styles.cell}>{String(data.dismissDate)}</td>
            <td className={styles.cell}><img className={styles.imgIcon} src={data.img?`${BACKEND_URL}/${data.img}`:'/img/NoImage.jpg'} alt="servicesLogo" /></td>
            <td className={styles.cell}>{data.jobTitle}</td>
            
        </tr>
    )
}

export default TableRowDataEmployee