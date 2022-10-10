import React, { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../pages/Auth';
import { currentUserState } from '../store/slice'
import {useSelector} from 'react-redux'

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
        <Route path="/" element={children}/>
        <Route path="auth" element={<Auth/>}/>
        <Route path="invoices" />
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