
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '../../store/hooks/storeHooks'
import { showModalWindow } from '../../store/modalWindowSlice'
import ItemSubNavPanel from './ItemSubNavPanel'
import { faPlus, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { fetchPasswordsGroups } from '../../store/passwordsGroupsSlice'
import { useEffect, useState } from 'react'
import { iEmployee, iPasswordGroup } from '../../interfaces/modelInterfaces'
import ItemsParentNavPanel from './ItemsParentNavPanel'
import { iGroupFilter, iWithParents } from '../../interfaces'

const SubNavPanelGroups=()=>{
  const [filtredGroups, setFiltredGroups] = useState<iGroupFilter>()
  const passwordsGroupSelector = useAppSelector(store=>store.passwordsGroups.passwordsGroups)
  const dispatch = useAppDispatch()

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
    <div 
      className='
        w-[200px] 
        flex 
        flex-col 
        items-center 
        gap-3 
        h-full 
        overflow-hidden'
      style={{scrollbarWidth: 'none'}} 
      >
      <div className='flex'>
        <button 
          className='
            px-7 
            py-2 
            border-2 
            border-transparent 
            rounded-full 
            hover:bg-white 
            hover:text-black'
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
            hover:bg-white 
            hover:text-black'
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
      

      <div 
        className='
          flex 
          flex-col 
          gap-1
          px-[25px] 
          w-[240px] 
          content-box 
          overflow-y-scroll'
      >
        <>
        
        {
          filtredGroups?.withoutParent.map((element, index)=>
          <ItemSubNavPanel 
            key={element.id}
            data={element}
            subElement={false}
          />)
        }
        {
          filtredGroups?.withParent.map(parentItems=>
            <ItemsParentNavPanel 
              key={parentItems.parent.id}
              item={parentItems.parent}
            >
              {
                parentItems.groups.map((groupsItem, index)=>
                <ItemSubNavPanel 
                  key={groupsItem.id}
                  data={groupsItem} 
                  subElement={true}
                />)
              }
            </ItemsParentNavPanel>
          )
        }
        </>
      </div>
    </div>
  )
}

export default SubNavPanelGroups