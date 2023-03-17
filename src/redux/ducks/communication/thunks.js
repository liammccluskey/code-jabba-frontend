import moment from 'moment'

import * as CommunicationActions from './actions'
import { getMessages } from './selectors'
import { getMongoUser } from '../user'
import { api, stringifyQuery } from '../../../networking'

export const addMessage = (title, isError=false) => (dispatch, getState) => {
    const message = {
        title,
        isError,
        id: moment().format()
    }
    const messages = getMessages(getState())

    const isDuplicate = messages.find(({id}) => id === message.id)

    if (!isDuplicate) {
        const newMessages = [...messages, message]
        dispatch(CommunicationActions.setMessages(newMessages))
        setTimeout(() => {
            dispatch(CommunicationActions.deleteMessage(message.id))
        }, 6*1000)
    }
}

export const fetchNotifications = page => async (dispatch, getState) => {
    dispatch(CommunicationActions.setLoadingNotifications(true))
    if (page === 1) {
        dispatch(CommunicationActions.setLoadingNotificationsFirstPage(true))
    }
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const queryString = stringifyQuery({page})
        const res = await api.get(`/notifications/user/${_id}${queryString}`)

        if (page === 1) dispatch(CommunicationActions.setNotificationsData(res.data))
        else dispatch(CommunicationActions.addNotificationsData(res.data))
    } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(CommunicationActions.setLoadingNotifications(false))
    if (page === 1) {
        dispatch(CommunicationActions.setLoadingNotificationsFirstPage(false))
    }
}

export const markNotificationsAsRead = notificationIDs => async (dispatch, getState) => {
    notificationIDs.forEach( notificationID => {
        dispatch(CommunicationActions.__markNotificationAsRead(notificationID))
    })

    try {
        const res = await api.patch(`/notifications/markasread`, {
            notificationIDs
        })
    } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
    }
}

