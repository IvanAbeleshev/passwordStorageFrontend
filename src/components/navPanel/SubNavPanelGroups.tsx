
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '../../store/hooks/storeHooks'
import { showModalWindow } from '../../store/modalWindowSlice'
import ItemSubNavPanel from '../ItemSubNavPanel'
import { faPlus, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { fetchPasswordsGroups } from '../../store/passwordsGroupsSlice'

const SubNavPanelGroups=()=>{

  const passwordsGroupSelector = useAppSelector(store=>store.passwordsGroups.passwordsGroups)
  const dispatch = useAppDispatch()

  return(
    <div 
      className='w-[200px] flex flex-col items-center gap-3 h-full overflow-hidden'
      style={{scrollbarWidth: 'none'}} 
      >
      <div className='flex'>
        <button 
          className='px-7 py-2 border-2 border-transparent rounded-full hover:bg-white hover:text-black'
          onClick={()=>dispatch(showModalWindow())}  
        >
          <FontAwesomeIcon
              className=''
              icon={faPlus}
            />
        </button>

        <button 
          className='px-7 py-2 border-2 border-transparent rounded-full hover:bg-white hover:text-black'
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
      

      <div className='flex flex-col px-[25px] w-[240px] content-box overflow-y-scroll'>
        {passwordsGroupSelector.map(element=><ItemSubNavPanel data={element} delay={element.id*50}/>)}
      </div>
    </div>
  )
}

export default SubNavPanelGroups