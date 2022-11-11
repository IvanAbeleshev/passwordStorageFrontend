import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { searchMode } from '../interfaces'
import styles from '../styles/pages/passwordsList.module.css'
import InputSelect from '../components/InputSelect'
import TableRowDataPassword from '../components/tableComponents/TableRowDataPassword'
import axios from 'axios'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'
import { searchEmployeeParam, searchServiceParam } from '../store/sliceSearchParam'
import BottomPageNavigator from '../components/BottomPageNavigator'

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
    const userState = useSelector(currentUserState)
    const employeeState = useSelector(searchEmployeeParam)
    const serviceState = useSelector(searchServiceParam)
    const {pageIndex} = useParams()

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/passwords?page=${pageIndex}
                    &limit=${LIMIT_ITEMS_ON_PAGE}
                    ${employeeState.selectedId?`&employeeId=${employeeState.selectedId}`:''}
                    ${serviceState.selectedId?`&serviceId=${serviceState.selectedId}`:''}`, config).then(replyRequest =>{
            if(replyRequest.status === 200){
                console.log(replyRequest)
                setRowState(replyRequest.data.data.rows)
                setCountState(replyRequest.data.data.count)
            }
        }).catch(error=>{
                if(axios.isAxiosError(error)){
                    alert(error.response?.data.message)
                }
            })
    },[employeeState.selectedId, serviceState.selectedId, pageIndex])

    const navigateByPath=(path:number)=>{
        const handleOnClick:React.MouseEventHandler=()=>{
            navigator(`/passwordItem/${path}`)    
        }
        return handleOnClick
    }
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
            <tbody>
                {rowsState.map(element=><TableRowDataPassword onClick={navigateByPath(Number(element.id))} data={element} key={element.id}/>)}   
            </tbody>
        </table>
        {countState&&<BottomPageNavigator currentPage={Number(pageIndex)} countElementOnPage={LIMIT_ITEMS_ON_PAGE} baseURL={'/listServises/'} countOfElements={countState} />}
    </div>

    </>)
}

export default PasswordsList