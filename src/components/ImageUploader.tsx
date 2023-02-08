import { Image, Upload, UploadFile, UploadProps } from 'antd'
import { MouseEventHandler, useEffect, useState } from 'react'

interface iPropsImageUploader{
  setBlob: Function
  urlImg?: string
}

const ImageUploader=({ setBlob, urlImg }:iPropsImageUploader)=>{
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(()=>{
    if(urlImg)
      setPreviewImage(urlImg)
  },[urlImg])

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setPreviewImage(URL.createObjectURL(file))
      setFileList([file])
      setBlob(file as Blob)
      return false
    },
    fileList,
  }

  const removeFile:MouseEventHandler=()=>{
    setPreviewImage('')
    setFileList([])
  }

  const previewImg={
    maskClassName:'rounded-full'
  }
  return(
    <div className='p-3'>
      {
        previewImage===''?
        <Upload {...props}>
          <button 
            className='
              transition-all 
              border-8 
              border-btn 
              h-[150px] 
              w-[150px] 
              rounded-full 
              shadow-xl 
              hover:border-btn-hover'
          >
            upload
          </button>
        </Upload>:
        <div className='flex'>
          <Image
            className='rounded-full'
            width={150}
            height={150}
            src={previewImage}
            preview={previewImg}
          />
          <span 
            className='
              text-xl 
              p-1 
              rounded-md 
              h-8 
              w-8 
              text-center 
              hover:cursor-pointer 
              hover:text-hover 
              hover:bg-main/80'
            onClick={removeFile}
          >
            X
          </span>
        </div>
      }
    </div>
  )
}

export default ImageUploader