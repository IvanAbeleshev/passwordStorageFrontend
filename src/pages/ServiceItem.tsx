import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ModalWindow from '../components/ModalWindow'
import ImgSelector from '../components/ImgSelector'
import styles from '../styles/pages/serviceItem.module.css'
import Button from '../components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../constans'
import { useSelector } from 'react-redux'
import { currentUserState } from '../store/slice'

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
    const userState = useSelector(currentUserState)
    const navigator = useNavigate()

    useEffect(()=>{
        const regularExpression = new RegExp('ab+c')
        if(servicesId !=='new'){
            setRenderMode(componentMode.reading)
        }
    }
    ,[servicesId])

    useEffect(()=>{
        if(visibleModalWindow){
            setVisibleModalWindow(false)
        }
    }
    ,[selectedImage])

    const createNew:React.MouseEventHandler=(event)=>{
        
        const sendingData = {name, description, img: selectedImage}
        const config = {
            headers: {
              'Authorization': 'Bearer ' + userState.token
            }
          }
        axios.post(`${BACKEND_URL}/services/createOne`, sendingData, config).then(replyRequest =>{
            if(replyRequest.status === 200){
                navigator(-1)
            }
        }).catch(error=>{
            console.log(error)
                if(axios.isAxiosError(error)){
                    alert(error.response?.data.message)
                }
            })
    }

    const creatingMode = (
        <form className={styles.dataContainer}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={name} onChange={(event)=>setName(event.target.value)}/>

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" value={description} onChange={(event)=>setDescription(event.target.value)} />
            
            <img className={styles.imgBox} src={selectedImage} alt="image" onClick={()=>setVisibleModalWindow(true)}/>
            {visibleModalWindow&&<ModalWindow setVisible={setVisibleModalWindow}><ImgSelector searchString={name} setSelectedImg={setSelectedImage} /></ModalWindow>}
            
            <Button title='Create new' onClick={createNew} />
        </form>)
    return(<>
        {renderMode === componentMode.creating ?creatingMode:<h1>its page for see element</h1>}
    </>
    )
}

export default ServiceItem