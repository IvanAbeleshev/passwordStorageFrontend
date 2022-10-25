import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'
import TableRowHead from '../components/tableComponents/TableRowHead'

const EmployeesList=()=>{
    const {pageIndex} = useParams()
    const [arrayOfData, setArrayOfData] = useState()
    const [countOfData, setCountOfData] = useState()
    const userState = useSelector(currentUserState)

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/employees/`, config).then(resultRequest=>{
            if(resultRequest.status === 200){
                setArrayOfData(resultRequest.data.data.rows)
                setArrayOfData(resultRequest.data.data.count)
            }
        })
    },[pageIndex])
    return(
        <>
        <div className="commandPanel">
            
        </div>
        <div>
            <table>
                <thead>
                    <TableRowHead data={['Id', 'Name', 'JobTitle', 'Employment date', 'Dismiss date', 'Img', 'Comment']} />    
                </thead>    
            </table>
        </div>

        </>
    )
}

export default EmployeesList