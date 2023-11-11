import {v4 as uuid} from 'uuid'

import * as CommunicationActions from './actions'
import { getMessages } from './selectors'
import { getMongoUser } from '../user'
import { api, stringifyQuery } from '../../networking'

export const addMessage = (title, isError=false, linger=false) => (dispatch, getState) => {
    const message = {
        title,
        isError,
        id: uuid()
    }
    const messages = getMessages(getState())

    const isDuplicate = messages.find(m => m.id === message.id || m.title === message.title && m.isError && message.isError)

    if (!isDuplicate) {
        const newMessages = [...messages, message]
        dispatch(CommunicationActions.setMessages(newMessages))
        setTimeout(() => {
            dispatch(CommunicationActions.deleteMessage(message.id))
        }, linger ? 10*1000 : 6*1000)
    }
}

export const fetchNotifications = page => async (dispatch, getState) => {
    if (page === 1) {
        dispatch(CommunicationActions.setLoadingNotificationsFirstPage(true))
    } else {
        dispatch(CommunicationActions.setLoadingNotifications(true))
    }
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const queryString = stringifyQuery({page})
        const res = await api.get(`/notifications/user/${_id}${queryString}`)

        if (page === 1) dispatch(CommunicationActions.setNotificationsData(res.data))
        else dispatch(CommunicationActions.addNotificationsData(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    if (page === 1) {
        dispatch(CommunicationActions.setLoadingNotificationsFirstPage(false))
    } else {
        dispatch(CommunicationActions.setLoadingNotifications(false))
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
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const fetchChannelNotifications = (channelID, page) => async (dispatch, getState) => {
    if (page === 1) {
        dispatch(CommunicationActions.setLoadingChannelNotificationsFirstPage(true))
    } else {
        dispatch(CommunicationActions.setLoadingChannelNotifications(true))
    }
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const queryString = stringifyQuery({page})
        const res = await api.get(`/notifications/user/${_id}/channel/${channelID}${queryString}`)

        if (page === 1) dispatch(CommunicationActions.setChannelNotificationsData(res.data))
        else {
            setTimeout(() => {
                dispatch(CommunicationActions.addChannelNotificationsData(res.data))
            }, 1*1000)
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    if (page === 1) {
        dispatch(CommunicationActions.setLoadingChannelNotificationsFirstPage(false))
    } else {
        setTimeout(() => {
            dispatch(CommunicationActions.setLoadingChannelNotifications(false))
        }, 1*1000)
    }
}

