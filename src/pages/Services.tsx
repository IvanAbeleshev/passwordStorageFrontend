import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import TableRow, { tableColumnType } from '../components/tableComponents/TableRow'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { currentUserState } from '../store/slice'

interface IDataRows{
    img?: string,
    name: string,
    desctiption?: string,
    creationDate: Date,
    changeDate: Date 
}
const Services=()=>{
    //command panel + table is existanced data
    // in table mini image - name - full name - creation data
    const[countState, setCountState] = useState(0)
    const[rowsState, setRowsState] = useState()

    const {servicesId} = useParams()

    const userState = useSelector(currentUserState)
    const navigator = useNavigate()
    
    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/services?page=${servicesId}&limit=${LIMIT_ITEMS_ON_PAGE}`, config).then(
            response=>{
            if(response.status === 200){
                const {count, rows}: {count:string, rows: IDataRows[]} = response.data.data
                console.log(count, rows)
                
            }
        }).catch()
    }, [servicesId])

    const addNewItem: React.MouseEventHandler=()=>{
        navigator('/service/new')
    }
    return(
    <>
        <div className="containerCommandPanel">
            <Button title='Add' onClick={addNewItem}/>
        </div>
        <div className="containerTable">
            <table>
                <tr>
                    <TableRow data={['Img', 'Name', 'Creation data']} typeColumn={tableColumnType.head}></TableRow>    
                </tr>                
            </table>   
        </div>
        <h1>This is Services PAGE!!!!{servicesId}</h1>
    </>
    )
}

export default Services