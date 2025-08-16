import * as ApplicationActions from './actions'
import {api, PageSizes, stringifyQuery, hasLoadedPageResults} from '../../networking'
import { getMongoUser } from '../user'
import { addMessage } from '../communication'
import { getApplications, getApplicationsFilters, getApplicationsPage } from './selectors'
import { deepObjectEqual } from '../../views/components/job/modals/JobFiltersModal/utils'
import { getJob } from '../job'

export const fetchApplicationStats = (timeframe, jobID) => async (dispatch, getState) => {
    dispatch(ApplicationActions.setLoadingApplicationStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        timeframe,
        jobID,
        userType: 'recruiter'
    })

    try {
        const res = await api.get('/applications/value-delta-stats' + queryString)

        dispatch(ApplicationActions.setApplicationStats(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(ApplicationActions.setLoadingApplicationStats(false))
}

export const fetchApplications = (filters, page, onSuccess = () => {}) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)
    const applications = getApplications(state)
    const applicationsPage = getApplicationsPage(state)
    const applicationsFilters = getApplicationsFilters(state)

    if (
        hasLoadedPageResults(page, applications, PageSizes.recruiterApplicationSearch) &&
        deepObjectEqual(filters, applicationsFilters)
    ) {
        dispatch(ApplicationActions.setApplicationsPage(page))
        onSuccess()
        return
    }

    dispatch(ApplicationActions.setLoadingApplications(true))

    const queryString = stringifyQuery({
        ...filters,
        page: applicationsPage,
        userID: mongoUser._id,
    })

    try {
        const res = await api.get('/applications/recruiter-search' + queryString)

        dispatch(ApplicationActions.setApplications(res.data))

        if (applicationsPage == 1) {
            dispatch(ApplicationActions.setApplications(res.data))
        } else {
            dispatch(ApplicationActions.addApplications(res.data))
        }
        dispatch(ApplicationActions.setApplicationsPage(page))
        dispatch(ApplicationActions.setApplicationsFilters(filters))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(ApplicationActions.setLoadingApplications(false))
}

export const postApplication = (jobID, recruiterID, onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/applications', {
            candidate: mongoUser._id,
            candidateName: mongoUser.displayName,
            job: jobID,
            recruiter: recruiterID,
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

export const fetchApplication = (applicationID) => async (dispatch, getState) => {
    dispatch(ApplicationActions.setApplicationNotFound(false))
    dispatch(ApplicationActions.setLoadingApplication(true))
    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id
    })

    try {
        const res = await api.get(`/applications/${applicationID}` + queryString)

        dispatch(ApplicationActions.setApplication(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(ApplicationActions.setApplicationNotFound(true))
    }

    dispatch(ApplicationActions.setLoadingApplication(false))
}

export const updateApplicationStatus = (applicationID, updatedStatus, onSuccess, onFailure = () => {}) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        if (updatedStatus === 'viewed') {
            dispatch(ApplicationActions.updateApplicationStatusLocally(applicationID, updatedStatus))
            return
        }

        const res = await api.patch(`/applications/${applicationID}`, {
            status: updatedStatus,
            userID: mongoUser._id
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
