import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image } from 'antd'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import ServiceUnsplash from '../services/ServiceUnsplash'
import CustomPlaceholderInput from './CustomPlaceholderInput'
import DefaultContainerData from './DefaultContainerData'

interface iPropsImgSelector{
  searchString: string,
  setVisibleSelector: Function,
  setUrl: Function
}
const ImgSelector=({ searchString, setVisibleSelector, setUrl }:iPropsImgSelector)=>{
  const [arrayImgs, setArrayImgs] = useState<string[]>([])
  const [findRequest, setFindRequest] = useState(searchString)

  const executeRequest=useCallback(()=>{
    ServiceUnsplash.getImage(findRequest).then(
      ({payload})=>setArrayImgs(payload)
    )
  },[findRequest])
  
  useEffect(()=>{
    executeRequest()
  },[executeRequest])
  
  const submitSearchForm:FormEventHandler<HTMLElement>=(event)=>{
    event.preventDefault()
    executeRequest()
  }

  return(
    <div
      className='
        absolute 
        top-0 
        left-0 
        h-screen 
        w-screen 
        bg-main/70 
        flex 
        justify-center 
        items-center'
    >
      <DefaultContainerData>
        <div className='relative'>
          <button 
            onClick={()=>setVisibleSelector(false)}
            className='
              group 
              transition-all 
              flex 
              justify-center 
              items-center 
              absolute 
              right-3 
              top-3 
              border-2 
              p-1 
              w-7 
              h-7 
              rounded-md 
              border-black 
              hover:rounded-full 
              hover:bg-btn-err-hover'
          >
            <FontAwesomeIcon 
              className='transition-all group-hover:rotate-180' 
              icon={faXmark} 
            /> 
          </button>
          <h1 className='text-2xl text-center'>Select image by search query</h1>
          <form 
            onSubmit={submitSearchForm}
            className='relative mt-10'
          >
            <CustomPlaceholderInput
              placeholder='Search'
              value={findRequest}
            >
              <input 
                autoComplete='off'
                type='text' 
                name='query'
                value={findRequest} 
                onChange={event=>setFindRequest(event.target.value)}
                className='shadow-md border w-full rounded-full px-2'
              />
            </CustomPlaceholderInput>
            <button 
              type='submit' 
              className='absolute top-0 right-3'
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div className='grid grid-cols-3 gap-8 p-3 mt-5 place-items-center'>
            {
              arrayImgs.map((item)=>
                <Image 
                  onClick={()=>{
                    setUrl(item)
                    setVisibleSelector(false)
                  }}
                  key={item}
                  className='
                    transition 
                    rounded-full 
                    hover:scale-110 
                    hover:cursor-pointer 
                    shadow-md 
                    shadow-main'
                  preview={false} 
                  src={item} 
                  alt='logo_candidat' 
                  loading='lazy' 
                  width={200} 
                  height={200} 
                />
              )
            }
          </div>
        </div>
      </DefaultContainerData>
    </div>
  )
}

export default ImgSelector