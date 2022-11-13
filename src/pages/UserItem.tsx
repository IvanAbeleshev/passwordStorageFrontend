import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { rootCertificates } from 'tls'
import Button from '../components/Button'
import { BACKEND_URL } from '../constans'
import { userRoleType } from '../interfaces'
import { currentUserState } from '../store/slice'
import generallyStyles from '../styles/generallyStyles.module.css'

interface IData {
    login: string,
    password: string|undefined,
    role: userRoleType
}

const UserItem=()=>{
    const [data, setData] = useState({} as IData)
    
    const{id} = useParams()
    const navigator = useNavigate()
    const userState = useSelector(currentUserState)

    useEffect(()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        if(id !=='new'){
            axios.get(`${BACKEND_URL}/users/getOne?id=${id}`, config).then(resultRequest=>{
                if(resultRequest.status === 200){
                    setData(resultRequest.data.data)
                }
            })
        }else{
            setData({...data, role: userRoleType.user})
        }
    },[])
    
    const changeHandler:React.ChangeEventHandler=(event)=>{
        const target = event.target as HTMLInputElement
        setData({...data, [target.name]: target.value})
    }

    const createButtonHandle:React.MouseEventHandler=()=>{
        
        axios.post(`${BACKEND_URL}/users`, data).then(response=>{
            if(response.status === 200){
                //set data in store
                navigator(-1)
            }
        }).catch(error=>{
            if(axios.isAxiosError(error)){
                alert(error.response?.statusText)    
            }
        }) 
    }

    const changeItemHandler:React.MouseEventHandler=()=>{
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.post(`${BACKEND_URL}/users/changeUser?id=${id}`, data, config).then(response=>{
            if(response.status === 200){
                //set data in store
                navigator(-1)
            }
        }).catch(error=>{
            if(axios.isAxiosError(error)){
                alert(error.response?.statusText)    
            }
        })    
    }

    return (
    <div className={generallyStyles.wrapper}>
        <div className={generallyStyles.flexRowSpaceBetween}>
            <label htmlFor="login">Login:</label>
            <input type="text" name="login" id="login" value={data.login} onChange={changeHandler} />
        </div>

        <div className={generallyStyles.flexRowSpaceBetween}>
            <div>
                <input type='radio' id='roleChoiseAdmin' name='role' value={userRoleType.admin} checked={userRoleType.admin === data.role} onChange={changeHandler} />
                <label htmlFor='roleChoiseAdmin'>Admin</label>
            </div>
            <div>
                <input type='radio' id='roleChoiseUser' name='role' value={userRoleType.user} checked={userRoleType.user === data.role} onChange={changeHandler}/>
                <label htmlFor='roleChoiseUser'>User</label>
            </div> 
        </div>

        <div className={generallyStyles.flexRowSpaceBetween}>
            <label htmlFor="password">Password(only set new password):</label>
            <input type="password" name="password" id="password" autoComplete='new-password' value={data.password} onChange={changeHandler} />
        </div>

        {id==='new'?
            <Button onClick={createButtonHandle}>Create</Button>:
            <div style={!data.password?{pointerEvents:'none', opacity:0.4}:{}}>
                <Button onClick={changeItemHandler}>Save changes</Button> 
            </div>
        }
        
    </div>)

}

export default UserItem