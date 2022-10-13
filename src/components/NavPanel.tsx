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
    return (
        <div className={styles.globalWindow}>
            <div className={styles.navPanel}>
                <div className={styles.upPart}>
                    <button>back</button>
                    <Link className={styles.logoContainer} to='/'>
                        <img className={styles.logo} src="ico/android-chrome-512x512.png" alt="logo" />
                    </Link>
                    <nav className={styles.navigationContainer}>
                        <ul className={styles.listMenu}>
                            <li>
                                <Link className={styles.link} to='/employee'>
                                    <FontAwesomeIcon className={styles.icon} icon={faPerson} />
                                    <h2>personal</h2>
                                </Link>
                            </li>
                            <li>
                                <Link to='/servises'>
                                    <FontAwesomeIcon icon={faBellConcierge} />
                                    <h2>servises</h2>
                                </Link>
                            </li>
                            <li>
                                <Link to='/log'>
                                    <FontAwesomeIcon icon={faBook} />
                                    <h2>log</h2>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="downPArt">
                    <Link to='/log'>
                        <FontAwesomeIcon icon={faDoorOpen} />
                        <h2>logOut</h2>
                    </Link>
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