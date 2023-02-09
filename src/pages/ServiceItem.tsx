import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import ImageUploader from '../components/ImageUploader'
import ImgSelector from '../components/ImgSelector'
import { iService } from '../interfaces/modelInterfaces'
import ServicesOfServices from '../services/ServicesOfServices'

const ServiceItem=()=>{
  const [imgBlob, setImgBlob] = useState<Blob>()
  const [inputsData, setInputsData] = useState({} as iService)
  const [visibleImgSelector, setVisibleImgSelector] = useState(false)

  const{servicesId} = useParams()
  const navigator = useNavigate()

  const changeInputHandler:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(event)=>{
    setInputsData({...inputsData, [event.target.name]:event.target.value})
  }

  const setImageFromSelector=(imgUrl:string)=>{
    setInputsData({...inputsData, img: imgUrl})
  }

  const createService:MouseEventHandler=()=>{
    ServicesOfServices.createItem(inputsData, imgBlob).then(
      ()=>navigator(-1)
    )
  }

  const changeService:MouseEventHandler=()=>{
    ServicesOfServices.changeService(inputsData, imgBlob).then(
      ()=>navigator(-1)
    )
  }

  useEffect(()=>{
    if(servicesId !=='new'){ 
      ServicesOfServices.getServiceItem(servicesId).then(
        ({payload})=>setInputsData(payload)
      )
    }
  },[servicesId])

  return(
    <>
      <DefaultContainerData>
        <form 
          onSubmit={event=>event.preventDefault()}
          className='flex flex-col justify-center items-center gap-5 p-5'
        >
          <div className='flex justify-center gap-10 p-5'>
            <div className='flex flex-col items-center gap-3'>
              <ImageUploader urlImg={inputsData.img} setBlob={setImgBlob} />
              <button 
                onClick={()=>setVisibleImgSelector(true)}
                className='
                  py-2 
                  px-6 
                  rounded-xl 
                  shadow-md 
                  bg-btn 
                  text-hover
                  hover:bg-btn-hover 
                  hover:cursor-pointer' >
                Select from net
              </button>
            </div>
            <div className='flex flex-col gap-7 pt-2'>
              <CustomPlaceholderInput
                placeholder='Name'
                value={inputsData.name}
              >
                <input 
                  autoComplete='off'
                  type='text' 
                  name='name'
                  value={inputsData.name}
                  onChange={changeInputHandler}
                  className='shadow-md border w-full rounded-full px-2' 
                />
              </CustomPlaceholderInput>
              
              <CustomPlaceholderInput
                placeholder='Description'
                value={inputsData.description}
              >
                <textarea 
                  autoComplete='off'
                  name='description' 
                  value={inputsData.description}
                  onChange={changeInputHandler}
                  cols={30} 
                  rows={7} 
                  className='shadow-md border w-full rounded-xl px-2' 
                />
              </CustomPlaceholderInput>
            </div>
          </div>
          <div className='pt-5 flex gap-10 text-hover'>
            <input 
              onClick={event=>{
                event.preventDefault()
                navigator(-1)
              }}
              type='button' 
              value='Back' 
              className='
                py-2 
                px-6 
                rounded-xl 
                shadow-md 
                bg-btn-s 
                hover:bg-btn-s-hover 
                hover:cursor-pointer'
            />
            {servicesId==='new'?
              <input 
                onClick={createService}
                type='button' 
                value='Create' 
                className='
                  py-2 
                  px-6 
                  rounded-xl 
                  shadow-md 
                  bg-btn 
                  hover:bg-btn-hover 
                  hover:cursor-pointer' 
              />:
              <input 
                onClick={changeService}
                type='button' 
                value='Save changes' 
                className='
                  py-2 
                  px-6 
                  rounded-xl 
                  shadow-md 
                  bg-btn 
                  hover:bg-btn-hover 
                  hover:cursor-pointer' 
              />
            }
          </div>
        </form>
      </DefaultContainerData>
      {
        visibleImgSelector&&
          <ImgSelector 
            setUrl={setImageFromSelector}
            setVisibleSelector={setVisibleImgSelector} 
            searchString={inputsData.name} 
          />
      }
    </>
  )
}

export default ServiceItem