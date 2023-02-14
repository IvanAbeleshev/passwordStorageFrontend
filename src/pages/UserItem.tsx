import { useState, ChangeEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import { en_userRoleType } from '../interfaces'
import { iUser } from '../interfaces/modelInterfaces'


const UserItem=()=>{
	const [inputsData, setInputsData] = useState<iUser>({} as iUser)
	const [password, setPassword] = useState('')
	
	const{id} = useParams()
	const navigator = useNavigate()

	// useEffect(()=>{

	// 	if(id !=='new'){
	// 		axiosInstance.get(`/users/getOne?id=${id}`).then(resultRequest=>{
	// 			setData(resultRequest.data.data)
	// 		})
	// 	}else{
	// 		setData({...data, role: userRoleType.user})
	// 	}
	// },[])
	
	// const changeHandler:React.ChangeEventHandler=(event)=>{
	// 	const target = event.target as HTMLInputElement
	// 	setData({...data, [target.name]: target.value})
	// }

	// const createButtonHandle:React.MouseEventHandler=()=>{
	// 	axiosInstance.post(`/users`, data).then(response=>{
	// 		navigator(-1)
	// 	}).catch(defaultErrorHandler) 
	// }

	// const changeItemHandler:React.MouseEventHandler=()=>{

	// 	axiosInstance.post(`/users/changeUser?id=${id}`, data).then(response=>{
	// 		navigator(-1)
	// 	}).catch(defaultErrorHandler)    
	// }

	const changeHandler:ChangeEventHandler<HTMLInputElement|HTMLSelectElement>=(event)=>{
		setInputsData({...inputsData, [event.target.name]:event.target.value})

	}

	return (
		
		<DefaultContainerData>
			<div className='flex flex-col w-full gap-5'>
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
					
			</div>
		</DefaultContainerData>
		
			
	)

}

export default UserItem