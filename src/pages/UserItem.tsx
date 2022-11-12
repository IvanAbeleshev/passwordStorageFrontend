import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../constans'
import { userRoleType } from '../interfaces'
import { currentUserState } from '../store/slice'
import generallyStyles from '../styles/generallyStyles.module.css'

interface IData {
    login: string,
    password: string|undefined
}

const UserItem=()=>{
    const [data, setData] = useState({} as IData)
    
    const{id} = useParams()
    const userState = useSelector(currentUserState)

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        if(id !=='new'){
            
            axios.get(`${BACKEND_URL}/services/getOne?id=${id}`, config).then(resultRequest=>{
                console.log(resultRequest.data)
                if(resultRequest.status === 200){

                }
            })
        }
    },[])
    
    return (
    <div className={generallyStyles.wrapper}>
        <div className={generallyStyles.flexRowSpaceBetween}>
            <label htmlFor="login">Login:</label>
            <input type="text" name="login" id="login" />
        </div>

        <div className={generallyStyles.flexRowSpaceBetween}>
            <div>
                <input type='radio' id='roleChoiseAdmin' name='role' value={userRoleType.admin} />
                <label htmlFor='roleChoiseAdmin'>Admin</label>
            </div>
            <div>
                <input type='radio' id='roleChoiseUser' name='role' value={userRoleType.user} />
                <label htmlFor='roleChoiseUser'>User</label>
            </div>
        </div>
    </div>)

}

export default UserItem