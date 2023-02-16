
import { faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd'
import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { iEmployee } from '../../interfaces/modelInterfaces'
import ServiceEmployee from '../../services/ServiceEmployee'
import CustomPlaceholderInput from '../CustomPlaceholderInput'
import SecureImage from '../SecureImage'

interface iSelectedEmployee{
  value?: iEmployee,
  label: string
}

interface iPropsEmployeeSelector{
  validation?: boolean,
  selectedEmployee?: iEmployee,
  setSelectedEmployee: Function
}

const EmployeeSelector=({validation=false, setSelectedEmployee, selectedEmployee}:iPropsEmployeeSelector)=>{
  const [findedData, setFindedData] = useState<iEmployee[]>([])
  const [countOfFinded, setCountOfFinded] = useState(0)
  const [value, setValue] = useState<iSelectedEmployee>({label:''})
  const [keyTimeout, setKeyTimeout] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const previewImg={
    maskClassName:'rounded-full'
  }

  useEffect(()=>{
    if(selectedEmployee)
      setValue({value:selectedEmployee, label: selectedEmployee.name})
  },[selectedEmployee])

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
            ServiceEmployee.getEmployeeForSelector( value.label).then(
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
      setSelectedEmployee(value.value)
    }
  // eslint-disable-next-line 
  },[value.value])

  const changeInput:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setValue({value:undefined, label:event.target.value})
    setFindedData([])
    setSelectedEmployee()
  }

  const selectElement=(item:iEmployee)=>{
    setValue({value:item, label: item.name})
    setSelectedEmployee(item)
  }

  const cleanValue:MouseEventHandler=()=>{
    setValue({value:undefined, label:''})
    setFindedData([])
    setSelectedEmployee()
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
              href={`/employeeItem/${value.value.id}`}
              target={'_blank'}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
              />
            </a>
          </Popover>
        }
        <CustomPlaceholderInput
          placeholder='Select employee'
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

export default EmployeeSelector