import React from 'react'
import styles from '../styles/pages/auth.module.css'

const Auth = () =>{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>wellcome to passwords storage</h1>
            <h3 className={styles.description}>Create new admin user</h3>
            <form>
                <div className={styles.containterLabelsAndInputs}>

                    <div className={styles.containerLabelAndInput}>
                        <label className={styles.label} htmlFor="login">login:</label>
                        <input className={styles.input} type="text" name="login" id="login" />
                    </div>
                        
                    <div className={styles.containerLabelAndInput}>
                        <label className={styles.label} htmlFor="password">password:</label>
                        <input className={styles.input} type="password" name="password" id="password" />
                    </div>
                    <div className={styles.submitContainer}>
                        <input className={styles.submitButton} type="submit" value="Register" />
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default Auth