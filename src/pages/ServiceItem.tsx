import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ModalWindow from '../components/ModalWindow'
import ImgSelector from '../components/ImgSelector'

enum componentMode{
    creating = 'creating',
    reading = 'reading'
}

const ServiceItem=()=>{
    const [renderMode, setRenderMode] = useState(componentMode.creating)
    
    const [selectedImage, setSelectedImage] = useState('/img/NoImage.jpg')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [visibleModalWindow, setVisibleModalWindow] = useState(false)

    const{servicesId} = useParams()

    useEffect(()=>{
        const regularExpression = new RegExp('ab+c')
        if(servicesId !=='new'){
            setRenderMode(componentMode.reading)
        }
    }
    ,[servicesId])

    const creatingMode = (
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={name} onChange={(event)=>setName(event.target.value)}/>

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" value={description} onChange={(event)=>setDescription(event.target.value)} />
            
            <img src={selectedImage} alt="image" onClick={()=>setVisibleModalWindow(true)}/>
            {visibleModalWindow&&<ModalWindow setVisible={setVisibleModalWindow}><ImgSelector searchString='apple' setSelectedImg={setSelectedImage} /></ModalWindow>}
        </form>)
    return(<>
        {renderMode === componentMode.creating ?creatingMode:<h1>its page for see element</h1>}
    </>
    )
}

export default ServiceItem