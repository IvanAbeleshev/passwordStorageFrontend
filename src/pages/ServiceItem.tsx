import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

enum componentMode{
    creating = 'creating',
    reading = 'reading'
}

const ServiceItem=()=>{
    const [renderMode, setRenderMode] = useState(componentMode.creating)
    const{servicesId} = useParams()

    useEffect(()=>{
        const regularExpression = new RegExp('ab+c')
        if(servicesId !=='new'){
            setRenderMode(componentMode.reading)
        }
    }
    ,[servicesId])

    return(
        <h1>its page for see or create new element</h1>
    )
}

export default ServiceItem