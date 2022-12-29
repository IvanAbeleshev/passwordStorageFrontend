import axios, { AxiosError, AxiosResponse } from 'axios'
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { setValue } from '../store/slice'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, BACKEND_URL, REFRESH_TOKEN } from '../constans'

const Auth = () =>{
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
			axios.post(`${BACKEND_URL}/users`, sendData).then(resolveFunction).catch(rejectFunction)
		}else{
			const sendData = {login, password}
			axios.post(`${BACKEND_URL}/users/singIn`, sendData).then(resolveFunction).catch(rejectFunction)
		}			
	}

	return(
		<div className='w-screen h-screen flex flex-col justify-center items-center bg-main-background bg-400% animate-movebg'>
			<div className='p-6 rounded-2xl shadow-2xl bg-white/25 text-white'>
				<h1 className='text-4xl py-2'>Wellcome to passwords storage</h1>
				<h3 className='text-center pb-2'>{checkAdminRole?'Create first admin user':'Sign in'}</h3>
				<form onSubmit={submitHandler}>
					<div className='flex flex-col gap-[10px]'>
						<div className='flex justyfy-center'>
								<label  className='flex-1 text-center'
													htmlFor='login'
								>
										login
								</label>
								<input 	className='flex-3 text-black'
												type='text' 
												name='login' 
												id='login' 
												value={login} 
												onChange={(event)=>setLogin(event.target.value)}
								/>
						</div>
								
						<div className='flex justyfy-center'>
								<label	className='flex-1 text-center'
												htmlFor='password'
								>
									password
								</label>
								<input 	className='flex-3 text-black'
												type='password' 
												name='password' 
												id='password' 
												value={password} 
												onChange={(event)=>setPassword(event.target.value)} 
								/>
						</div>

						{message&&<h5 className='text-center'>{message}</h5>}

						<div className='flex flex-row-reverse'>
								<input className='p-2 rounded-xl shadow-md bg-main hover:cursor-pointer hover:bg-hover' 
												type='submit' 
												value={checkAdminRole?'Register':'Sign in'} 
								/>
						</div>
					</div>				
				</form>
			</div>
		</div>
	)
}

export default Auth