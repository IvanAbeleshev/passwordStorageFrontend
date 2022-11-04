import axios from 'axios'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DropDownList from '../components/DropDownList'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { currentUserState } from '../store/slice'
import styles from '../styles/pages/passwordsList.module.css'

interface IEmployeeState{
    value: string | undefined,
    selectedId: number | undefined,
    count?: number,
    rows?: {
        id: number,
        img?: string,
        name: string,
        jobTitle?: string
    }[]
}

interface IServiceState{
    value: string | undefined,
    selectedId: number | undefined,
    count?: number,
    rows?: {
        
    }
}

const PasswordsList=()=>{
    const [selectedEmployee, setSelectedEmployee] = useState({} as IEmployeeState)
    const [selectedService, setSelectedService] = useState({} as IServiceState)

    const userState = useSelector(currentUserState)

    const handleOnChangeEmployee:React.ChangeEventHandler=(event)=>{
        const {value} = event.target as HTMLInputElement
        //need create after input all text request for optimization
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        try{
            axios.get(`${BACKEND_URL}/employees?page=1&limit=${LIMIT_ITEMS_ON_PAGE}${value?`&searchString=${value}`:''}`, config).then(result=>{
                if(result.status === 200){
                    setSelectedEmployee({...selectedEmployee, value, count: result.data.data.count, rows: result.data.data.rows})
                }
            })
        }catch(error){
            setSelectedEmployee({...selectedEmployee, value})    
        }
    }

    const selectFunction=(selectedId: number, value: string)=>{
        const clickBox:React.MouseEventHandler=(event)=>{
            setSelectedEmployee({...selectedEmployee, selectedId, value })
        }
        return clickBox
    }

    const navigator = useNavigate()

    return (<>
    <div className={styles.filterPanel}>
        <label htmlFor="employee">Employee</label>
        <div className={styles.inputWithDripDownList}>
            <input type="text" name="employee" id="employee" value={selectedEmployee.value} onChange={handleOnChangeEmployee} />
            {selectedEmployee.value&&<DropDownList rows={selectedEmployee.rows} count={selectedEmployee.count as number} maxCount={5} selectectFunction={selectFunction} />}
        </div>
        <label htmlFor="service">Service</label>
        <div className={styles.inputWithDripDownList}>
            <input type="text" name="service" id="service" value={selectedService.value}/>
            {
            //selectedService.value&&<DropDownList />
            }
        </div>
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