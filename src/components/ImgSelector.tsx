import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { MouseEventHandler, useEffect, useState } from 'react'
import { API_KEY_UNSPLASH } from '../constans'
import CustomPlaceholderInput from './CustomPlaceholderInput'

interface iPropsImgSelector{
  searchString: string,
  setSelectedImg: Function
}

interface IResultImgRequest{
  urls:{
    regular:string
  }
}

const ImgSelector=({ searchString, setSelectedImg }:iPropsImgSelector)=>{
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

  const clickFindButton:MouseEventHandler=()=>{
    fulfillRequest()
  }

  return(
    <div>
      <form 
        onSubmit={event=>event.preventDefault()}
        className='relative'
      >
        <CustomPlaceholderInput
          placeholder='Search'
        >
          <input 
            type='text' 
            name='query'
            value={findRequest} 
            onChange={event=>setFindRequest(event.target.value)}
            className='shadow-md border w-full rounded-full px-2'
          />
        </CustomPlaceholderInput>
        <button 
          type='submit' 
          className='absolute top-0 right-5'
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div className='p-5'>

      </div>
    </div>
  )
}

export default ImgSelector