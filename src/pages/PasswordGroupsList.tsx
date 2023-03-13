import { faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultContainerData from '../components/DefaultContainerData'
import SecureImage from '../components/SecureImage'
import { iGroupFilter, iWithParents } from '../interfaces'
import { iEmployee, iPasswordGroup } from '../interfaces/modelInterfaces'
import { useAppDispatch, useAppSelector } from '../store/hooks/storeHooks'
import { showModalWindow } from '../store/modalWindowSlice'
import { setPasswordFilterItem } from '../store/passwordFilterSlice'
import { fetchPasswordsGroups } from '../store/passwordsGroupsSlice'

const PasswordGroupsList=()=>{
  const [filtredGroups, setFiltredGroups] = useState<iGroupFilter>()
  const dispatch = useAppDispatch()
  const passwordsGroupSelector = useAppSelector(store=>store.passwordsGroups.passwordsGroups)

  const navigator = useNavigate()

  const previewImg={
    maskClassName:'rounded-full',
    visible:false,
  }

  useEffect(()=>{
    //sort array without parent go first another go after
    const withoutParent: iPasswordGroup[] = []
    const withParent: iWithParents[] = []

    const getParentInFiltredArray=(item:iEmployee):boolean=>{
      return withParent.filter(element=>element.parent.id===item.id).length>0?true:false
    }

    for(let item of passwordsGroupSelector){
      if(item.employee){
        if(!getParentInFiltredArray(item.employee)){
          withParent.push({
            parent: item.employee,
            groups: passwordsGroupSelector.filter(element=>element.employee?.id===item.employee?.id)
          })
        }
      }else{
        withoutParent.push(item)
      }
    }

    setFiltredGroups({withoutParent, withParent})

  },[passwordsGroupSelector])

  return(
    <>
      <DefaultContainerData>
        <div className='flex gap-5'>
          <button 
            className='
            px-7 
            py-2 
            border-2 
            border-transparent 
            rounded-full
            bg-btn
            dark:bg-dbtn
            hover:bg-btn-hover
            dark:hover:bg-dbtn-h
            text-hover'
            onClick={()=>dispatch(showModalWindow())}  
          >
            <FontAwesomeIcon
                className=''
                icon={faPlus}
              />
          </button>
          <button 
            className='
              px-7 
              py-2 
              border-2 
              border-transparent 
              rounded-full
              bg-btn
              dark:bg-dbtn
              hover:bg-btn-hover
              dark:hover:bg-dbtn-h
              text-hover'
            onClick={()=>{
              dispatch(fetchPasswordsGroups())}
            }
          >
            <FontAwesomeIcon
                className=''
                icon={faRepeat}
              />
          </button>
        </div>
      </DefaultContainerData>

      <div className='h-10' />

      <DefaultContainerData>
        <div className='flex flex-col gap-3 text-lg'>
        
        {
          filtredGroups?.withoutParent.map((element, index)=>
          <div 
            onClick={()=>{
              dispatch(setPasswordFilterItem({passwordGroup:element}))
              navigator('passwordsList')
            }}
            key={element.id}
            className='
              flex 
              items-center 
              gap-3
              hover:bg-main/80 
              hover:cursor-pointer 
              hover:text-hover
              rounded-full '
          >
            <SecureImage 
              className='rounded-full'
              src={element.icon}
              height={50}
              width={50}
              preview={previewImg}
            />
            <span>{element.name}</span>
          </div>
          )
        }
        {
          filtredGroups?.withParent.map(parentItems=>
            <div 
              key={parentItems.parent.id}
              className='flex flex-col gap-3'
            >
              <div className='flex items-center gap-3'>
                <SecureImage 
                  className='rounded-full'
                  src={parentItems.parent.img}
                  height={50}
                  width={50}
                  preview={previewImg}
                />
                <span>{parentItems.parent.name}</span>
              </div>
              <div>
                {
                  parentItems.groups.map((groupsItem)=>
                  <div 
                    onClick={()=>{
                      dispatch(setPasswordFilterItem({passwordGroup:groupsItem}))
                      navigator('passwordsList')
                    }}
                    key={groupsItem.id}
                    className='
                      flex 
                      items-center 
                      gap-3
                      ml-10
                      hover:bg-main/80 
                      hover:cursor-pointer 
                      hover:text-hover
                      rounded-full'
                  >
                    <SecureImage 
                      className='rounded-full'
                      src={groupsItem.icon}
                      height={50}
                      width={50}
                      preview={previewImg}
                    />
                    <span>{groupsItem.name}</span>
                  </div>
                  )
                }
              </div>
            </div>
          )
        }
        </div>
      </DefaultContainerData>
    </>
  )
}

export default PasswordGroupsList