import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'
import TableRowHead from '../components/tableComponents/TableRowHead'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const EmployeesList=()=>{
    const {pageIndex} = useParams()
    const [arrayOfData, setArrayOfData] = useState()
    const [countOfData, setCountOfData] = useState()
    
    const userState = useSelector(currentUserState)
    const navigator = useNavigate()

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.get(`${BACKEND_URL}/employees/`, config).then(resultRequest=>{
            if(resultRequest.status === 200){
                setArrayOfData(resultRequest.data.data.rows)
                setCountOfData(resultRequest.data.data.count)
            }
        })
    },[pageIndex, userState.token])
    return(
        <>
        <div className="commandPanel">
        <Button><h3><Link to='/employeeItem/new'>Add</Link></h3></Button>    
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