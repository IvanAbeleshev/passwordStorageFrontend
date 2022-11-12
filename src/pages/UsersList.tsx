import Button from '../components/Button'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { currentUserState } from '../store/slice'
import { useSelector } from 'react-redux'
import { searchSelectorString } from '../store/sliceSearch'
import axios from 'axios'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import BottomPageNavigator from '../components/BottomPageNavigator'
import styles from '../styles/generallyStyles.module.css'
import TableRowDataUsers from '../components/tableComponents/TableRowDataUsers'

export interface IDataRowsUser{
    id:number
    login: string,
    createdAt: Date,
    updatedAt: Date,   
}

const UsersList=()=>{
     //command panel + table is existanced data
    // in table mini image - name - full name - creation data
    const[countState, setCountState]:[number, Function] = useState(0)
    const[rowsState, setRowsState]:[IDataRowsUser[], Function] = useState([])

    const {pageIndex} = useParams()

    const userState = useSelector(currentUserState)
    const searchString = useSelector(searchSelectorString)

    const navigator = useNavigate()
    
    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/users?page=${pageIndex}&limit=${LIMIT_ITEMS_ON_PAGE}${searchString?`&searchString=${searchString}`:''}`, config).then(
            response=>{
            if(response.status === 200){
                const {count, rows}: {count:string, rows: IDataRowsUser[]} = response.data.data
                setCountState(count)
                setRowsState(rows)                
            }
        }).catch()
    }, [pageIndex, searchString, userState.token])

    const addNewItem: React.MouseEventHandler=()=>{
        navigator('/userItem/new')
    }

    const navigateByPath=(path:number)=>{
        const handleOnClick:React.MouseEventHandler=()=>{
            navigator(`/userItem/${path}`)    
        }
        return handleOnClick
    }
    return(
    <>
        <div className={styles.commandPanel}>
            <Button onClick={addNewItem}>Add</Button> 
        </div>
        <div className={styles.wrapper}>
            <table cellSpacing={0}>
                <thead>
                    <TableRowHead data={['Id', 'Name', 'Creation date', 'Update date']} />    
                </thead>
                <tbody>
                    {rowsState.map(element=><TableRowDataUsers data={element} onClick={navigateByPath(element.id)} key={element.id} />)}
                </tbody>
            </table>   
            {countState&&<BottomPageNavigator currentPage={Number(pageIndex)} countElementOnPage={LIMIT_ITEMS_ON_PAGE} baseURL={'/users/'} countOfElements={countState} />}
        </div>
    </>
    )
}

export default UsersList