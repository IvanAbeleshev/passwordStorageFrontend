import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from '../styles/components/navPanel.module.css'
import {
  faPerson,
  faBellConcierge,
  faBook,
  faDoorOpen,
  faAnglesRight,
  faQuestion,
  faLock,
  faUserLock,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserState, setInitialState } from '../store/slice'
import { setValue } from '../store/sliceSearch'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'

interface IPropsNavPanel {
  children: React.ReactNode,
}

interface iItemNavMenu {
  icon: IconDefinition,
  title: string,
  path: string,
}

const arrayOfItemsNavMenu: iItemNavMenu[] = [
  { icon: faPerson, title: 'Employees', path: '/employees/1' },
  { icon: faBellConcierge, title: 'Servises', path: '/listServises/1' },
  { icon: faLock, title: 'Passwords', path: '/passwordsList/1' },
  { icon: faUserLock, title: 'Users', path: '/users/1' },
  { icon: faBook, title: 'Log', path: '/log/1' },
]

const NavPanel = ({ children }: IPropsNavPanel) => {
  const [currentVisible, setCurrentVisible] = useState(true)
  const [timeoutId, setTimeoutId]: [undefined | string, Function] =
    useState(undefined)

  const userState = useSelector(currentUserState)
  const navigationLocation = useLocation()

  const dispatch = useDispatch()

  const dispatchSearchString = (value: string) => {
    dispatch(setValue(value))
  }
  const clickLogOut: React.MouseEventHandler = (event) => {
    event.stopPropagation()
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    dispatch(setInitialState())
  }

  const hancleOnClickChangeVisible: React.MouseEventHandler = (event) => {
    setCurrentVisible(!currentVisible)
  }

  const handleChangeSearch: React.ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(undefined)
    }

    setTimeoutId(
      setTimeout(() => {
        dispatchSearchString(target.value)
        console.log('now is searching...')
      }, 800),
    )
  }

  return (
    <div className='flex h-screen w-screen bg-main-background bg-400% animate-movebg'>
      <div 
        className={currentVisible?
                  'flex flex-col justify-between rounded-r-xl items-stretch shadow-2xl bg-white/25 transition-all':
                  'transition-all flex flex-col justify-between items-stretch shadow-2xl bg-white hidden'}
      >
        <div>
          <Link className={styles.logoContainer} to='/'>
            <img
              className='w-[80px] h-[80px] p-[8px]'
              src='ico/android-chrome-512x512.png'
              alt='logo'
            />
          </Link>

          <nav>
            <ul>
              {arrayOfItemsNavMenu.map((element) => (
                <li key={element.title}>
                  <Link 
                    className={navigationLocation.pathname===element.path?
                                'group text-white text-center':
                                'group transition-all hover:text-main text-center'} 
                    to={element.path}
                  >
                    <FontAwesomeIcon
                      className={navigationLocation.pathname===element.path?
                                'text-5xl w-[100%]':
                                'text-5xl w-[100%] transition-all translate-y-4 group-hover:translate-y-0'}
                      icon={element.icon}
                    />
                    <h2 
                      className={navigationLocation.pathname===element.path?
                        'text-md w-[100%]':
                        'text-md w-[100%] text-transparent -translate-y-4 group-hover:translate-y-0 group-hover:text-main'}
                    >
                      {element.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div>
          <div className={styles.listItem} onClick={clickLogOut}>
            <div className='group transition-all hover:text-main text-center cursor-pointer'>
              <FontAwesomeIcon 
                className='text-5xl w-[100%] transition-all translate-y-4 group-hover:translate-y-0' 
                icon={faDoorOpen} />
              <h2 className='text-md w-[100%] text-transparent -translate-y-4 transition-all group-hover:translate-y-0 group-hover:text-main'>Log out</h2>
            </div>
          </div>
        </div>
      </div>

      <main className='w-[100%]'>
        <div className='flex justify-between items-center py-1 pr-5 text-md'>
          <div>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={
                currentVisible
                  ? 'hover:text-main transition-all rotate-180 cursor-pointer'
                  : 'hover:text-main transition-all cursor-pointer'}
              onClick={hancleOnClickChangeVisible}
            />
            <span className='text-white'>
              {userState.login}
            </span>
          </div>
          <input
            type='text'
            name='searchString'
            id='searchString'
            placeholder='fing'
            onChange={handleChangeSearch}
          />
          <FontAwesomeIcon
            className=''
            icon={faQuestion}
          />
        </div>
        <div className='p-6'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default NavPanel
