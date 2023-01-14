import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance, { defaultErrorHandler } from '../common'
import Button from '../components/Button'
import { userRoleType } from '../interfaces'
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

    useEffect(()=>{

        if(id !=='new'){
            axiosInstance.get(`/users/getOne?id=${id}`).then(resultRequest=>{
                setData(resultRequest.data.data)
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
        
        axiosInstance.post(`/users`, data).then(response=>{
            navigator(-1)
        }).catch(defaultErrorHandler) 
    }

    const changeItemHandler:React.MouseEventHandler=()=>{

        axiosInstance.post(`/users/changeUser?id=${id}`, data).then(response=>{
            navigator(-1)
        }).catch(defaultErrorHandler)    
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