import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/components/navPanel.module.css'
import {faPerson, faBellConcierge, faBook, faDoorOpen} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'

interface IPropsNavPanel{
    children: React.ReactNode
}

const NavPanel=({children}: IPropsNavPanel)=>{
    const [currentVisible, setCurrentVisible] = useState(false)
    const userState = useSelector(currentUserState)

    const clickLogOut:React.MouseEventHandler=(event)=>{
        event.stopPropagation()
    }
    return (
        <div className={styles.globalWindow}>
            <div className={styles.navPanelActive}>
                <div className={styles.upPart}>
                    <button>back</button>
                    <Link className={styles.logoContainer} to='/'>
                        <img className={styles.logo} src="ico/android-chrome-512x512.png" alt="logo" />
                    </Link>
                    <nav className={styles.navigationContainer}>
                        <ul className={styles.listMenu}>
                            {[{icon: faPerson, title: 'personal', path: '/employee'}, {icon: faBellConcierge, title: 'servises', path: '/sevises'}, {icon: faBook, title: 'log', path: '/log'}].map(element=>
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
                {userState.login}
                </div>
                {children}
            </main>
        </div>
    )
}

export default NavPanel