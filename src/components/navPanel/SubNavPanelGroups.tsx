import { useEffect, useState } from 'react'
import { iItemSubNavPanel } from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../store/hooks/storeHooks'
import { showModalWindow } from '../../store/modalWindowSlice'
import ItemSubNavPanel from '../ItemSubNavPanel'

const SubNavPanelGroups=()=>{
  const [subNavItems, setSubNavItems] = useState([] as iItemSubNavPanel[])

  const passwordsGroupSelector = useAppSelector(store=>store.passwordsGroups)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    
    // console.log(passwordsGroupSelector)
    // if(!passwordsGroupSelector.loading && !passwordsGroupSelector.passwordsGroups.length){
    //   dispatch(fetchPasswordsGroups())
    // }
  },[])
  return(
    <div className='max-w-[250px] flex flex-col items-center gap-3'>
      <button 
        className='px-7 py-2 border-2 border-transparent rounded-full hover:bg-white hover:text-black'
        onClick={()=>dispatch(showModalWindow())}  
      >+</button>
      <div className='flex flex-col min-w-[100px]'>
        {subNavItems.map(element=><ItemSubNavPanel delay={200}/>)}
      </div>
    </div>
  )
}

export default SubNavPanelGroups