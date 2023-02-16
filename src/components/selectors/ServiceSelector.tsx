import { faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { iService } from '../../interfaces/modelInterfaces'
import ServicesOfServices from '../../services/ServicesOfServices'
import CustomPlaceholderInput from '../CustomPlaceholderInput'
import SecureImage from '../SecureImage'

interface iSelectedSevice{
  value?: iService,
  label: string
}

interface iPropsServiceSelector{
  validation?: boolean,
  selectedService?: iService,
  setSelectedService: Function
}

const ServiceSelector=({validation=false, setSelectedService, selectedService}:iPropsServiceSelector)=>{
  const [findedData, setFindedData] = useState<iService[]>([])
  const [countOfFinded, setCountOfFinded] = useState(0)
  const [value, setValue] = useState<iSelectedSevice>({label:''})
  const [keyTimeout, setKeyTimeout] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const previewImg={
    maskClassName:'rounded-full'
  }

  useEffect(()=>{
    if(selectedService)
      setValue({value:selectedService, label: selectedService.name})
  },[selectedService])

  useEffect(()=>{
    const clickHandle=(event:MouseEvent)=>{
      if(wrapperRef.current&&!wrapperRef.current.contains(event.target as HTMLElement))
        setFindedData([])
    }

    window.addEventListener('click', clickHandle)
    return ()=>window.removeEventListener('click', clickHandle)
  },[])

  useEffect(()=>{
    if(value.label){
      clearTimeout(keyTimeout)
      setKeyTimeout(
        setTimeout(
          ()=>{
            ServicesOfServices.getServicesForSelector( value.label).then(
              ({payload, countOfFinded})=>{
                setFindedData(payload.map(item=>item.getStructureData()))
                setCountOfFinded(countOfFinded)
              }
            )
          }, 
          800
        )
      )
    }
  // eslint-disable-next-line 
  },[value.label])

  useEffect(()=>{
    if(value.value){
      setSelectedService(value.value)
    }
  // eslint-disable-next-line 
  },[value.value])

  const changeInput:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setValue({value:undefined, label:event.target.value})
    setFindedData([])
    setSelectedService()
  }

  const selectElement=(item:iService)=>{
    setValue({value:item, label: item.name})
    setSelectedService(item)
  }

  const cleanValue:MouseEventHandler=()=>{
    setValue({value:undefined, label:''})
    setFindedData([])
    setSelectedService()
  }

  return (
    <div className='flex items-end w-full'>
      {value.value&&
        <SecureImage
          preview={previewImg}
          className='rounded-full'
          src={value.value?.img}
          width={40}
          height={40}
          loading='lazy'
        />
      }
      <div
        className='relative w-full'
      >
        {value.value&&
          <Popover 
            placement='top' 
            title={value.value.name} 
            content={'open in new tab'}
          >
            <a 
              className='
                absolute 
                text-main 
                right-2 
                top-0 
                z-10
                hover:text-btn-hover
                '
              rel='noreferrer'
              href={`/service/${value.value.id}`}
              target={'_blank'}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
              />
            </a>
          </Popover>
        }
        <CustomPlaceholderInput
          placeholder='Select service'
          value={value.label}
        >
          <input 
            className={`
              shadow-md 
              border 
              w-full 
              rounded-full 
              px-2
              ${validation&&!value.value?'bg-btn-err':'bg-white'}
            `}
            value={value?.label}
            onChange={changeInput}
            autoComplete='off'
            type='text' 
          />
        </CustomPlaceholderInput>
      {
        findedData.length>0&&!value.value&&value.label&&
        <div 
          ref={wrapperRef}
          className='
            table-row-group 
            absolute 
            shadow-md 
            shadow-main 
            border 
            w-full 
            rounded-xl 
            px-2 
            z-10 
            bg-hover
          '
        >
          {findedData.map(element=>
            <div
              key={element.id}
              onClick={()=>selectElement(element)}
              className='w-full hover:bg-main hover:text-hover rounded-full'
            >
              <SecureImage 
                className='rounded-full'
                preview={false}
                src={element.img}
                width={40}
                height={40}
                loading='lazy'
              />
              <span className=''>{element.name}</span>
            </div>  
          )}
          {findedData.length>countOfFinded&&
            <div>And other {countOfFinded-findedData.length} items</div>
          }
        </div>
      }
      </div>
      {value.value&&
        <div 
          className='text-xl pl-1 hover:cursor-pointer hover:text-btn-err'
          onClick={cleanValue}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
          />
        </div>
      }
    </div>
  )
}

export default ServiceSelector