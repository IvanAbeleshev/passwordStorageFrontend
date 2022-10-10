import axios from 'axios'
import React, {useState, useEffect} from 'react'
import styles from '../styles/pages/auth.module.css'
import {useDispatch} from 'react-redux'
import { setValue } from '../store/slice'
import { useNavigate } from 'react-router-dom'

const Auth = (props: React.PropsWithChildren) =>{
    //true - user with admin role is present, else is absent
    const [checkAdminRole, setCheckAdminRole] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        const resultRequest = axios.get(`http://localhost:5555/users/checkAdmin`)
        resultRequest.then(request=>setCheckAdminRole(request.data.error))
    }, [])

    const submitHandler: React.FormEventHandler=(event)=>{
        event.preventDefault()
        
        if(checkAdminRole){
            const sendData = {login, password, role: 'admin'}
            const resultRequest = axios.post(`http://localhost:5555/users/`, sendData)
            resultRequest.then(response=>{
                if(response.status === 200){
                    //set data in store
                    const {id, login, token} = response.data

                    dispatch(setValue({id, login, token, authState: true}))
                    navigate('/')
                }
            })
        }else{
            const sendData = {login, password}
            const resultRequest = axios.post(`http://localhost:5555/users/singIn`, sendData)
            resultRequest.then(response=>{
                console.log(response)
                if(response.status === 200){
                    //set data in store
                    const {id, login, token} = response.data
                    dispatch(setValue({id, login, token, authState: true}))
                    navigate('/')
                }
            })    
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
                    <div className={styles.submitContainer}>
                        <input className={styles.submitButton} type="submit" value={checkAdminRole?'Register':'Sing in'} />
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default Auth