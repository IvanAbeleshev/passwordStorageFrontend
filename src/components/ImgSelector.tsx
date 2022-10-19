import axios from 'axios'
import React, { useEffect } from 'react'

interface IPropsImgSelector{
    searchString: string,
    setSelectedImg: Function
}

const ImgSelector=({searchString, setSelectedImg}:IPropsImgSelector)=>{
    useEffect(()=>{

        axios.get(`https://serpapi.com/playground?q=${searchString}&tbm=isch&ijn=0`).then(result=>console.log(result))
    }, [searchString])
    return(
        <div>

        </div>
    )
}

export default ImgSelector