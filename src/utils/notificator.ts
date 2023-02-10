import { globalStore } from '../constans'
import { en_notificationStatus } from '../interfaces'
import { pushNotificationMessage } from '../store/notificationMessageSlice'

const createNotification=(notificationStatus:en_notificationStatus)=>{
  return (title:string, description:string)=>{
    globalStore.dispatch(pushNotificationMessage({
      status: notificationStatus,
      title,
      description
    }))
  }
}

export const successNotificator = createNotification(en_notificationStatus.success)
export const warningNotificator = createNotification(en_notificationStatus.warning)
export const errorNotificator = createNotification(en_notificationStatus.error)
export const infoNotificator = createNotification(en_notificationStatus.info)