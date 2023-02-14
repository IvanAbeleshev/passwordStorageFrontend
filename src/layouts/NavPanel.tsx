import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import SubNavPanelGroups from '../components/navPanel/SubNavPanelGroups'
import ModalWindow from './ModalWindow'
import PasswordGroupItem from '../pages/PasswordGroupItem'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { selectorModalWindowVisible } from '../store/modalWindowSlice'
import { fetchPasswordsGroups } from '../store/passwordsGroupsSlice'
import { Spin } from 'antd'
import { setPasswordFilterItem } from '../store/passwordFilterSlice'

interface iPropsNavPanel {
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

const NavPanel = ({ children }: iPropsNavPanel) => {
  const [currentVisible, setCurrentVisible] = useState(true)
  const [timeoutId, setTimeoutId]: [undefined | string, Function] = useState(undefined)

  const [subNavPanelVisible, setSubPanelVisible] = useState(false)
  const refSubPanel = useRef<HTMLDivElement>(null)
  const refNavItemPassword = useRef<HTMLLIElement>(null)

  const visibleModalWindow = useAppSelector(selectorModalWindowVisible)

  const userState = useAppSelector(currentUserState)
  const spinStatus = useAppSelector(state=>state.spiner.status)

  const dispatch = useAppDispatch()
  const navigationLocation = useLocation()
  
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

  const handleShowPanel:MouseEventHandler=(event)=>{
    if((refNavItemPassword.current&&refNavItemPassword.current?.contains(event.target as HTMLElement))||
    (refSubPanel.current&&refSubPanel.current?.contains(event.target as HTMLElement)))
    setSubPanelVisible(true)
  }

  const handleHidePanel:MouseEventHandler=(event)=>{
    if(!(refNavItemPassword.current&&refNavItemPassword.current?.contains(event.target as HTMLElement))||
    !(refSubPanel.current&&refSubPanel.current?.contains(event.target as HTMLElement)))
    setSubPanelVisible(false)
  }

  return (
    <div className='flex h-screen w-screen'>
      {visibleModalWindow&&<ModalWindow><PasswordGroupItem /></ModalWindow>}
      <div 
        className={
          currentVisible?
            'flex flex-col justify-between items-stretch shadow-2xl transition-all':
            'transition-all flex flex-col justify-between items-stretch shadow-2xl bg-white hidden'
        }
      >
        <div>
          <Link className='flex justify-center' to='/'>
            <img
              className='w-[80px] h-[80px] p-[8px]'
              src='/ico/android-chrome-512x512.png'
              alt='logo'
            />
          </Link>

          <nav>
            <ul>
              {
                arrayOfItemsNavMenu.map(
                  (element) => 
                    <li 
                      key={element.title} 
                      //@ts-ignore
                      ref={nodeEl=>element.title==='Passwords'&&(refNavItemPassword.current=nodeEl)} 
                      onMouseEnter={handleShowPanel}
                      onMouseLeave={handleHidePanel}
                      onClick={()=>{
                        if(element.title==='Passwords')
                          dispatch(setPasswordFilterItem({passwordGroup: undefined}))
                      }}
                      className='px-3'
                    >
                      <Link 
                        className={
                          navigationLocation.pathname===element.path?
                          'group text-white text-center':
                          'group transition-all hover:text-hover text-center'
                        } 
                        to={element.path}
                      >
                        <FontAwesomeIcon
                          className={
                            navigationLocation.pathname===element.path?
                            'text-5xl w-[100%]'
                            :
                            `text-5xl w-[100%] 
                            transition-all
                            translate-y-4 
                            group-hover:translate-y-0`
                          }
                          icon={element.icon}
                        />
                        <h2 
                          className={navigationLocation.pathname===element.path?
                            'text-md w-[100%]':
                            `text-md w-[100%] 
                            text-transparent 
                            -translate-y-4 
                            group-hover:translate-y-0 
                            group-hover:text-hover`
                          }
                        >
                          {element.title}
                        </h2>
                      </Link>
                    </li>
                )
              }
            </ul>
          </nav>
        </div>
        
        <div>
          <div onClick={clickLogOut}>
            <div className='group transition-all hover:text-hover text-center cursor-pointer'>
              <FontAwesomeIcon 
                className='text-5xl w-[100%] transition-all translate-y-4 group-hover:translate-y-0' 
                icon={faDoorOpen} />
              <h2 
                className='
                  text-md 
                  w-[100%] 
                  text-transparent 
                  -translate-y-4 
                  transition-all 
                  group-hover:translate-y-0 
                  group-hover:text-hover'
              >
                Log out
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      {
        subNavPanelVisible&&
        <div 
          ref={refSubPanel}
          className='sticky left-0 bg-white/10'
          onMouseEnter={handleShowPanel}
          onMouseLeave={handleHidePanel}
        >
          <SubNavPanelGroups />
        </div>
      }

      <main className='w-[100%] overflow-y-auto'>
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
          {
            spinStatus?
              <Spin />:
              <FontAwesomeIcon
                className=''
                icon={faQuestion}
              />
          }
        </div>
        <div className='p-6 box-border '>
          {children}
        </div>
      </main>
    </div>
  )
}

export default NavPanel
