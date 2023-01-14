import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_KEY_UNSPLASH } from '../constans'
import styles from '../styles/components/imgSelector.module.css'
import Button from './Button'

interface IPropsImgSelector{
    searchString: string,
    setSelectedImg: Function
}

interface IResultImgRequest{
    urls:{
        regular:string
    }
}

const ImgSelector=({searchString, setSelectedImg}:IPropsImgSelector)=>{
    const [arrayImgs, setArrayImgs]:[IResultImgRequest[] | undefined, Function] = useState()
    const [findRequest, setFindRequest] = useState(searchString)

    
    const fulfillRequest=()=>{
        if(findRequest.length===0){
            return
        }
        const config = {
            headers: {
              'Authorization': 'Client-ID ' + API_KEY_UNSPLASH
            }
          }
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${findRequest.replaceAll(' ','-')}&per_page=9`, config).then(request=>
        {            
            if(request.status === 200){
                setArrayImgs(request.data.results)
            }
        })
    }

    useEffect(()=>{
        fulfillRequest()    
    }, [searchString])

    const clickFindButton:React.MouseEventHandler=()=>{
        fulfillRequest()
    }

    return(
        <div className={styles.dataContainer}>
            <div className={styles.inputContainer}>
                <input type="text" name="searchString" id="searchString" value={findRequest} onChange={event=>setFindRequest(event.target.value)} />
                <Button onClick={clickFindButton}><h3>find</h3></Button>
            </div>
            <div className={styles.wrapper}>
                {arrayImgs?.map(element=><img onClick={()=>setSelectedImg(element.urls.regular)} key={element.urls.regular} className={styles.imgBox} src={element.urls.regular}/>)}
            </div>
        </div>
    )
}

export default ImgSelector