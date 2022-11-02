import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/components/navPanel.module.css'
import {faPerson, faBellConcierge, faBook, faDoorOpen, faAnglesRight, faQuestion} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserState, setInitialState } from '../store/slice'
import { setValue } from '../store/sliceSearch'

interface IPropsNavPanel{
    children: React.ReactNode
}

const NavPanel=({children}: IPropsNavPanel)=>{
    const [currentVisible, setCurrentVisible] = useState(true)
    const userState = useSelector(currentUserState)

    const dispatch = useDispatch()
    const clickLogOut:React.MouseEventHandler=(event)=>{
        event.stopPropagation()
        dispatch(setInitialState())
    }

    const hancleOnClickChangeVisible:React.MouseEventHandler=(event)=>{
        setCurrentVisible(!currentVisible)
    }

    const handleChangeSearch:React.ChangeEventHandler=(event)=>{
        const target = event.target as HTMLInputElement
        dispatch(setValue(target.value))
    }

    return (
        <div className={styles.globalWindow}>
            <div className={`${styles.navPanel} ${currentVisible?styles.navPanelActive:styles.navPanelDisaple}`}>
                <div className={styles.upPart}>
                    <Link className={styles.logoContainer} to='/'>
                        <img className={styles.logo} src="ico/android-chrome-512x512.png" alt="logo" />
                    </Link>
                    <nav className={styles.navigationContainer}>
                        <ul className={styles.listMenu}>
                            {[{icon: faPerson, title: 'Employees', path: '/employees/1'}, {icon: faBellConcierge, title: 'servises', path: '/listServises/1'}, {icon: faBook, title: 'log', path: '/log'}].map(element=>
                                <li className={styles.listItem} key={element.title}>
                                    <Link className={styles.link} to={element.path}>
                                        <FontAwesomeIcon className={styles.icon} icon={element.icon} />
                                        <h2 className={styles.titleItem}>{element.title}</h2>
                                    </Link>
                                </li>    
                            )}
                        </ul>
                    </nav>
                </div>
                <div className={styles.downPart}>
                    <div className={styles.listItem} onClick={clickLogOut}>
                        <div className={styles.link}>
                            <FontAwesomeIcon className={styles.icon} icon={faDoorOpen} />
                            <h2 className={styles.titleItem}>logOut</h2>
                        </div>    
                    </div>
                </div>
            </div>
        
            <main className={styles.mainContainer}>
                <div className={styles.statusPanel}>
                    <div>
                        <FontAwesomeIcon icon={faAnglesRight} className={`${styles.buttonChangeVisibeNavigation} ${currentVisible?styles.buttonChangeVisibeNavigationHide:styles.buttonChangeVisibeNavigationShow}`} onClick={hancleOnClickChangeVisible} />
                        {userState.login}
                    </div>
                    <input type="text" name="searchString" id="searchString" placeholder='fing' onChange={handleChangeSearch}/>
                    <FontAwesomeIcon className={styles.buttonChangeVisibeNavigation} icon={faQuestion} />
                </div>
                <div className={`${styles.childrenContainer} ${currentVisible?styles.childrenContainerAcvtivePanel:styles.childrenContainerDisablePanel}`}>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default NavPanel