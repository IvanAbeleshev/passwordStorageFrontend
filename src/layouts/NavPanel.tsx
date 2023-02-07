import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { currentUserState, setAuthInitialState } from '../store/authSlice'
import { setValue } from '../store/sliceSearch'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans'
import ItemNavPanel from '../components/navPanel/ItemNavPanel'
import { hideSubNavPanel, selectorStatusSubMenu, showSubNavPanel } from '../store/subMenuStatusSlice'
import SubNavPanelGroups from '../components/navPanel/SubNavPanelGroups'
import ModalWindow from './ModalWindow'
import PasswordGroupItem from '../pages/PasswordGroupItem'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { selectorModalWindowVisible } from '../store/modalWindowSlice'
import { fetchPasswordsGroups } from '../store/passwordsGroupsSlice'

interface IPropsNavPanel {
  children: React.ReactNode,
}

export interface iItemNavMenu {
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
  const [timeoutId, setTimeoutId]: [undefined | string, Function] = useState(undefined)
  
  const subNavPanelStatus = useAppSelector(selectorStatusSubMenu)
  const visibleModalWindow = useAppSelector(selectorModalWindowVisible)

  const userState = useAppSelector(currentUserState)

  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchPasswordsGroups())
  },[dispatch])

  const dispatchSearchString = (value: string) => {
    dispatch(setValue(value))
  }
  const clickLogOut: React.MouseEventHandler = (event) => {
    event.stopPropagation()
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    dispatch(setAuthInitialState())
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
      }, 800),
    )
  }

  return (
    <div className='flex h-screen w-screen'>
      {visibleModalWindow&&<ModalWindow><PasswordGroupItem /></ModalWindow>}
      <div 
        className={currentVisible?
                  'flex flex-col justify-between items-stretch shadow-2xl transition-all':
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
              {
                arrayOfItemsNavMenu.map((element) => <ItemNavPanel key={element.title} {...element}/>)
              }
            </ul>
          </nav>
        </div>
        
        <div>
          <div className={styles.listItem} onClick={clickLogOut}>
            <div className='group transition-all hover:text-hover text-center cursor-pointer'>
              <FontAwesomeIcon 
                className='text-5xl w-[100%] transition-all translate-y-4 group-hover:translate-y-0' 
                icon={faDoorOpen} />
              <h2 className='text-md w-[100%] text-transparent -translate-y-4 transition-all group-hover:translate-y-0 group-hover:text-hover'>Log out</h2>
            </div>
          </div>
        </div>
      </div>
      
      {
        subNavPanelStatus&&
        <div 
          className='sticky left-0 bg-white/10'
          onMouseEnter={()=>dispatch(showSubNavPanel())}
          onMouseLeave={()=>dispatch(hideSubNavPanel())}
        >
          <SubNavPanelGroups/>
        </div>
      }

      <main className='w-[100%]'>
        <div className='flex justify-between items-center py-1 pr-5 text-md'>
          <div>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={
                currentVisible
                  ? 'hover:text-hover transition-all rotate-180 cursor-pointer'
                  : 'hover:text-hover transition-all cursor-pointer'}
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
            className='p-2 rounded-full'
            onChange={handleChangeSearch}
          />
          <FontAwesomeIcon
            className=''
            icon={faQuestion}
          />
        </div>
        <div className='p-6 box-border'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default NavPanel
