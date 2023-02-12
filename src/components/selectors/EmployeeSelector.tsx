
import { Image } from 'antd'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { iEmployee } from '../../interfaces/modelInterfaces'
import ServiceEmployee from '../../services/ServiceEmployee'
import CustomPlaceholderInput from '../CustomPlaceholderInput'

interface iSelectedEmployee{
  value?: iEmployee,
  label: string
}

interface iPropsEmployeeSelector{
  validation?: boolean,
  setSelectedEmployee: Function
}

const EmployeeSelector=({validation=false, setSelectedEmployee}:iPropsEmployeeSelector)=>{
  const [findedData, setFindedData] = useState<iEmployee[]>([])
  const [countOfFinded, setCountOfFinded] = useState(0)
  const [value, setValue] = useState<iSelectedEmployee>({label:''})
  const [keyTimeout, setKeyTimeout] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

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
  },[value.label])

  useEffect(()=>{
    if(value.value){
      setSelectedEmployee(value.value)
    }
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

  return (
    <div
      className='relative'
    >
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
            onClick={()=>selectElement(element)}
            className='w-full hover:bg-main hover:text-hover rounded-full'
          >
            <Image 
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
  )
}

export default EmployeeSelector