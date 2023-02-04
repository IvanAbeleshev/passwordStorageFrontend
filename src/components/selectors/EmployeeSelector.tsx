import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import Employee from '../../models/ModelEmployee'
import ServiceEmployee from '../../services/ServiceEmployee'
import CustomPlaceholderInput from '../CustomPlaceholderInput'

interface iPropsEmployeeSelector{
  setSelect: Function
}

const EmployeeSelector=({ setSelect }:iPropsEmployeeSelector)=>{
  const [findedData, setFindedData] = useState<Employee[]>([])
  const [findedElements, setFindedElements] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside=(event: MouseEvent)=>{
      const target = event.target as HTMLElement
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setFindedElements(0)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef, setFindedElements])


  const changeTitle:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setSearchText(event.target.value)
    if(timeoutId){
      clearTimeout(timeoutId)
    }
    
    if(searchText){
      setTimeoutId(setTimeout(() => {
        ServiceEmployee.getEmployeeForSelector(searchText).then(
          ({countOfFinded, payload})=>{
            setFindedElements(countOfFinded!)
            setFindedData(payload!)
          }
        )
      }, 800)
      )
    }
  }

  return(
    <div className='relative w-full'>
      <CustomPlaceholderInput
        placeholder='Employee' 
        value={searchText}
      >
        <input 
          className='border border-main shadow-main shadow-md rounded-md' 
          name='employeeName'
          type='text' 
          autoComplete='off'
          value={searchText}
          onChange={changeTitle}
        />
      </CustomPlaceholderInput>
      {
        findedElements>0&&
        <div 
          ref={wrapperRef} 
          className='
            table 
            w-full 
            absolute 
            bg-hover 
            border-2 
            shadow-main 
            shadow-md 
            rounded-md'
        >
          
          <div className='table-row-group'>
          {
            findedData.map(
              element=>
              <div 
                onClick={(selectedNode=>{
                  setSelect(element)
                  setSearchText(element.name)
                  setFindedElements(0)
                  setFindedData([])
                })}
                className='table-row hover:bg-btn-hover hover:cursor-pointer'
                key={element.id}
              >
                <img 
                  src={element.img} 
                  alt='groupItem' 
                  className='w-10 h-10 rounded-full table-cell' 
                />
                <span className=' table-cell'>{element.name}</span>
              </div>)
            }
            {findedElements>findedData.length&&
              <li>and other {findedElements>findedData.length} items</li>
            }
            
          </div>
        </div>

      }
    </div>
  )
}

export default EmployeeSelector