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

export const fetchApplications = (filters, _page=undefined) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)
    const applications = getApplications(state)

    let page
    if (_page !== undefined) {
        page = _page
        dispatch(ApplicationActions.setApplicationsPage(_page))
    } else {
        page = getApplicationsPage(state)
    }


    if (page != 1 && applications.length > (page - 1)*PageSizes.recruiterApplicationSearch) return
    dispatch(ApplicationActions.setLoadingApplications(true))

    const queryString = stringifyQuery({
        ...filters,
        page,
        userID: mongoUser._id
    })

    try {
        const res = await api.get('/applications/recruiter-search' + queryString)

        if (page == 1) {
            dispatch(ApplicationActions.setApplications(res.data))
        } else {
            dispatch(ApplicationActions.addApplications(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(ApplicationActions.setLoadingApplications(false))
}

export const postApplication = (jobID, recruiterID, questions=undefined) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/applications', {
            candidate: mongoUser._id,
            job: jobID,
            recruiter: recruiterID,
            ...(questions === undefined ? {} : {questions})
        })

        dispatch(addMessage(res.data.message))
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
