import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import TableRowData from '../components/tableComponents/TableRowData'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { BACKEND_URL, LIMIT_ITEMS_ON_PAGE } from '../constans'
import { currentUserState } from '../store/slice'

export interface IDataRows{
    id:number
    img?: string,
    name: string,
    desctiption?: string,
    createdAt: Date,
    updatedAt: Date,
}
const Services=()=>{
    //command panel + table is existanced data
    // in table mini image - name - full name - creation data
    const[countState, setCountState]:[number, Function] = useState(0)
    const[rowsState, setRowsState]:[IDataRows[], Function] = useState([])

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
                setCountState(count)
                setRowsState(rows)                
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
                <thead>
                    <TableRowHead data={['Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date']} />    
                </thead>
                <tbody>
                    {rowsState.map(element=><TableRowData data={element} key={element.id} />)}
                </tbody>
            </table>   
        </div>
        <h1>This is Services PAGE!!!!{servicesId}</h1>
    </>
    )
}

export default Services