import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomPlaceholderInput from '../components/CustomPlaceholderInput'
import DefaultContainerData from '../components/DefaultContainerData'
import ImageUploader from '../components/ImageUploader'
import { iService } from '../interfaces/modelInterfaces'

const ServiceItem=()=>{
  const [imgBlob, setImgBlob] = useState<Blob>()
  const [inputsData, setInputsData] = useState({} as iService)

  const{servicesId} = useParams()
  const navigator = useNavigate()

  // useEffect(()=>{

  //   if(servicesId !=='new'){ 
  //     axiosInstance.get(`/services/getOne?id=${servicesId}`).then(resultRequest=>{
  //         setName(resultRequest.data.data.name)
  //         setDescription(resultRequest.data.data.description)
  //         setSelectedImage(resultRequest.data.data.img)
  //     })
  //   }
  // }
  // ,[servicesId])

  return(
    <>
      <DefaultContainerData>
        <form className='flex flex-col justify-center items-center gap-5 p-5'>
          <div className='flex justify-center gap-10 p-5'>
            <div className='flex flex-col items-center gap-3'>
              <ImageUploader setBlob={setImgBlob} />
              <button className='
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
              >
                <input 
                  type='text' 
                  name='name'
                  className='shadow-md border w-full rounded-full px-2' 
                />
              </CustomPlaceholderInput>
              
              <CustomPlaceholderInput
                placeholder='Description'
              >
                <textarea 
                  name='description' 
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
    </>
  )
}

export default ServiceItem