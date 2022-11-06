import axios from 'axios'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DropDownList from '../components/DropDownList'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { searchMode } from '../interfaces'
import { currentUserState } from '../store/slice'
import styles from '../styles/pages/passwordsList.module.css'

interface IData{
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

const PasswordsList=()=>{
    const [selectedEmployee, setSelectedEmployee] = useState({} as IData)
    const [timeoutId, setTimeoutId]:[undefined|string, Function] = useState()
    const [selectedService, setSelectedService] = useState({} as IData)

    const userState = useSelector(currentUserState)

    const sendRequest=(requestMode: searchMode, value: string)=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        if(requestMode===searchMode.employee){
            try{
                axios.get(`${BACKEND_URL}/employees?page=1&limit=${LIMIT_ITEMS_ON_PAGE}${value?`&searchString=${value}`:''}`, config).then(result=>{
                    if(result.status === 200){
                        setSelectedEmployee({...selectedEmployee, selectedId: undefined, value, count: result.data.data.count, rows: result.data.data.rows})
                    }
                })
            }catch(error){
                setSelectedEmployee({...selectedEmployee, value})    
            }
        }else{
            try{
                axios.get(`${BACKEND_URL}/services?page=1&limit=${LIMIT_ITEMS_ON_PAGE}${value?`&searchString=${value}`:''}`, config).then(result=>{
                    if(result.status === 200){
                        setSelectedService({...selectedService, selectedId: undefined, value, count: result.data.data.count, rows: result.data.data.rows})
                    }
                })
            }catch(error){
                setSelectedService({...selectedService, value})    
            }    
        }
        
    }

    const handleOnChangeEmployee:React.ChangeEventHandler=(event)=>{
        const {value} = event.target as HTMLInputElement
        
        setSelectedEmployee({...selectedEmployee, value, selectedId: undefined})
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        setTimeoutId(
            setTimeout(() => {
                sendRequest(searchMode.employee, value)    
            }, 800)
        )
    }

    const handleOnChangeService:React.ChangeEventHandler=(event)=>{
        const {value} = event.target as HTMLInputElement
        
        setSelectedService({...selectedService, value, selectedId: undefined})
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        setTimeoutId(
            setTimeout(() => {
                sendRequest(searchMode.service, value)    
            }, 800)
        )
    }
    const selectEmployeeFunction=(selectedId: number, value: string)=>{
        const clickBox:React.MouseEventHandler=(event)=>{
            setSelectedEmployee({...selectedEmployee, selectedId, value })
        }
        return clickBox
    }

    const selectServiceFunction=(selectedId: number, value: string)=>{
        const clickBox:React.MouseEventHandler=(event)=>{
            setSelectedService({...selectedService, selectedId, value })
        }
        return clickBox
    }
    const navigator = useNavigate()

    const getVision=(mode:searchMode):boolean=>{
        
        if(mode === searchMode.employee){
            if(selectedEmployee.value && selectedEmployee.count && !selectedEmployee.selectedId){
                return true
            }
        }else{
            if(selectedService.value && selectedService.count && !selectedService.selectedId){
                return true
            }
        }

        return false
    }

    return (<>
    <div className={styles.filterPanel}>
        <label htmlFor="employee">Employee</label>
        <div className={styles.inputWithDripDownList}>
            <input type="text" name="employee" id="employee" value={selectedEmployee.value} onChange={handleOnChangeEmployee} />
            <div>
            {getVision(searchMode.employee)?<DropDownList mode={searchMode.employee} rows={selectedEmployee.rows} count={selectedEmployee.count as number} maxCount={5} selectectFunction={selectEmployeeFunction} />:<></>}
            </div>
        </div>
        <label htmlFor="service">Service</label>
        <div className={styles.inputWithDripDownList}>
            <input type="text" name="service" id="service" value={selectedService.value} onChange={handleOnChangeService} />
            <div>
                {getVision(searchMode.service)?<DropDownList mode={searchMode.service} rows={selectedService.rows} count={selectedService.count as number} maxCount={5} selectectFunction={selectServiceFunction} />:<></>}
            </div>
            
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