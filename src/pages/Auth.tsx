import axios, { AxiosError, AxiosResponse } from 'axios'
import React, {useState, useEffect} from 'react'
import styles from '../styles/pages/auth.module.css'
import {useDispatch} from 'react-redux'
import { setValue } from '../store/slice'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from '../constans'

const Auth = (props: React.PropsWithChildren) =>{
    //true - user with admin role is present, else is absent
    const [checkAdminRole, setCheckAdminRole] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        const resolveRequest=(response: AxiosResponse)=>{
            setCheckAdminRole(response.data.error)
        }

        axios.get(`${BACKEND_URL}/users/checkAdmin`).then(resolveRequest)        

    }, [])

    const submitHandler: React.FormEventHandler=(event)=>{
        event.preventDefault()
        
        const resolveFunction=(response: AxiosResponse)=>{
            const {id, login, accessToken, refreshToken} = response.data.data
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)
            dispatch(setValue({id, login, authState: true}))
            navigate('/')    
        }

        const rejectFunction=(error:AxiosError)=>{
            setMessage(`Server error. Status code: ${error.response?.status} - ${error.response?.statusText}`)
        }

        if(checkAdminRole){
            const sendData = {login, password, role: 'admin'}
            axios.post(`${BACKEND_URL}/users/`, sendData).then(resolveFunction).catch(rejectFunction)
        }else{
            const sendData = {login, password}
            axios.post(`${BACKEND_URL}/users/singIn`, sendData).then(resolveFunction).catch(rejectFunction)
        }
        
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Wellcome to passwords storage</h1>
            <h3 className={styles.description}>{checkAdminRole?'create first admin user':'Sing in'}</h3>
            <form onSubmit={submitHandler}>
                <div className={styles.containterLabelsAndInputs}>

                    <div className={styles.containerLabelAndInput}>
                        <label className={styles.label} htmlFor="login">login:</label>
                        <input className={styles.input} type="text" name="login" id="login" value={login} onChange={(event)=>setLogin(event.target.value)} />
                    </div>
                        
                    <div className={styles.containerLabelAndInput}>
                        <label className={styles.label} htmlFor="password">password:</label>
                        <input className={styles.input} type="password" name="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                    </div>
                    {message&&<h5 className={styles.description}>{message}</h5>}
                    <div className={styles.submitContainer}>
                        <input className={styles.submitButton} type="submit" value={checkAdminRole?'Register':'Sing in'} />
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default Auth