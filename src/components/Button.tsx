import React from 'react'
import styles from '../styles/components/button.module.css'

interface IPropsButton{
    title: string,
    onClick: React.MouseEventHandler
}
const Button=({title, onClick}:IPropsButton)=>{
    return(
    <div className={styles.buttonCss} onClick={onClick}>
        {title}
    </div>
    )
}

export default Button