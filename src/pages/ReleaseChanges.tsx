import { useEffect, useState } from 'react'
import DefaultContainerData from '../components/DefaultContainerData'
import ModelUpdate from '../models/ModelUpdete'
import ServiceDescriptionOfUpdate from '../services/ServiceDescriptionOfUpdate'
import { formatDateToStandartDateFormat } from '../utils/dateFunction'
import { errorNotificator } from '../utils/notificator'

const ReleaseChanges=()=>{
  const [updateList, setUpdateList] = useState<ModelUpdate[]>([])

  useEffect(()=>{
    ServiceDescriptionOfUpdate.getChangeList().then(
      ({payload})=>{
        setUpdateList(payload)
      }
    ).catch(error=>errorNotificator('Error read', error.message))
  }, [])

  return(
    <DefaultContainerData>
      <ul className='list-disc pl-3 flex flex-col gap-5'>
        {
          updateList.map(element=>
            <li key={formatDateToStandartDateFormat(element.date)}>
              <h3 className='text-lg'>{formatDateToStandartDateFormat(element.date)} {element.title}</h3>
              <p>{element.description}</p>
            </li> 
          )
        }
      </ul>
    </DefaultContainerData>
  )
}

export default ReleaseChanges