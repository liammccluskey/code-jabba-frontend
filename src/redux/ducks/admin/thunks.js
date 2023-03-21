import * as AdminActions from './actions'
import {api} from '../../../networking'

import * as AdminUtils from './utils'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'
import { fetchNotifications } from '../communication'

export const fetchAdminUsers = () => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingAdminUsers(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get('/admin/users', AdminUtils.getAdminRequestConfig(mongoUser))
        dispatch(AdminActions.setAdminUsers(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingAdminUsers(false))
}

export const removeAdminUser = (adminUserID, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(
            '/admin/users/removeadmin',
            {
                userID: adminUserID
            },
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(addMessage(res.data.message))
        dispatch(fetchAdminUsers())
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const makeUserSuperAdmin = (adminUserID, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(
            '/admin/users/makesuperadmin',
            {
                userID: adminUserID
            },
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(addMessage(res.data.message))
        dispatch(fetchAdminUsers())
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const postAppAnnouncementToAllUsers = (announcementData, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(
            '/admin/notifications/appannouncement',
            {
                ...announcementData,
                creatorName: mongoUser.displayName
            },
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(addMessage(res.data.message))
        dispatch(fetchNotifications(1))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const postEmailAnnouncementToAllUsers = (announcementData, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(
            '/admin/notifications/emailannouncement',
            {
                ...announcementData,
                creatorName: mongoUser.displayName
            },
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(addMessage(res.data.message))
        dispatch(fetchNotifications(1))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}