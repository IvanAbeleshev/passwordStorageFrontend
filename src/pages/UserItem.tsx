import { Switch } from 'antd'
import { useState, ChangeEventHandler, MouseEventHandler, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import { en_userRoleType } from '../interfaces'
import { iUser } from '../interfaces/modelInterfaces'
import ServiceUser from '../services/ServiceUser'
import { errorNotificator, successNotificator } from '../utils/notificator'


const UserItem=()=>{
	const [inputsData, setInputsData] = useState<iUser>({} as iUser)
	const [password, setPassword] = useState('')
	
	const{id} = useParams()
	const navigator = useNavigate()

	useEffect(()=>{
		if(id&&id !=='new'){
			ServiceUser.getUser(id).then(({payload})=>{
				setInputsData(payload.getStructureData())
			}).catch(error=>errorNotificator('Read error', error.message))
		}
	},[id])

	const changeUser:MouseEventHandler=()=>{
		if(id)
			ServiceUser.changeUser(id, inputsData.active, inputsData.login, password, inputsData.role).then(()=>{
				successNotificator('User changed', `User ${inputsData.login} was changed`)
				navigator(-1)
			}).catch(error=>errorNotificator('Error change', error.message))
	}

	const changeHandler:ChangeEventHandler<HTMLInputElement|HTMLSelectElement>=(event)=>{
		setInputsData({...inputsData, [event.target.name]:event.target.value})
	}

	const createUser:MouseEventHandler=()=>{
		ServiceUser.createUser(inputsData.login, password, inputsData.role, inputsData.active).then(
      ()=>{
        successNotificator('Create success', `Created new user: ${inputsData.login}`)
        navigator(-1)
      }
    ).catch(error=>errorNotificator('Create error', error.message))
	}

	const changeActive=(active:boolean)=>{
		setInputsData({...inputsData, active})
	}

	return (
		
		<DefaultContainerData>
			<div className='flex justify-center'>
				<div className='flex flex-col gap-5 w-fit min-w-[30%]'>
					<div className='flex gap-10'>
						<h4>Active:</h4>
						<Switch checked={inputsData.active} onChange={changeActive} />
					</div>
					
					<CustomPlaceholderInput
						placeholder='Login'
						value={inputsData.login}
					>
						<input 
							autoComplete='off'
							className='shadow-md border w-full rounded-full px-2' 
							type='text' 
							name='login'
							value={inputsData.login}
							onChange={changeHandler}
						/>
					</CustomPlaceholderInput>
					<select 
						className='shadow-md border w-full rounded-full px-2 bg-hover' 
						name='role' 
						value={inputsData.role} 
						onChange={changeHandler}
					>
						<option value={en_userRoleType.admin}>{en_userRoleType.admin}</option>
						<option value={en_userRoleType.user}>{en_userRoleType.user}</option>
					</select>
					<CustomPlaceholderInput
						placeholder='Password'
						value={password}
					>
						<input 
							autoComplete='off'
							className='shadow-md border w-full rounded-full px-2' 
							type='password' 
							name='password'
							value={password}
							onChange={event=>setPassword(event.target.value)}
						/>
					</CustomPlaceholderInput>
					<div className='pt-5 flex gap-10 w-full justify-center text-hover'>
							<input 
								onClick={event=>{
									event.preventDefault()
									navigator(-1)
								}}
								type='button' 
								value='Back' 
								className='
									py-2 
									px-6 
									rounded-xl 
									shadow-md 
									bg-btn-s 
									hover:bg-btn-s-hover 
									hover:cursor-pointer'
							/>
							{id==='new'?
								<input 
									onClick={createUser}
									type='button' 
									value='Create' 
									className='
										py-2 
										px-6 
										rounded-xl 
										shadow-md 
										bg-btn 
										hover:bg-btn-hover 
										hover:cursor-pointer' 
								/>:
								<input 
									onClick={changeUser}
									type='button' 
									value='Save changes' 
									className='
										py-2 
										px-6 
										rounded-xl 
										shadow-md 
										bg-btn 
										hover:bg-btn-hover 
										hover:cursor-pointer' 
								/>
							}
						</div>
				</div>
			</div>
		</DefaultContainerData>
	)
}

export default UserItem