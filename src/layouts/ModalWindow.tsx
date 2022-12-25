import React from 'react'
import styles from '../styles/modalWindow.module.css'

interface IPropsModalWindow{
    children: React.ReactNode,
    setVisible: Function
}
const ModalWindow = ({children, setVisible}: IPropsModalWindow) =>{
    const handleOcClickBackground: React.MouseEventHandler = (event) =>{
        setVisible(false)
    }

    const handleDataContainerOnClick: React.MouseEventHandler = (event) =>{
        event.stopPropagation()    
    }

    return(
        <div className={styles.backgroundLayout} onClick={handleOcClickBackground}>
            <div className={styles.containerData} onClick={handleDataContainerOnClick}>
                {children}
            </div>
        </div>
    ) 
}

export default ModalWindow