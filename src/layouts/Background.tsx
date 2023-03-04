import { ReactNode, useEffect } from 'react'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { useAppSelector } from '../store/hooks/storeHooks'
import { en_notificationStatus } from '../interfaces'
import { getDarkModeValue } from '../store/darkModeSlice'

interface iPropsBackground{
  children: ReactNode
}
const Background=({ children }:iPropsBackground)=>{
  const [api, contextHolder] = notification.useNotification()
  
  const isDarkMode = useAppSelector(getDarkModeValue)

  const notificationMessages=useAppSelector(state=>state.notification)

  const openNotification = (status:en_notificationStatus, title:string, description:string) => {
    const placement:NotificationPlacement = 'topRight'
    switch(status){
      case en_notificationStatus.error:
        api.error({
          message: title,
          description: description,
          placement
        })
        break
      case en_notificationStatus.warning:
        api.warning({
          message: title,
          description: description,
          placement
        })
        break
      case en_notificationStatus.success:
        api.success({
          message: title,
          description: description,
          placement
        })
        break
      default:
          api.info({
            message: title,
            description: description,
            placement
          })
    }
    
  }
  
  useEffect(()=>{
    if(notificationMessages.time)
      openNotification(
        notificationMessages.status,
        notificationMessages.title,
        notificationMessages.description)
  
  // eslint-disable-next-line
  },[notificationMessages.time])

  return(
    <div
      className={`w-screen h-screen ${isDarkMode?'dark':'light'}`}
    >
      <div 
        className={`
          w-full 
          h-full 
          ${isDarkMode?'':
          `bg-main-background 
          bg-400% 
          animate-movebg`}
          
          dark:bg-dark-bg
          dark:bg-cover
          dark:bg-100%
          dark:max-md:bg-auto
        `}
          
      >
        {contextHolder}
        {children}
      </div>
    </div>
  )
}

export default Background