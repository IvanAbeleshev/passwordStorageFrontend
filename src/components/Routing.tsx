import React, { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../pages/Auth';
import { currentUserState } from '../store/slice'
import {useSelector} from 'react-redux'
import NavPanel from './NavPanel';
import Services from '../pages/Services';
import ServiceItem from '../pages/ServiceItem';
import EmployeesList from '../pages/EmployeesList';
import EmployeeItem from '../pages/EmployeeItem';
import PasswordsList from '../pages/PasswordsList';
import PasswordItem from '../pages/PasswordItem';

interface IPropsRouting{
    children: ReactNode
}

const Routing = ({children}: IPropsRouting) =>{
    const {authState} = useSelector(currentUserState)

    const pathBeforeLogin = (<>
    <Route path="auth" element={<Auth/>}/>
    <Route
        path="*"
        element={<Navigate to="/auth" replace />}
    />
    </>)

    const pathAfterLogin = (<>
        <Route path="/" element={<NavPanel>{children}</NavPanel>}/>
        <Route path="auth" element={<Navigate to="/" replace />}/>

        <Route path="listServises" element={<NavPanel><Services/></NavPanel>} >
            <Route path=":servicesId" element={<NavPanel><Services/></NavPanel>} />
        </Route>
        <Route path="service" element={<NavPanel><ServiceItem/></NavPanel>} >
            <Route path=":servicesId" element={<NavPanel><ServiceItem/></NavPanel>} />
        </Route>

        <Route path='employees' element={<NavPanel><EmployeesList/></NavPanel>}>
            <Route path=":pageIndex" element={<NavPanel><EmployeesList/></NavPanel>} />
        </Route>
        <Route path='employeeItem'>
            <Route path=":id" element={<NavPanel><EmployeeItem/></NavPanel>} />
        </Route>

        <Route path='passwordsList' element={<NavPanel><PasswordsList/></NavPanel>}>
            <Route path=":pageIndex" element={<NavPanel><PasswordsList/></NavPanel>} />
        </Route>
        <Route path='passwordItem' element={<NavPanel><PasswordItem/></NavPanel>}>
            <Route path=":id" element={<NavPanel><PasswordItem/></NavPanel>} />
        </Route>
        
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
        </>)
    return(
        <BrowserRouter>
        <Routes>
            {authState?pathAfterLogin:pathBeforeLogin}
        </Routes>
        </BrowserRouter>
    );
}

export default Routing