import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'
import TableRowHead from '../components/tableComponents/TableRowHead'
import Button from '../components/Button'
import TableRowDataEmployee from '../components/tableComponents/TableRowDataEmployee'
import { IDataEmployee } from './EmployeeItem'
import BottomPageNavigator from '../components/BottomPageNavigator'

const EmployeesList=()=>{
    const {pageIndex} = useParams()
    const [rowsState, setArrayOfData]:[IDataEmployee[], Function] = useState([])
    const [countOfData, setCountOfData]:[number, Function] = useState(0)
    
    const userState = useSelector(currentUserState)
    const navigator = useNavigate()

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/employees?page=${pageIndex}&limit=${LIMIT_ITEMS_ON_PAGE}`, config).then(resultRequest=>{
            if(resultRequest.status === 200){
                setArrayOfData(resultRequest.data.data.rows)
                setCountOfData(resultRequest.data.data.count)
            }
        })
    },[pageIndex, userState.token])

    const handleOnClickAdd:React.MouseEventHandler=(event)=>{
        navigator('/employeeItem/new')
    }

    const navigateByPath=(id: number | undefined)=>{
        const handleSelectedRow:React.MouseEventHandler=()=>{
            navigator(`/employeeItem/${id}`)
        }
        return handleSelectedRow
    }
    return(
        <>
        <div className="commandPanel">
        <Button onClick={handleOnClickAdd}><h3>Add</h3></Button>    
        </div>
        <div>
            <table>
                <thead>
                    <TableRowHead data={['Id', 'Name', 'JobTitle', 'Employment date', 'Dismiss date', 'Img', 'Comment']} />    
                </thead>    
                <tbody>
                    {rowsState.map(element=><TableRowDataEmployee onClick={navigateByPath(element.id)} data={element} key={element.id} />)}
                </tbody>
            </table>
            {countOfData&&<BottomPageNavigator currentPage={Number(pageIndex)} countElementOnPage={LIMIT_ITEMS_ON_PAGE} baseURL={'/employees/'} countOfElements={countOfData} />}
        </div>

        </>
    )
}

export default EmployeesList