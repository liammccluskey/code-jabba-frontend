import { CommunicationActionTypes as Types } from "./types"

export const deleteMessage = messageID => ({
    type: Types.DELETE_MESSAGE,
    value: messageID
})

export const setMessages = messages => ({
    type: Types.SET_MESSAGES,
    value: messages
})

export const setNotificationsData = data => ({
    type: Types.SET_NOTIFICATIONS_DATA,
    value: data
})

export const addNotificationsData = data => ({
    type: Types.ADD_NOTIFICATIONS_DATA,
    value: data
})

export const __markNotificationAsRead = notificationID => ({
    type: Types.MARK_NOTIFICATION_AS_READ,
    value: notificationID
})

export const setLoadingNotifications = loading => ({
    type: Types.SET_LOADING_NOTIFICATIONS,
    value: loading
})

export const setLoadingNotificationsFirstPage = loading => ({
    type: Types.SET_LOADING_NOTIFICATIONS_FIRST_PAGE,
    value: loading
})

export const setChannelNotificationsData = data => ({
    type: Types.SET_CHANNEL_NOTIFICATIONS_DATA,
    value: data
})

export const addChannelNotificationsData = data => ({
    type: Types.ADD_CHANNEL_NOTIFICATIONS_DATA,
    value: data
})

export const setLoadingChannelNotifications = loading => ({
    type: Types.SET_LOADING_CHANNEL_NOTIFICATIONS,
    value: loading
})

export const setLoadingChannelNotificationsFirstPage = loading => ({
    type: Types.SET_LOADING_CHANNEL_NOTIFICATIONS_FIRST_PAGE,
    value: loading
})