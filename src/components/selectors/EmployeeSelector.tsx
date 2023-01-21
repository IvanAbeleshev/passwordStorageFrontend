import { ChangeEventHandler, useState } from 'react'
import Employee from '../../models/ModelEmployee'
import ServiceEmployee from '../../services/ServiceEmployee'

interface iPropsEmployeeSelector{
  setSelectedEmployee: Function
}

const EmployeeSelector=({ setSelectedEmployee }:iPropsEmployeeSelector)=>{
  const [findedData, setFindedData] = useState<Employee[]>([])
  const [findedElements, setFindedElements] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const changeTitle:ChangeEventHandler<HTMLInputElement>=(event)=>{
    setSearchText(event.target.value)
    if(timeoutId){
      clearTimeout(timeoutId)
    }
    setTimeoutId(setTimeout(() => {
      ServiceEmployee.getEmployeeForSelector(searchText).then(
        ({countOfFinded, payload})=>{
          setFindedElements(countOfFinded!)
          setFindedData(payload!)
        }
      )
      console.log('Now is execute request')
    }, 800)
    )
    
  }

  return(
    <div>
      <input 
        className='border-2 shadow-main shadow-md rounded-md' 
        name='employeeName'
        type='text' 
        value={searchText}
        onChange={changeTitle}
        placeholder='Employee' 
      />
      {
        findedElements>0&&
        <ul className={`relative border-2 shadow-main shadow-md rounded-md`}>
          {
            findedData.map(
              element=>
              <li 
                onClick={(selectedNode=>{
                  setSelectedEmployee(element)
                  setSearchText(element.name)
                  setFindedElements(0)
                  setFindedData([])
                })}
                className='hover:bg-btn-hover hover:cursor-pointer'
                key={element.id}
              >
                {element.name}
              </li>)
          }
          {findedElements>findedData.length&&<li>and other {findedElements>findedData.length} items</li>}
        </ul>
      }
    </div>
  )
}

export default EmployeeSelector