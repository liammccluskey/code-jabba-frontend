import { CommunicationActionTypes as Types } from "./types"

export const deleteMessage = messageID => ({
    type: Types.DELETE_MESSAGE,
    value: messageID
})

export const setMessages = messages => ({
    type: Types.SET_MESSAGES,
    value: messages
})

export const setNotificationsData = notifications => ({
    type: Types.SET_NOTIFICATIONS_DATA,
    value: notifications
})

export const addNotificationsData = notifications => ({
    type: Types.ADD_NOTIFICATIONS_DATA,
    value: notifications
})

export const __markNotificationAsRead = notificationID => ({
    type: Types.MARK_NOTIFICATION_AS_READ,
    notificationID
})

export const setLoadingNotifications = loading => ({
    type: Types.SET_LOADING_NOTIFICATIONS,
    value: loading
})

export const setLoadingNotificationsFirstPage = loading => ({
    type: Types.SET_LOADING_NOTIFICATIONS_FIRST_PAGE,
    value: loading
})