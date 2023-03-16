import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  faPerson,
  faBellConcierge,
  faBook,
  faDoorOpen,
  faAnglesRight,
  faLock,
  faUserLock,
  IconDefinition,
  faGear,
  faIdCardClip,
  faLayerGroup,
  faCircleInfo,
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
import { Popover, Spin } from 'antd'
import { setPasswordFilterItem } from '../store/passwordFilterSlice'
import menuStyles from '../styles/buttonMenuMobile.module.css'
import { getDarkModeValue } from '../store/darkModeSlice'
import ServiceDescriptionOfUpdate from '../services/ServiceDescriptionOfUpdate'
import ModelUpdate from '../models/ModelUpdete'
import { errorNotificator } from '../utils/notificator'
import { formatDateToStandartDateFormat } from '../utils/dateFunction'

interface iPropsNavPanel {
  children: React.ReactNode,
}

export interface iItemNavMenu {
  icon: IconDefinition,
  title: string,
  path: string,
}

const NavPanel = ({ children }: iPropsNavPanel) => {
  const [currentVisible, setCurrentVisible] = useState(true)
  const [timeoutId, setTimeoutId]: [undefined | string, Function] = useState(undefined)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
  const [updateList, setUpdateList] = useState<ModelUpdate[]>([])

  const [subNavPanelVisible, setSubPanelVisible] = useState(false)
  const refSubPanel = useRef<HTMLDivElement>(null)
  const refNavItemPassword = useRef<HTMLLIElement>(null)

  const visibleModalWindow = useAppSelector(selectorModalWindowVisible)
  const isDarkMode = useAppSelector(getDarkModeValue)

  const userState = useAppSelector(currentUserState)
  const spinStatus = useAppSelector(state=>state.spiner.status)

  const dispatch = useAppDispatch()
  const navigationLocation = useLocation()
  const navigator = useNavigate()

  useEffect(()=>{
    ServiceDescriptionOfUpdate.getChangeList(5).then(
      ({payload})=>{
        setUpdateList(payload)
      }
    ).catch(error=>errorNotificator('Error read update list', error.message))
  },[])

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

  const lastUpdate =(
    <ul className='max-w-[400px]'>
      {updateList.map(element=>
        <li key={formatDateToStandartDateFormat(element.date)}>
          <h3 className='text-lg'>{formatDateToStandartDateFormat(element.date)} {element.title}</h3>
          <p>{element.description}</p>
        </li>  
      )}
      <li>
        <Link 
          className='text-btn dark:text-dlink hover:cursor-pointer'
          to='/update'
        >
          See all
        </Link>
      </li>
    </ul>
  )

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

  const mobileMenu: iItemNavMenu[] = [
    { icon: faIdCardClip, title: 'My profile ('+userState.login+')', path: '/personalSettings' },
    { icon: faPerson, title: 'Employees', path: '/employees' },
    { icon: faBellConcierge, title: 'Servises', path: '/listServises' },
    { icon: faLayerGroup, title: 'Password groups', path: '/passwordsGroupList' },
    { icon: faLock, title: 'Passwords', path: '/passwordsList' },
    { icon: faUserLock, title: 'Users', path: '/users' },
    { icon: faBook, title: 'Log', path: '/changeLog' },
    { icon: faGear, title: 'Settings', path:'/applicationSettings'},
  ]

  const arrayOfItemsNavMenu: iItemNavMenu[] = [
    { icon: faPerson, title: 'Employees', path: '/employees' },
    { icon: faBellConcierge, title: 'Servises', path: '/listServises' },
    { icon: faLock, title: 'Passwords', path: '/passwordsList' },
    { icon: faUserLock, title: 'Users', path: '/users' },
    { icon: faBook, title: 'Log', path: '/changeLog' },
  ]

  return (
    <div className='flex h-full w-full max-sm:flex-col relative overflow-hidden '>
      {visibleModalWindow&&<ModalWindow><PasswordGroupItem /></ModalWindow>}
      {/* mobile menu navigation panel */}
      <div 
        className='
          sm:hidden 
          sticky 
          top-0 
          flex 
          justify-between 
          items-center 
          w-full 
          px-5 
          py-3 
          z-20'
      >
        <Link className='flex justify-center' to='/'>
          <img
            className='w-[30px] h-[30px]'
            src={
              isDarkMode?
                '/ico/android-chrome-light-192x192.png':
                '/ico/android-chrome-192x192.png'
            }
            alt='logo'
          />
        </Link>
        <input
          type='text'
          name='searchString'
          placeholder='fing'
          className='shadow-md border border-main rounded-full px-2'
          onChange={handleChangeSearch}
        />

        <div 
          onClick={()=>setIsMobileMenuActive(!isMobileMenuActive)}
          className={`${menuStyles.container} ${isMobileMenuActive&&menuStyles.active}`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 200 200'>
            <g strokeWidth='6.5' strokeLinecap='round'>
              <path
                d='M72 82.286h28.75'
                fill='#009100'
                fillRule='evenodd'
                stroke={isDarkMode?'#fff':'#000'}
              />
              <path
                d='M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554'
                fill='none'
                stroke={isDarkMode?'#fff':'#000'}
              />
              <path
                d='M72 125.143h28.75'
                fill='#009100'
                fillRule='evenodd'
                stroke={isDarkMode?'#fff':'#000'}
              />
              <path
                d='M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554'
                fill='none'
                stroke={isDarkMode?'#fff':'#000'}
              />
              <path
                d='M100.75 82.286h28.75'
                fill='#009100'
                fillRule='evenodd'
                stroke={isDarkMode?'#fff':'#000'}
              />
              <path
                d='M100.75 125.143h28.75'
                fill='#009100'
                fillRule='evenodd'
                stroke={isDarkMode?'#fff':'#000'}
              />
            </g>
          </svg>
        </div>
      </div>
      {/* mobile menu */}
      <ul 
        className={`
          h-full 
          w-full 
          bg-white 
          dark:bg-dcontainer
          absolute 
          top-0 
          z-10
          transition-all
          duration-500
          text-lg
          text-main
          dark:text-hover
          pt-16
          flex
          flex-col
          items-end
          gap-3
          px-3
          ${!isMobileMenuActive&&'translate-x-full'}
          `}
        >
          {
            mobileMenu.map(element=>
            <li 
              className={`
                flex 
                gap-3 
                items-center
                hover:cursor-pointer
                ${navigationLocation.pathname===element.path&&
                  'text-btn dark:text-dlink'}
              `}
              key={element.path}
              onClick={()=>{
                navigator(element.path)
                setIsMobileMenuActive(false)
              }}
            >
              <span>{element.title}</span>
              <div className='w-6 h-6 flex justify-center items-center'>
                <FontAwesomeIcon
                  icon={element.icon} 
                />
              </div>
            </li>
            )
          }
          <li 
              className={`
                flex 
                gap-3 
                items-center
                hover:cursor-pointer
              `}
              onClick={clickLogOut}
            >
              <span>Log out</span>
              <FontAwesomeIcon  
                icon={faDoorOpen} 
              />
            </li>
      </ul>

      <div 
        className={
          currentVisible?
            'flex flex-col justify-between items-stretch shadow-2xl transition-all dark:text-hover max-sm:hidden':
            'hidden'
        }
      >
        <div>
          <Link className='flex justify-center' to='/'>
            <img
              className='w-[80px] h-[80px] p-[8px]'
              src={
                isDarkMode?
                  '/ico/android-chrome-light-192x192.png':
                  '/ico/android-chrome-192x192.png'
              }
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
                          'group text-white dark:text-dlink text-center':
                          'group transition-all hover:text-hover dark:hover:text-dlink text-center'
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
                            group-hover:text-hover
                            dark:group-hover:text-dlink`
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
          <Link
            to='/applicationSettings'
          >
            <div 
              className='
                group 
                transition-all 
                hover:text-hover 
                dark:hover:text-dlink 
                text-center 
                cursor-pointer'
              >
              <FontAwesomeIcon 
                className='
                  text-5xl 
                  w-[100%] 
                  transition-all 
                  translate-y-4 
                  group-hover:translate-y-0' 
                icon={faGear} />
              <h2 
                className='
                  text-md 
                  w-[100%] 
                  text-transparent 
                  -translate-y-4 
                  transition-all 
                  group-hover:translate-y-0 
                  group-hover:text-hover
                  dark:group-hover:text-dlink'
              >
                Settings
              </h2>
            </div>
          </Link>
          <div onClick={clickLogOut}>
            <div 
              className='
                group 
                transition-all 
                hover:text-hover 
                dark:hover:text-btn-err 
                text-center 
                cursor-pointer'
            >
              <FontAwesomeIcon 
                className='
                  text-5xl 
                  w-[100%] 
                  transition-all 
                  translate-y-4 
                  group-hover:translate-y-0' 
                icon={faDoorOpen} />
              <h2 
                className='
                  text-md 
                  w-[100%] 
                  text-transparent 
                  -translate-y-4 
                  transition-all 
                  group-hover:translate-y-0 
                  group-hover:text-hover
                  dark:group-hover:text-btn-err-hover'
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
          className='sticky left-0 bg-white/10 dark:text-hover'
          onMouseEnter={handleShowPanel}
          onMouseLeave={handleHidePanel}
        >
          <SubNavPanelGroups />
        </div>
      }

      <main className='w-[100%] overflow-y-auto dark:text-hover'>
        <div 
          className='
            flex 
            justify-between 
            items-center 
            pr-5 
            py-2 
            text-md 
            shadow-2xl
            max-sm:hidden'
        >
          <div>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={
                currentVisible
                  ? `transition-all 
                      rotate-180 
                      cursor-pointer 
                      hover:text-hover 
                      dark:text-hover
                      dark:hover:text-dlink`
                  : `transition-all 
                      cursor-pointer 
                      hover:text-hover
                      dark:text-hover
                      dark:hover:text-dlink
                    `
              }
              onClick={hancleOnClickChangeVisible}
            />
            <span 
              className='
                text-main 
                pl-2 
                hover:text-hover 
                dark:hover:text-dlink
                dark:text-hover'
            >
              <Link to='/personalSettings'>{userState.login}</Link>
            </span>
          </div>
          <input
            type='text'
            name='searchString'
            placeholder='fing'
            className='p-2 rounded-full'
            onChange={handleChangeSearch}
          />
          {
            spinStatus?
              <Spin />:
              <Popover
                title='Description of last update'
                content={lastUpdate}
                placement='bottomRight'
              >
                <FontAwesomeIcon
                  className='
                    text-xl 
                    hover:text-btn-hover 
                    dark:hover:text-dbtn-h
                    hover:cursor-pointer'
                  icon={faCircleInfo}
                />
              </Popover>
          }
        </div>
        <div className='p-6 max-sm:p-2 max-sm:pb-10 box-border '>
          {children}
        </div>
      </main>
    </div>
  )
}

export default NavPanel
