import {CommunicationActionTypes as Types} from './types'

const CommunicationState = {
    messages: [], // [{title, isError, id}]
    notifications: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            notifications: [], // [{{channelID, message, isRead, createdAt}]
            pagesCount: 0,
            canLoadMore: false,
            totalCount: 0,
        }
    },
    channelNotifications: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            notifications: [], // [{channelID, message, isRead, createdAt}]
            pagesCount: 0,
            canLoadMore: false,
            totalCount: 0
        }
    }
}

export const communicationReducer = (state = CommunicationState, action) => {

    switch (action.type) {
        case Types.DELETE_MESSAGE:
            const messageID = action.value
            return {
                ...state,
                messages: state.messages.filter(({id}) => id !== messageID)
            }
        case Types.SET_MESSAGES:
            const messages = action.value
            return {
                ...state,
                messages
            }
        case Types.SET_NOTIFICATIONS_DATA:
            const notificationsData = action.value
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    payload: notificationsData
                }
            }
        case Types.ADD_NOTIFICATIONS_DATA:
            const newNotificationsData = action.value
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    payload: {
                        ...newNotificationsData,
                        notifications: [
                            ...state.notifications.payload.notifications,
                            ...newNotificationsData.notifications
                        ]
                    }
                }
            }
        case Types.MARK_NOTIFICATION_AS_READ:
            const {notificationID} = action
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    payload: {
                        ...state.notifications.payload,
                        notifications: state.notifications.payload.notifications
                            .map( n => n._id === notificationID ?
                                { ...n, isRead: true}
                                : n
                            )
                    }
                }
            }
        case Types.SET_LOADING_NOTIFICATIONS:
            const loading = action.value
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    loading
                }
            }
        case Types.SET_LOADING_NOTIFICATIONS_FIRST_PAGE:
            const loadingFirstPage = action.value
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    loadingFirstPage
                }
            }
        case Types.SET_CHANNEL_NOTIFICATIONS_DATA:
            const channelNotificationsData = action.value
            return {
                ...state,
                channelNotifications: {
                    ...state.channelNotifications,
                    payload: channelNotificationsData
                }
            }
        case Types.ADD_CHANNEL_NOTIFICATIONS_DATA:
            const newChannelNotificationsData = action.value
            return {
                ...state,
                channelNotifications: {
                    ...state.channelNotifications,
                    payload: {
                        ...newChannelNotificationsData,
                        notifications: [
                            ...state.channelNotifications.payload.notifications,
                            ...newChannelNotificationsData.notifications
                        ]
                    }
                }
            }
        case Types.SET_LOADING_CHANNEL_NOTIFICATIONS:
            return {
                ...state,
                channelNotifications: {
                    ...state.channelNotifications,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_CHANNEL_NOTIFICATIONS_FIRST_PAGE:
            return {
                ...state,
                channelNotifications: {
                    ...state.channelNotifications,
                    loadingFirstPage: action.value
                }
            }
        default:
            return state
    }
}
