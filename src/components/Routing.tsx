import React, { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../pages/Auth';
import { currentUserState } from '../store/slice'
import {useSelector} from 'react-redux'
import NavPanel from './NavPanel';
import Services from '../pages/Services';
import ServiceItem from '../pages/ServiceItem';

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