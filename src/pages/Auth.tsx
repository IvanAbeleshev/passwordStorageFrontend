import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import React, {useState, useEffect} from 'react'
import styles from '../styles/pages/auth.module.css'
import {useDispatch} from 'react-redux'
import { setValue } from '../store/slice'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../constans'
import { fulfillGetRequest, fulfillPostRequest } from '../common'

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

        fulfillGetRequest(`${BACKEND_URL}/users/checkAdmin`, resolveRequest)
        
        // const resultRequest = axios.get(`${BACKEND_URL}/users/checkAdmin`)
        // resultRequest.then(request=>setCheckAdminRole(request.data.error))
    }, [])

    const submitHandler: React.FormEventHandler=(event)=>{
        event.preventDefault()
        
        const resolveFunction=(response: AxiosResponse)=>{
            const {id, login, token} = response.data.data
            dispatch(setValue({id, login, token, authState: true}))
            navigate('/')    
        }

        const rejectFunction=(error:AxiosError)=>{
            setMessage(`Server error. Status code: ${error.response?.status} - ${error.response?.statusText}`)
        }

        if(checkAdminRole){
            const sendData = {login, password, role: 'admin'}
            fulfillPostRequest(`${BACKEND_URL}/users/`, resolveFunction, rejectFunction, sendData)
            // const resultRequest = axios.post(`${BACKEND_URL}/users/`, sendData)
            // resultRequest.then(response=>{
            //     if(response.status === 200){
            //         //set data in store
            //         const {id, login, token} = response.data.data

            //         dispatch(setValue({id, login, token, authState: true}))
            //         navigate('/')
            //     }
            // }).catch(error=>{
            //     if(axios.isAxiosError(error)){
            //         setMessage(`Server error. Status code: ${error.response?.status} - ${error.response?.data?.message? error.response?.data?.message : error.response?.statusText}`)
            //     }
            // })
        }else{
            const sendData = {login, password}
            fulfillPostRequest(`${BACKEND_URL}/users/singIn`, resolveFunction, rejectFunction, sendData)
            // const resultRequest = axios.post(`${BACKEND_URL}/users/singIn`, sendData)
            // resultRequest.then(response=>{
            //     console.log(response)
                
            //     if(response.status === 200){
            //         //set data in store
            //         const {id, login, token} = response.data.data
            //         dispatch(setValue({id, login, token, authState: true}))
            //         navigate('/')
            //     }
            // }).catch(error=>{
            //     if(axios.isAxiosError(error)){
            //         setMessage(`Server error. Status code: ${error.response?.status} - ${error.response?.data?.message?error.response?.data?.message:error.response?.statusText}`)
            //     }
            // })
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