import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LIMIT_ITEMS_ON_PAGE } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'
import TableRowHead from '../components/tableComponents/TableRowHead'
import Button from '../components/Button'
import TableRowDataEmployee from '../components/tableComponents/TableRowDataEmployee'
import { IDataEmployee } from './EmployeeItem'
import BottomPageNavigator from '../components/BottomPageNavigator'
import { searchSelectorString } from '../store/sliceSearch'
import generallyStyles from '../styles/generallyStyles.module.css'
import axiosInstance from '../common'

const EmployeesList=()=>{
    const {pageIndex} = useParams()
    const [rowsState, setArrayOfData]:[IDataEmployee[], Function] = useState([])
    const [countOfData, setCountOfData]:[number, Function] = useState(0)
    
    const userState = useSelector(currentUserState)
    const searchString = useSelector(searchSelectorString)
    const navigator = useNavigate()

    useEffect(()=>{

        axiosInstance.get(`/employees?page=${pageIndex}&limit=${LIMIT_ITEMS_ON_PAGE}${searchString?`&searchString=${searchString}`:''}`).then(resultRequest=>{
            setArrayOfData(resultRequest.data.data.rows)
            setCountOfData(resultRequest.data.data.count)
        })
    },[pageIndex, searchString])

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
        <div className={generallyStyles.commandPanel}>
        <Button onClick={handleOnClickAdd}>Add</Button>    
        </div>
        <div className={generallyStyles.wrapper}>
            <table cellSpacing={0}>
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