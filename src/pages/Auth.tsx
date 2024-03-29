import { faCloudMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QRCode } from 'antd'
import { FormEventHandler, useEffect, useState } from 'react'
import AuthCode from 'react-auth-code-input'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'
import ServiceAthentication from '../services/ServiceAthentication'
import { setAuthValue } from '../store/authSlice'
import { getDarkModeValue, setDarkMode } from '../store/darkModeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { fetchPasswordsGenerator } from '../store/passwordGeneratorSlice'
import { errorNotificator, infoNotificator, successNotificator } from '../utils/notificator'
import { decodeToken } from '../utils/tokensFuntion'

enum en_authPages{
	auth,
	auth2Fa,
	auth2FAWithTutorial
}

interface iTotpData{
	totpBase32:string,
	urlForAutintificator: string
}

const Auth = () =>{
	const [currentAuthPage, setCurrentAuthPage] = useState<en_authPages>(en_authPages.auth)
	const [checkAdminRole, setCheckAdminRole] = useState(false)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [totpData, setTotpData] = useState<iTotpData>()
	const [code2FA, setCode2FA] = useState<string>('')
	
	const dispatch = useAppDispatch()
	const isDarkMode = useAppSelector(getDarkModeValue)

	useEffect(()=>{
		ServiceAthentication.checkAdminUser().then(
			({isError})=>{
				setCheckAdminRole(isError)
				isError&&infoNotificator('Welcome', 'Create first user')
			}
		)
		// eslint-disable-next-line
	},[])

	const submitAut:FormEventHandler=(event)=>{
		event.preventDefault()
		if(checkAdminRole){
			ServiceAthentication.createFirstUser(login, password).then(
				({payload})=>{
					setTotpData(payload)
					setCurrentAuthPage(en_authPages.auth2FAWithTutorial)
				}
			)
		}else{
			ServiceAthentication.checkExistanceUser(login, password).then(
				({payload})=>{
					setTotpData(payload)
					setCurrentAuthPage(payload?
						en_authPages.auth2FAWithTutorial:
						en_authPages.auth2Fa
					)
				}
			).catch(error=>errorNotificator('Authentication error', error.message))
		}
	}

	const submit2FAWithTutorial:FormEventHandler=(event)=>{
		event.preventDefault()
		ServiceAthentication.signIn(login, password, code2FA).then(
			({payload})=>{
				localStorage.setItem(ACCESS_TOKEN, payload.accessToken)
				localStorage.setItem(REFRESH_TOKEN, payload.refreshToken)
				const result = decodeToken(payload.accessToken)
				dispatch(setAuthValue({
					id:result.id, 
					login:result.login, 
					authState:true
				}))
				dispatch(fetchPasswordsGenerator())
			}
		).catch(error=>errorNotificator('Authentication error', error.message))
	}

	return(
		<div 
			className='
				relative
				w-screen 
				h-screen
				overflow-y-auto
				overflow-x-hidden
				flex 
				flex-col 
				justify-center 
				items-center'
		>
			<div
				className='absolute top-2 left-2 text-2xl'
			>
				{
					isDarkMode?
					<FontAwesomeIcon
						onClick={()=>dispatch(setDarkMode(false))}
						className='
							text-main
							dark:text-hover 
							z-10
							hover:cursor-pointer 
							transition-all 
							dark:hover:text-dbtn-h 
							hover:text-btn-hover'
						icon={faSun}
					/>:
					<FontAwesomeIcon
						onClick={()=>dispatch(setDarkMode(true))}
						className='
							text-main
							dark:text-hover 
							z-10
							hover:cursor-pointer 
							transition-all 
							dark:hover:text-dbtn-h 
							hover:text-btn-hover'
						icon={faCloudMoon}
					/>
				}
			</div>
			<div 
				className='
					p-6 
					max-h-full
					overflow-y-auto
					max-sm:p-0
					rounded-2xl 
					shadow-2xl 
					bg-white/25 
					dark:bg-dcontainer/90 
					dark:shadow-main 
					text-white min-w-[40%]'
			>
				<h1 className='text-4xl py-2 text-center'>Wellcome</h1>
				{currentAuthPage===en_authPages.auth&&
					<div className='p-6'>
						<h3 className='text-center pb-2'>
							{checkAdminRole?'Create first admin user':'Sign in'}
						</h3>
						<form 
							className='flex flex-col gap-5 text-lg text-main' 
							onSubmit={submitAut}
						>
							<div className='flex justyfy-center'>
								<CustomPlaceholderInput
									placeholder='login'
									value={login}
									bias={1}
								>
									<input 	
										className='flex-3 text-black w-full rounded-full p-2'
										autoComplete='off'
										type='text' 
										name='login' 
										value={login} 
										onChange={(event)=>setLogin(event.target.value)}
									/>
								</CustomPlaceholderInput>
							</div>
									
							<div className='flex justyfy-center'>
								<CustomPlaceholderInput
									placeholder='password'
									value={password}
									bias={1}
								>
									<input 	
										className='flex-3 text-black w-full rounded-full p-2'
										autoComplete='off'
										type='password' 
										name='password' 
										value={password} 
										onChange={(event)=>setPassword(event.target.value)} 
									/>
								</CustomPlaceholderInput>	
							</div>

							<div className='flex flex-row-reverse'>
									<input 
										className='
											py-2 
											px-6 
											rounded-xl 
											shadow-md 
											bg-btn 
											dark:bg-dbtn
											dark:text-hover
											dark:hover:bg-dbtn-h
											hover:cursor-pointer 
											hover:bg-btn-hover 
											border' 
										type='submit' 
										value={checkAdminRole?'Register':'Sign in'} 
									/>
							</div>	
						</form>
					</div>
				}
				{currentAuthPage===en_authPages.auth2FAWithTutorial&&
					<div className='flex items-stretch max-lg:flex-col max-lg:gap-7'>
						<div className='basis-1/3 text-center'>
							<h1 className='text-2xl'>Step 1:</h1>
							<h3 className='text-main dark:text-hover py-2'>Download app for your mobile device</h3>
							<h3 className='text-main dark:text-hover '>
								For example that would be most popular application Google Authenticator:
							</h3>
							<div className='flex justify-around'>
								<div>
									<h3>for Android os:</h3>
									<QRCode 
										value='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
										className='w-[200px] h-[200px]'
									/>
									<a 
										href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2' 
										target={'_blank'}
										rel='noreferrer'
									>
										Download
									</a>
								</div>
								<div>
								<h3>for iOS:</h3>
									<QRCode 
										value='https://apps.apple.com/app/google-authenticator/id388497605'
										className='w-[200px] h-[200px]'
									/>
									<a 
										href='https://apps.apple.com/app/google-authenticator/id388497605' 
										target={'_blank'}
										rel='noreferrer'
									>
										Download
									</a>
								</div>
							</div>
						</div>

						<div className='basis-1/3 text-center'>
							<h1 className='text-2xl'>Step 2:</h1>
							<h3 className='text-main dark:text-hover py-2'>
								Scan following QR-code in your profile via application or handle add secure code
							</h3>
							<div className='flex flex-col items-center'>
								<h3>Qr-code:</h3>
								<QRCode 
									className='w-[200px] h-[200px]'
									value={totpData?totpData.urlForAutintificator:''}
								/>
								<h3>secure code:</h3>
								<h2 
									onClick={()=>{
										navigator.clipboard.writeText(totpData!.totpBase32)
										successNotificator('Copy to clipboard', 'Security code copy to clipboard')
									}}
									className='text-main dark:text-dlink break-all hover:cursor-pointer'
								>
									{totpData?totpData.totpBase32:''}
								</h2>
							</div>
						</div>

						<form 
							className='basis-1/3 text-center flex flex-col justify-between items-center' 
							onSubmit={submit2FAWithTutorial}
						>
							<div>
								<h1 className='text-2xl'>Step 3:</h1>
								<h3 className='text-main dark:text-hover py-2'>
									Enter 6 number in following field from your app
								</h3>
							</div>
							
							<AuthCode 
								allowedCharacters='numeric'
								inputClassName='w-12 h-12 text-main rounded-full text-lg font-semibold text-center'
								containerClassName='flex gap-2'
								onChange={setCode2FA}
							/>
							<div className='w-full flex flex-row-reverse justify-around max-lg:py-5'>
								<input 
									type='submit' 
									value='Sign in' 
									className='
											py-2 
											px-6 
											rounded-xl 
											shadow-md 
											bg-btn 
											dark:bg-dbtn
											dark:text-hover
											dark:hover:bg-dbtn-h
											hover:cursor-pointer 
											hover:bg-btn-hover 
											border'
								/>
								<button
									className='py-2 px-6 rounded-xl shadow-md bg-btn-s hover:bg-btn-s-hover border'
									onClick={()=>setCurrentAuthPage(en_authPages.auth)}
								>
									back
								</button>
							</div>
						</form>
					</div>
				}
				{currentAuthPage===en_authPages.auth2Fa&&
					<form 
					className='flex flex-col justify-around items-center p-6 gap-8' 
					onSubmit={submit2FAWithTutorial}
				>
					<div>
						<h1 className='text-main dark:text-hover text-lg py-2 text-center'>
							Enter 6 number in following field from your app
						</h1>
					</div>
					
					<AuthCode 
						allowedCharacters='numeric'
						inputClassName='w-12 h-12 text-main rounded-full text-lg font-semibold text-center'
						containerClassName='flex gap-2'
						onChange={setCode2FA}
					/>
					<div className='w-full flex flex-row-reverse justify-around'>
						<input 
							type='submit' 
							value='Sign in' 
							className='
											py-2 
											px-6 
											rounded-xl 
											shadow-md 
											bg-btn 
											dark:bg-dbtn
											dark:text-hover
											dark:hover:bg-dbtn-h
											hover:cursor-pointer 
											hover:bg-btn-hover 
											border'
						/>
						<button
							className='py-2 px-6 rounded-xl shadow-md bg-btn-s hover:bg-btn-s-hover border'
							onClick={()=>setCurrentAuthPage(en_authPages.auth)}
						>
							Back
						</button>
					</div>
				</form>

				}
			</div>
		</div>
	)
}

export default Auth