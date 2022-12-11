import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../common'
import BottomPageNavigator from '../components/BottomPageNavigator'
import Button from '../components/Button'
import TableRowData from '../components/tableComponents/TableRowData'
import TableRowHead from '../components/tableComponents/TableRowHead'
import { LIMIT_ITEMS_ON_PAGE } from '../constans'
import { searchSelectorString } from '../store/sliceSearch'
import generallyStyles from '../styles/generallyStyles.module.css'

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

    const searchString = useSelector(searchSelectorString)

    const navigator = useNavigate()
    
    useEffect(()=>{

        axiosInstance.get(`/services?page=${servicesId}&limit=${LIMIT_ITEMS_ON_PAGE}${searchString?`&searchString=${searchString}`:''}`).then(
            response=>{
                const {count, rows}: {count:string, rows: IDataRows[]} = response.data.data
                setCountState(count)
                setRowsState(rows)                
        }).catch()
    }, [servicesId, searchString])

    const addNewItem: React.MouseEventHandler=()=>{
        navigator('/service/new')
    }

    const navigateByPath=(path:number)=>{
        const handleOnClick:React.MouseEventHandler=()=>{
            navigator(`/service/${path}`)    
        }
        return handleOnClick
    }
    return(
    <>
        <div className={generallyStyles.commandPanel}>
            <Button onClick={addNewItem}>Add</Button> 
        </div>
        <div className={generallyStyles.wrapper}>
            <table cellSpacing={0}>
                <thead>
                    <TableRowHead data={['Id', 'Img', 'Name', 'Desription', 'Creation date', 'Update date']} />    
                </thead>
                <tbody>
                    {rowsState.map(element=><TableRowData onClick={navigateByPath(element.id)} data={element} key={element.id} />)}
                </tbody>
            </table>   
            {countState&&<BottomPageNavigator currentPage={Number(servicesId)} countElementOnPage={LIMIT_ITEMS_ON_PAGE} baseURL={'/listServises/'} countOfElements={countState} />}
        </div>
    </>
    )
}

export default Services