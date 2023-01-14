import React from 'react'
import styles from '../styles/components/button.module.css'

interface IPropsButton{
    onClick?: React.MouseEventHandler,
    children?: React.ReactNode
}
const Button=({onClick, children}:IPropsButton)=>{
    return(
    <div className={styles.buttonCss} onClick={onClick}>
        {children}
    </div>
    )
}

export default Button