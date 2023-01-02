import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { iItemSubNavPanel } from '../../interfaces'
import ModalWindow from '../../layouts/ModalWindow'
import PasswordGroupItem from '../../pages/PasswordGroupItem'
import { selectorModalWindowVisible, showModalWindow } from '../../store/modalWindowSlice'
import { fetchPasswordsGroups, selectorPasswordsGroups } from '../../store/passwordsGroupsSlice'
import ItemSubNavPanel from '../ItemSubNavPanel'

const SubNavPanelGroups=()=>{
  const [subNavItems, setSubNavItems] = useState([] as iItemSubNavPanel[])

  const visibleModalWindow = useSelector(selectorModalWindowVisible)
  const passwordsGroupSelector = useSelector(selectorPasswordsGroups)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!passwordsGroupSelector.loading && passwordsGroupSelector.passwordsGroups.length){
      // cant dispatch thunk action maybe need correct config to store, some middlewares
      //dispatch(fetchPasswordsGroups())
    }
  },[])
  return(
    <div className='max-w-[250px] flex flex-col items-center gap-3'>
      <button 
        className='px-7 py-2 border-2 border-transparent rounded-full hover:bg-white hover:text-black'
        onClick={()=>dispatch(showModalWindow())}  
      >+</button>
      <div className='flex flex-col min-w-[100px]'>
        {subNavItems.map(element=><ItemSubNavPanel delay={200}/>)}
        {/* <ItemSubNavPanel delay={200}/>
        <ItemSubNavPanel delay={300}/>
        <ItemSubNavPanel delay={400}/>
        <ItemSubNavPanel delay={500}/> */}
      </div>
      
      {visibleModalWindow&&<ModalWindow><PasswordGroupItem /></ModalWindow>}
    </div>
  )
}

export default SubNavPanelGroups