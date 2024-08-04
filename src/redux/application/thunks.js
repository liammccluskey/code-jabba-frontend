import * as ApplicationActions from './actions'
import {api, PageSizes, stringifyQuery} from '../../networking'
import { getMongoUser } from '../user'
import { addMessage } from '../communication'
import { getApplications, getApplicationsPage } from './selectors'

export const fetchApplicationStats = (timeframe, jobID) => async (dispatch, getState) => {
    dispatch(ApplicationActions.setLoadingApplicationStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        timeframe,
        jobID,
        isRecruiter: 1
    })

    try {
        const res = await api.get('/applications/stats' + queryString)

        dispatch(ApplicationActions.setApplicationStats(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(ApplicationActions.setLoadingApplicationStats(false))
}

export const fetchApplications = (filters) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)
    const applications = getApplications(state)

    dispatch(ApplicationActions.setLoadingApplications(true))

    const queryString = stringifyQuery({
        ...filters,
        userID: mongoUser._id
    })

    try {
        const res = await api.get('/applications/recruiter-search' + queryString)

        dispatch(ApplicationActions.setApplications(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(ApplicationActions.setLoadingApplications(false))
}

export const postApplication = (jobID, recruiterID, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/applications', {
            candidate: mongoUser._id,
            job: jobID,
            recruiter: recruiterID,
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
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
