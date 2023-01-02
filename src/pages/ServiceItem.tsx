import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ModalWindow from '../layouts/ModalWindow'
import ImgSelector from '../components/ImgSelector'
import Button from '../components/Button'

import generallyStyles from '../styles/generallyStyles.module.css'
import axiosInstance, { defaultErrorHandler } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import { hideModalWindow, selectorModalWindowVisible, showModalWindow } from '../store/modalWindowSlice'


enum componentMode{
    creating = 'creating',
    reading = 'reading'
}

const ServiceItem=()=>{
    const [renderMode, setRenderMode] = useState(componentMode.creating)
    
    const [selectedImage, setSelectedImage] = useState('/img/NoImage.jpg')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const{servicesId} = useParams()
    const navigator = useNavigate()

    const dispatch = useDispatch()
    const modalWindowVisible = useSelector(selectorModalWindowVisible)

    useEffect(()=>{

        if(servicesId !=='new'){
            
            setRenderMode(componentMode.reading)
            axiosInstance.get(`/services/getOne?id=${servicesId}`).then(resultRequest=>{
                setName(resultRequest.data.data.name)
                setDescription(resultRequest.data.data.description)
                setSelectedImage(resultRequest.data.data.img)
            })
        }
    }
    ,[servicesId])

    useEffect(()=>{
        if(modalWindowVisible){
            dispatch(hideModalWindow())
        }
    }
    ,[selectedImage])

    const createNew:React.MouseEventHandler=(event)=>{
        
        const sendingData = {name, description, img: selectedImage}

        axiosInstance.post(`/services/createOne`, sendingData).then(replyRequest =>{
            navigator(-1)
        }).catch(defaultErrorHandler)
    }

    const saveChanges=()=>{
        const sendingData = {name, description, img: selectedImage}
  
        axiosInstance.post(`/services/update?id=${servicesId}`, sendingData).then(replyRequest =>{
            navigator(-1)
        }).catch(defaultErrorHandler)
    }
    const creatingMode = (
        <form className={generallyStyles.wrapper}>
            <div className={generallyStyles.flexRowSpaceBetween}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={name} onChange={(event)=>setName(event.target.value)}/>
            </div>

            <div className={generallyStyles.flexRowSpaceBetween}>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" value={description} onChange={(event)=>setDescription(event.target.value)} />
            </div>
            
            <img className={generallyStyles.imgLarge} src={selectedImage} alt="image" onClick={()=>dispatch(showModalWindow())}/>
            {modalWindowVisible&&<ModalWindow><ImgSelector searchString={name} setSelectedImg={setSelectedImage} /></ModalWindow>}
            
            <Button onClick={createNew}>Create new</Button>
        </form>)

    const editMode = (
        <form className={generallyStyles.wrapper}>
            <div className={generallyStyles.flexRowSpaceBetween}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={name} onChange={(event)=>setName(event.target.value)}/>
            </div>

            <div className={generallyStyles.flexRowSpaceBetween}>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" value={description} onChange={(event)=>setDescription(event.target.value)} />
            </div>
            
            <img className={generallyStyles.imgLarge} src={selectedImage} alt="image" onClick={()=>dispatch(hideModalWindow())}/>
            {modalWindowVisible&&<ModalWindow><ImgSelector searchString={name} setSelectedImg={setSelectedImage} /></ModalWindow>}
            
            <Button onClick={saveChanges}>Save changes</Button>
        </form>        
    )
    return(<>
        {renderMode === componentMode.creating ?creatingMode:editMode}
    </>
    )
}

export default ServiceItem