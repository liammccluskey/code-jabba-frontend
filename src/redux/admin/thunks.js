import * as AdminActions from './actions'
import {api, stringifyQuery, PageSizes} from '../../networking'

import * as AdminUtils from './utils'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'
import { fetchNotifications } from '../communication'
import { getBugReports } from './selectors'

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

export const removeAdminUser = (adminUserID, onSuccess, onFailure) => async (dispatch, getState) => {
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
        onFailure()
    }
}

export const makeUserSuperAdmin = (adminUserID, onSuccess, onFailure) => async (dispatch, getState) => {
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
        onFailure()
    }
}

export const postAppAnnouncementToAllUsers = (announcementData, onSuccess, onFailure) => async (dispatch, getState) => {
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
        onFailure()
    }
}

export const postEmailAnnouncementToAllUsers = (announcementData, onSuccess, onFailure) => async (dispatch, getState) => {
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
        onFailure()
    }
}

export const createNewAdminUser = (userID, onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(
            '/admin/users/makeadmin',
            {userID},
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(addMessage(res.data.message))
        dispatch(fetchAdminUsers())
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const fetchUsersSearchResults = (searchText) => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingUsersSearchResults(true))
    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({searchText})

    try {
        const res = await api.get(
            `/admin/users/searchnonadmin${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        dispatch(AdminActions.setUsersSearchResults(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingUsersSearchResults(false))
}

export const fetchBugReport = bugReportID => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingBugReport(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(
            `admin/bugreports/${bugReportID}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        dispatch(AdminActions.setBugReport(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingBugReport(false))
}

export const fetchBugReports = (filters, searchText, page) => async (dispatch, getState) => {
    const state = getState()
    const bugReports = getBugReports(state)
    if (page != 1 && bugReports.length > (page - 1)*PageSizes.bugReports) return

    if (page == 1) {
        dispatch(AdminActions.setLoadingBugReportsFirstPage(true))
    } else {
        dispatch(AdminActions.setLoadingBugReports(true))
    }

    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        ...filters,
        title: searchText,
        page
    })

    try {
        const res = await api.get(
            `/admin/bugreports/search${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        if (page == 1) {
            dispatch(AdminActions.setBugReportsData(res.data))
        } else {
            dispatch(AdminActions.addBugReportsData(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    if (page == 1) {
        dispatch(AdminActions.setLoadingBugReportsFirstPage(false))
    } else {
        dispatch(AdminActions.setLoadingBugReports(false))
    }
}

export const postBugReport = (bugReportData, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(`/bugreports`, {
            ...bugReportData,
            reporter: mongoUser._id
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const patchBugReports = (
    bugReportIDs,
    updatedFields,
    onSuccess,
    onFailure,
    updateLocally=true
) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(
            '/admin/bugreports',
            {bugReportIDs, updatedFields},
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        
        updateLocally && dispatch(AdminActions.updateBugReports(bugReportIDs, updatedFields))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const deleteBugReports = (
    bugReportIDs,
    onSuccess,
    onFailure,
    updateLocally=true
) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        bugReportIDs: bugReportIDs.join('-')
    })

    try {
        const res = await api.delete(
            `/admin/bugreports${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        
        updateLocally && dispatch(AdminActions.__deleteBugReports(bugReportIDs))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}