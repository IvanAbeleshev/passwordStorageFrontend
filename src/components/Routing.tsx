import React, { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from '../pages/Auth';

interface IPropsRouting{
    children: ReactNode
}

const Routing = ({children}: IPropsRouting) =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={children}/>
            <Route path="auth" element={<Auth/>}/>
            <Route path="invoices" />
        </Routes>
        </BrowserRouter>
    );
}

export default Routing