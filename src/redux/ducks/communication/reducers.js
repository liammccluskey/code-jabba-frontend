import {CommunicationActionTypes as Types} from './types'

const CommunicationState = {
    messages: [], // [{title, isError, id}]
    notifications: [],
    notifications: {
        data: [], // [{// {channel: {id, title}, message, ?photoURL, isRead, createdAt}]
        loading: false,
        loadingFirstPage: false,
        pagesCount: 0,
        canLoadMore: false,
        totalCount: 0,
    },
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
                notifications: notificationsData
            }
        case Types.ADD_NOTIFICATIONS_DATA:
            const newNotificationsData = action.value
            return {
                ...state,
                notifications: {
                    ...newNotificationsData,
                    data: [
                        ...state.notifications.data,
                        ...newNotificationsData.data
                    ]
                }
            }
        case Types.MARK_NOTIFICATION_AS_READ:
            const {notificationID} = action
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    data: state.notifications.data.map( n => n._id === notificationID ?
                            { ...n, isRead: true}
                            : n
                        )
                }
            }
        case Types.SET_LOADING_NOTIFICATIONS:
            const loading = action.value
            return {
                ...state,
                loadingNotifications: loading
            }
        default:
            return state
    }
}
