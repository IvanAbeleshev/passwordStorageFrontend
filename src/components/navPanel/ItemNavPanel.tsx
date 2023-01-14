import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEventHandler, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { iItemNavMenu } from '../../layouts/NavPanel'
import { hideSubNavPanel, selectorStatusSubMenu, showSubNavPanel } from '../../store/subMenuStatusSlice'

const ItemNavPanel=({title, path, icon}:iItemNavMenu)=>{
  const navigationLocation = useLocation()
  const refItem = useRef<HTMLLIElement>(null)

  const dispatch = useDispatch()
  const subNavPanelStatus = useSelector(selectorStatusSubMenu)

  const onElement:MouseEventHandler<HTMLLIElement>=(event)=>{
    event.preventDefault()
    if(title==='Passwords'&&!subNavPanelStatus){
      dispatch(showSubNavPanel())
    }
  }
  const outOfElement:MouseEventHandler<HTMLLIElement>=(event)=>{
    event.preventDefault()
    if(title==='Passwords'&&subNavPanelStatus){
      dispatch(hideSubNavPanel())
    }
  }

  return(
    <li 
      key={title} 
      ref={refItem} 
      onMouseEnter={onElement}
      onMouseLeave={outOfElement}
    >
      <Link 
        className={navigationLocation.pathname===path?
                    'group text-white text-center':
                    'group transition-all hover:text-hover text-center'} 
        to={path}
      >
        <FontAwesomeIcon
          className={navigationLocation.pathname===path?
                    'text-5xl w-[100%]':
                    'text-5xl w-[100%] transition-all translate-y-4 group-hover:translate-y-0'}
          icon={icon}
        />
        <h2 
          className={navigationLocation.pathname===path?
            'text-md w-[100%]':
            'text-md w-[100%] text-transparent -translate-y-4 group-hover:translate-y-0 group-hover:text-hover'}
        >
          {title}
        </h2>
      </Link>
    </li>
  )
}

export default ItemNavPanel