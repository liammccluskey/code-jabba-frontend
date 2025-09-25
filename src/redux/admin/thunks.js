import * as AdminActions from './actions'
import {api, stringifyQuery, PageSizes} from '../../networking'

import * as AdminUtils from './utils'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'
import { fetchNotifications } from '../communication'
import { getBugReports, getFAQs } from './selectors'

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
    dispatch(AdminActions.setBugReportNotFound(false))

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
        dispatch(AdminActions.setBugReportNotFound(true))
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

export const postBugReport = (bugReportData, onSuccess, onFailure) => async (dispatch, getState) => {
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
        onFailure()
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

export const fetchBugReportStats = timeframe => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingBugReportStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({timeframe})

    try {
        const res = await api.get(
            `/admin/bugreports/stats${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        dispatch(AdminActions.setBugReportStats(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingBugReportStats(false))
}

export const fetchFAQ = faqID => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingFAQ(true))
    dispatch(AdminActions.setFAQNotFound(false))

    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(
            `/admin/faq/${faqID}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        dispatch(AdminActions.setFAQ(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(AdminActions.setFAQNotFound(true))
    }

    dispatch(AdminActions.setLoadingFAQ(false))
}

export const fetchFAQs = (page, filters, sections, searchText) => async (dispatch, getState) => {
    const state = getState()
    const faqs = getFAQs(state)
    if (page != 1 && faqs.length > (page - 1)*PageSizes.faqs) return
    
    if (page == 1) {
        dispatch(AdminActions.setLoadingFAQsFirstPage(true))
    } else {
        dispatch(AdminActions.setLoadingFAQs(true))
    }

    const mongoUser = getMongoUser(state)
    const queryString = stringifyQuery({
        page,
        ...filters,
        ...(sections.length ? {sections: sections.join('-')} : {}),
        ...(searchText ? {title: searchText} : {})
    })

    try {
        const res = await api.get(
            `/admin/faq/search${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        if (page == 1) {
            dispatch(AdminActions.setFAQsData(res.data))
        } else {
            dispatch(AdminActions.addFAQsData(res.data))
        }
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    if (page == 1) {
        dispatch(AdminActions.setLoadingFAQsFirstPage(false))
    } else {
        dispatch(AdminActions.setLoadingFAQs(false))
    }
}

export const postFAQ = (formData, onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(
            `/admin/faq`,
            formData,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        dispatch(addMessage(res.data.message))
        onSuccess()
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchFAQs = (faqIDs, updatedFields, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(
            `/admin/faq`,
            {
                faqIDs,
                updatedFields
            },
            AdminUtils.getAdminRequestConfig(mongoUser)
        )

        dispatch(addMessage(res.data.message))
        onSuccess()
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const deleteFAQs = (faqIDs, onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        faqIDs: faqIDs.join('-')
    })
    console.log(JSON.stringify({faqIDs: faqIDs || 'null', queryString}, null, 4))

    try {
        const res = await api.delete(
            `/admin/faq${queryString}`,
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        
        dispatch(AdminActions.__deleteFAQs(faqIDs))
        dispatch(addMessage(res.data.message))
        onSuccess()
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const fetchAdminUserStats = () => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingUserStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(
            '/admin/users/user-stats',
            AdminUtils.getAdminRequestConfig(mongoUser)
        )
        
        dispatch(AdminActions.setUserStats(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingUserStats(false))
}

export const fetchSiteStats = () => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingSiteStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(
            '/admin/stats/site-stats',
            AdminUtils.getAdminRequestConfig(mongoUser),
        )
        
        dispatch(AdminActions.setSiteStats(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingSiteStats(false))
}

export const fetchEvents = timeframe => async (dispatch, getState) => {
    dispatch(AdminActions.setLoadingEvents(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        timeframe
    })

    try {
        const res = await api.get(
            '/admin/stats/events' + queryString,
            AdminUtils.getAdminRequestConfig(mongoUser),
        )
        
        dispatch(AdminActions.setEvents(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(AdminActions.setLoadingEvents(false))
}