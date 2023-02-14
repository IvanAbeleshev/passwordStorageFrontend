
import { faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image, Popover } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { iPasswordGroup } from '../../interfaces/modelInterfaces'
import ServicePasswordGroup from '../../services/ServicePasswordGroup'
import CustomPlaceholderInput from '../CustomPlaceholderInput'

interface iSelectedGroup{
  value?: iPasswordGroup,
  label: string
}

interface iPropsGroupSelector{
  validation?: boolean,
  selectedPasswordGroup?: iPasswordGroup,
  setSelectedGroup: Function
}

const GroupSelector=({validation=false, setSelectedGroup, selectedPasswordGroup}:iPropsGroupSelector)=>{
  const [findedData, setFindedData] = useState<iPasswordGroup[]>([])
  const [countOfFinded, setCountOfFinded] = useState(0)
  const [value, setValue] = useState<iSelectedGroup>({label:''})
  const [keyTimeout, setKeyTimeout] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const previewImg={
    maskClassName:'rounded-full'
  }

  useEffect(()=>{
    if(selectedPasswordGroup)
      setValue({value:selectedPasswordGroup, label: selectedPasswordGroup.name})
  },[selectedPasswordGroup])

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
            ServicePasswordGroup.getGroupsForSelect(value.label).then(
              ({payload, countOfFinded})=>{
                setFindedData(payload.map(item=>item.getStucturedData()))
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
      setSelectedGroup(value.value)
    }
  // eslint-disable-next-line 
  },[value.value])

  const changeInput:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setValue({value:undefined, label:event.target.value})
    setFindedData([])
    setSelectedGroup()
  }

  const selectElement=(item:iPasswordGroup)=>{
    setValue({value:item, label: item.name})
    setSelectedGroup(item)
  }

  const cleanValue:MouseEventHandler=()=>{
    setValue({value:undefined, label:''})
    setFindedData([])
    setSelectedGroup()
  }

  return (
    <div className='flex items-end w-full'>
      {value.value&&
        <Image
          preview={previewImg}
          className='rounded-full'
          src={value.value.icon}
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
            <div 
              className='
                absolute 
                text-main 
                right-2 
                top-0 
                z-10
                hover:text-btn-hover
                '
              //rel='noreferrer'
              //href={`/service/${value.value.id}`}
              //target={'_blank'}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
              />
            </div>
          </Popover>
        }
        <CustomPlaceholderInput
          placeholder='Select group'
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
              <Image 
                className='rounded-full'
                preview={false}
                src={element.icon}
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

export default GroupSelector