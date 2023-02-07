import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { searchMode } from '../interfaces'
import InputSelect from '../components/InputSelect'
import TableRowDataPassword from '../components/tableComponents/TableRowDataPassword'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { useSelector } from 'react-redux'
import { searchEmployeeParam, searchServiceParam } from '../store/sliceSearchParam'
import BottomPageNavigator from '../components/Paginator'
import generallyStyles from '../styles/generallyStyles.module.css'
import axiosInstance, { defaultErrorHandler } from '../common'

export interface IDataPassword{
    id?: number,
    employee: {
        name: string,
        img?: string
    },
    service:{
        name: string,
        img: string
    },
    comment?: string,
    createdAt: Date,
    updatedAt: Date,
}

const PasswordsList=()=>{
    const [rowsState, setRowState]:[IDataPassword[], Function] = useState([])
    const [countState, setCountState] = useState(0)

    const navigator = useNavigate()
    const employeeState = useSelector(searchEmployeeParam)
    const serviceState = useSelector(searchServiceParam)
    const {pageIndex} = useParams()

    useEffect(()=>{

        axiosInstance.get(`${BACKEND_URL}/passwords?page=${pageIndex}
                    &limit=${LIMIT_ITEMS_ON_PAGE}
                    ${employeeState.selectedId?`&employeeId=${employeeState.selectedId}`:''}
                    ${serviceState.selectedId?`&serviceId=${serviceState.selectedId}`:''}`).then(replyRequest =>{
                setRowState(replyRequest.data.data.rows)
                setCountState(replyRequest.data.data.count)
        }).catch(defaultErrorHandler)
    },[employeeState.selectedId, serviceState.selectedId, pageIndex])

    const navigateByPath=(path:number)=>{
        const handleOnClick:React.MouseEventHandler=()=>{
            navigator(`/passwordItem/${path}`)    
        }
        return handleOnClick
    }
    return (<>
    <div className={generallyStyles.commandPanel}>
        <label htmlFor="employee">Employee</label>
        <InputSelect mode={searchMode.employee} />
        
        <label htmlFor="service">Service</label>
        <InputSelect mode={searchMode.service} />
    </div>
    
    <div className={generallyStyles.commandPanel}>
        <Button onClick={()=>{navigator('/passwordItem/new')}}>Add</Button>
    </div>

    <div className={generallyStyles.wrapper}>
        <table cellSpacing={0}>
            <thead>
                <TableRowHead data={['Id', 'Employee', 'Service', 'Comment', 'Creation date', 'Update date']} />    
            </thead>
            <tbody>
                {rowsState.map(element=><TableRowDataPassword onClick={navigateByPath(Number(element.id))} data={element} key={element.id}/>)}   
            </tbody>
        </table>
    </div>

    </>)
}

export default PasswordsList