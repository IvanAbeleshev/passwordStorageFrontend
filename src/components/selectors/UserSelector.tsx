import { faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { iUser } from '../../interfaces/modelInterfaces'
import ServiceUser from '../../services/ServiceUser'
import CustomPlaceholderInput from '../CustomPlaceholderInput'

interface iSelectedUser{
  value?: iUser,
  label: string
}

interface iPropsUserSelector{
  validation?: boolean,
  selectedUser?: iUser,
  setSelectedService: Function
}

const UserSelector=({validation=false, setSelectedService, selectedUser}:iPropsUserSelector)=>{
  const [findedData, setFindedData] = useState<iUser[]>([])
  const [countOfFinded, setCountOfFinded] = useState(0)
  const [value, setValue] = useState<iSelectedUser>({label:''})
  const [keyTimeout, setKeyTimeout] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(selectedUser)
      setValue({value:selectedUser, label: selectedUser.login})
  },[selectedUser])

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
            ServiceUser.getUsersForSelector(value.label).then(
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

  const selectElement=(item:iUser)=>{
    setValue({value:item, label: item.login})
    setSelectedService(item)
  }

  const cleanValue:MouseEventHandler=()=>{
    setValue({value:undefined, label:''})
    setFindedData([])
    setSelectedService()
  }

  return (
    <div className='flex items-end w-full'>
      <div
        className='relative w-full'
      >
        {value.value&&
          <Popover 
            placement='top' 
            title={value.value.login} 
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
              href={`/userItem/${value.value.id}`}
              target={'_blank'}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
              />
            </a>
          </Popover>
        }
        <CustomPlaceholderInput
          placeholder='Select user'
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
              <span className=''>{element.login}</span>
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

export default UserSelector