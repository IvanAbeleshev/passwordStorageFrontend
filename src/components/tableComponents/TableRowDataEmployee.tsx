import React from 'react'
import { BACKEND_URL } from '../../constans'
import { IDataEmployee } from '../../pages/EmployeeItem'
import generallyStyles from '../../styles/generallyStyles.module.css'

interface IPropsTableRow{
    data: IDataEmployee,
    onClick?: React.MouseEventHandler
}

const TableRowDataEmployee=({data, onClick}: IPropsTableRow)=>{
    //'Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date'
    return(
        <tr onClick={onClick}className={generallyStyles.tableRow}>
            <td className={generallyStyles.cell}>{data?.id}</td>
            <td className={generallyStyles.cell}>{data.name}</td>
            <td className={generallyStyles.cell}>{data.jobTitle}</td>
            <td className={generallyStyles.cell}>{String(data.employmentDate)}</td>
            <td className={generallyStyles.cell}>{String(data.dismissDate)}</td>
            <td className={generallyStyles.cell}><img className={generallyStyles.imgSmall} src={data.img?`${BACKEND_URL}/${data.img}`:'/img/NoImage.jpg'} alt="EmployeePhoto" /></td>
            <td className={generallyStyles.cell}>{data.jobTitle}</td>
            
        </tr>
    )
}

export default TableRowDataEmployee