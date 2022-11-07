import { useLocation, Link } from 'react-router-dom'
import InputSelect from '../components/InputSelect'
import { searchMode } from '../interfaces'
import styles from '../styles/pages/passwordItem.module.css'



const PasswordItem=()=>{

    const {state} = useLocation()
    
    return <div className={styles.wrapper}>
        <label htmlFor="employee">Employee</label>
        <div>
            <InputSelect mode={searchMode.employee} />
            <Link to={'/'}>link to employee</Link>
        </div>

        <label htmlFor="service">Service</label>
        <div>
            <InputSelect mode={searchMode.service} />
            <Link to={'/'}>link to service</Link>
        </div>
        <hr />
        <label htmlFor="loginEmployee">Login</label>
        <input type="text" name="loginEmployee" id="loginEmployee" />
        <label htmlFor="passwordEmployee">Password</label>
        <input type="text" name="passwordEmployee" id="passwordEmployee" />
        
        <textarea name="comment" id="comment" cols={30} rows={10} />
    </div>
}

export default PasswordItem