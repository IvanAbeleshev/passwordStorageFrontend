import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { searchMode } from '../interfaces'
import styles from '../styles/pages/passwordsList.module.css'
import InputSelect from '../components/InputSelect'

const PasswordsList=()=>{

    const navigator = useNavigate()

    return (<>
    <div className={styles.filterPanel}>
        <label htmlFor="employee">Employee</label>
        <InputSelect mode={searchMode.employee} />
        
        <label htmlFor="service">Service</label>
        <InputSelect mode={searchMode.service} />
    </div>
    
    <div className="commandPanel">
        <Button onClick={()=>{navigator('/passwordItem/new')}}><h3>Add</h3></Button>
    </div>

    <div className="tableArea">
        <table cellSpacing={0}>
            <thead>
                <TableRowHead data={['Id', 'Employee', 'Service', 'Comment', 'Creation date', 'Update date']} />    
            </thead>
        </table>
    </div>

    </>)
}

export default PasswordsList