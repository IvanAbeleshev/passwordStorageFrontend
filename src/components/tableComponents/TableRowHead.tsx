import generallyStyles from '../../styles/generallyStyles.module.css'

interface IPropsTableRow{
    data: string[],
}

const TableRowHead=({data, }: IPropsTableRow)=>{

    return(
        <tr className={generallyStyles.tableHead}>
        {data.map(element=><th key={element}>{element}</th>)}
        </tr>
    )
}

export default TableRowHead