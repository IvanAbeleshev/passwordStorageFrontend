import { Image, ImageProps } from 'antd'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../constans'
import ServiceSecureImage from '../services/ServiceSecureImage'

const SecureImage=(props:ImageProps)=>{
  const [img, setImg] = useState<string>()
  const {src, ...otherProps} = props
  useEffect(()=>{
    if(props.src&&props.src.includes(BACKEND_URL)){
      ServiceSecureImage.getImage(props.src).then(result=>{
        setImg(URL.createObjectURL(result))
      })
    }else{
      setImg(props.src)
    }

  },[props.src])

  return(
    <Image src={img} {...otherProps} />
  )
}

export default SecureImage