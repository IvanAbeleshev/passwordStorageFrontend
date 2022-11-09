import { IDataPassword } from '../../pages/PasswordsList'
import styles from '../../styles/components/table.module.css'

interface IPropsTableRow{
    data: IDataPassword,
    onClick?: React.MouseEventHandler    
}

const TableRowDataPassword=({data, onClick}:IPropsTableRow)=>{

    return(
    <tr onClick={onClick} className={`${styles.row} ${styles.data}`}>
        <td>{data.id}</td>
        <td>{data.employee.name}</td>
        <td>{data.service.name}</td>
        <td>{data.comment}</td>
        <td>{String(data.createdAt)}</td>
        <td>{String(data.updatedAt)}</td>
    </tr>)
}

export default TableRowDataPassword