import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import InputSelect from '../components/InputSelect'
import { searchMode } from '../interfaces'
import { searchEmployeeParam, searchServiceParam, setValue } from '../store/sliceSearchParam'
import styles from '../styles/pages/passwordItem.module.css'
import { faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { currentUserState } from '../store/slice'
import axios from 'axios'
import { BACKEND_URL } from '../constans'

interface IData{
    login: string,
    password: string,
    comment: string
}

const PasswordItem=()=>{
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [properPassword, setProperPassword] = useState(false)
    const [passwordBeforeChange, setPasswordBeforeChange] = useState('')
    const [data, setData] = useState({} as IData)
    const [enableSubmit, setEnableSubmit] = useState(false)

    const employeeState = useSelector(searchEmployeeParam)
    const serviceState = useSelector(searchServiceParam)
    const userState = useSelector(currentUserState)

    const dispatch = useDispatch()

    const navigator = useNavigate()
    const{id} = useParams()

    useEffect(()=>{
        if(id === 'new'){
            setVisiblePassword(true)
            setProperPassword(true)
        }
    },[id])

    useEffect(()=>{
        if(id !== 'new'){
            const config = {
                headers: {
                'Authorization': 'Bearer ' + userState.token
                }
            }
            axios.get(`${BACKEND_URL}/passwords/getOne?id=${id}`, config).then(replyRequest =>{
                if(replyRequest.status === 200){
                    console.log(replyRequest)
                    const {login, password, comment, employee, service} = replyRequest.data.data
                    setData({login, password, comment})
                    dispatch(setValue({
                        employee:{value: employee.name, selectedId: employee.id},
                        service:{value: service.name, selectedId: service.id}
                    }))
                }
            }).catch(error=>{
                    if(axios.isAxiosError(error)){
                        alert(error.response?.data.message)
                    }
                })   
        }
    },[id])

    useEffect(()=>{
        if(employeeState.selectedId && serviceState.selectedId){
            return setEnableSubmit(true)
        }
        setEnableSubmit(false)
    }, [employeeState.selectedId, serviceState.selectedId])

    const handleCreateButton=()=>{
        const sendingData = {login: data.login, password: data.password, comment: data.comment, serviceId: serviceState.selectedId, employeeId: employeeState.selectedId}
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.post(`${BACKEND_URL}/passwords/create`, sendingData, config).then(replyRequest =>{
            if(replyRequest.status === 200){
                navigator(-1)
            }
        }).catch(error=>{
                if(axios.isAxiosError(error)){
                    alert(error.response?.data.message)
                }
            })
    }

    const handleChangeItem=()=>{
        const sendingData = {login: data.login, password: data.password, comment: data.comment, serviceId: serviceState.selectedId, employeeId: employeeState.selectedId}
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.post(`${BACKEND_URL}/passwords/changeItem?id=${id}`, sendingData, config).then(replyRequest =>{
            if(replyRequest.status === 200){
                navigator(-1)
            }
        }).catch(error=>{
                if(axios.isAxiosError(error)){
                    alert(error.response?.data.message)
                }
            })
    }

    const changeVisible=()=>{
        if(id!=='new' && !properPassword){
            const config = {
                headers: {
                'Authorization': 'Bearer ' + userState.token
                }
            }
            axios.get(`${BACKEND_URL}/passwords/getCorectPassword?id=${id}`, config).then(replyRequest =>{
                if(replyRequest.status === 200){
                    setData({...data, password: replyRequest.data.data})
                    setProperPassword(true)
                    setVisiblePassword(!visiblePassword)
                }
            }).catch(error=>{
                    if(axios.isAxiosError(error)){
                        alert(error.response?.data.message)
                    }
                })
        }else{
            setVisiblePassword(!visiblePassword)
        }

    }

    const onChange:React.ChangeEventHandler=(event)=>{
        const target = event.target as HTMLInputElement
        if(target.name === 'password' && !properPassword){
            const additionalValue = target.value.replace(passwordBeforeChange, '')
            const config = {
                headers: {
                'Authorization': 'Bearer ' + userState.token
                }
            }
            axios.get(`${BACKEND_URL}/passwords/getCorectPassword?id=${id}`, config).then(replyRequest =>{
                if(replyRequest.status === 200){
                    setData({...data, password: replyRequest.data.data+additionalValue})
                    setProperPassword(true)
                }
            }).catch(error=>{
                    if(axios.isAxiosError(error)){
                        alert(error.response?.data.message)
                    }
                })
        }else(
            setData({...data, [target.name]:target.value})
        )
    }
    const passwordFocus: React.FocusEventHandler =(event)=>{
        const target = event.target as HTMLInputElement
        setPasswordBeforeChange(target.value)    
    }

    return <div className={styles.wrapper}>
        <label htmlFor="employee">Employee</label>
        <div>
            <InputSelect mode={searchMode.employee} />
            <Link to={'/'}>link to employee</Link>
        </div>

        <label htmlFor="service">Service</label>
        <div>
            <InputSelect mode={searchMode.service} />
            <Link to={'/'}>link to service</Link>
        </div>
        <hr />
        <label htmlFor="loginEmployee">Login</label>
        <input type="text" name="login" id="loginEmployee" value={data.login} onChange={onChange} />
        <label htmlFor="passwordEmployee">Password</label>
        <div className={styles.containerInputAndButtons}>
            <input type={visiblePassword?'text':'password'} name="password" id="passwordEmployee" autoComplete='new-password' value={data.password} onChange={onChange} onFocus={passwordFocus}/>
            <Button onClick={changeVisible}><FontAwesomeIcon icon={visiblePassword?faLock:faEyeSlash} /></Button>
        </div>
        
        <label htmlFor="comment">Comment</label>
        <textarea name="comment" id="comment" cols={30} rows={10} value={data.comment} onChange={onChange} />
        <div style={enableSubmit?{}:{pointerEvents:'none', opacity:0.4}}>
            {id === 'new'?
            <Button onClick={handleCreateButton}><h3>Create</h3></Button>:
            <Button onClick={handleChangeItem}><h3>Save changes</h3></Button>
            }
        </div>
        
    </div>
}

export default PasswordItem