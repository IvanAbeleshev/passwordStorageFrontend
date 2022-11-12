import { IDataPassword } from '../../pages/PasswordsList'
import generallyStyles from '../../styles/generallyStyles.module.css'

interface IPropsTableRow{
    data: IDataPassword,
    onClick?: React.MouseEventHandler    
}

const TableRowDataPassword=({data, onClick}:IPropsTableRow)=>{

    return(
    <tr onClick={onClick} className={generallyStyles.tableRow}>
        <td className={generallyStyles.cell}>{data.id}</td>
        <td className={generallyStyles.cell}>{data.employee.name}</td>
        <td className={generallyStyles.cell}>{data.service.name}</td>
        <td className={generallyStyles.cell}>{data.comment}</td>
        <td className={generallyStyles.cell}>{String(data.createdAt)}</td>
        <td className={generallyStyles.cell}>{String(data.updatedAt)}</td>
    </tr>)
}

export default TableRowDataPassword