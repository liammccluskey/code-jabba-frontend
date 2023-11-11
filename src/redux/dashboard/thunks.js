import * as DashboardActions from './actions'
import {api, PageSizes} from '../../networking'
import { getMongoUser } from '../user'
import { addMessage } from '../communication'
import { stringifyQuery } from '../../networking'
import { getApplications, getRecruiterCompanies, getRecruiterJobs } from './selectors'

export const fetchApplicationStats = (isRecruiter, timeframe) => async (dispatch, getState) => {
    if (isRecruiter) {
        dispatch(DashboardActions.setLoadingRecruiterApplicationStats(true))
    } else {
        dispatch(DashboardActions.setLoadingCandidateApplicationStats(true))
    }

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        timeframe,
        isRecruiter: isRecruiter ? 1 : 0
    })

    try {
        const res = await api.get('applications/stats' + queryString)

        if (isRecruiter) {
            dispatch(DashboardActions.setRecruiterApplicationStats(res.data))
        } else {
            dispatch(DashboardActions.setCandidateApplicationStats(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    if (isRecruiter) {
        dispatch(DashboardActions.setLoadingRecruiterApplicationStats(false))
    } else {
        dispatch(DashboardActions.setLoadingCandidateApplicationStats(false))
    }
}

export const fetchRecruiterCompanies = (filters, searchText='', page) => async (dispatch, getState) => {
    const state = getState()
    const companies = getRecruiterCompanies(state)
    const mongoUser = getMongoUser(state)
    if (page != 1 && companies.length > (page - 1)*PageSizes.companySearch) return
    dispatch(DashboardActions.setLoadingRecruiterCompanies(true))

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        page,
        ...filters,
        ...(searchText ?
            {name: searchText}
            : {}
        ),

    })

    try {
        const res = await api.get('/companies/recruiter-search' + queryString)

        if (page === 1) {
            dispatch(DashboardActions.setRecruiterCompanies(res.data))
        } else {
            dispatch(DashboardActions.addRecruiterCompanies(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(DashboardActions.setLoadingRecruiterCompanies(false))
}

export const fetchRecruiterJobs = (filters, searchText='', page) => async (dispatch, getState) => {
    const state = getState()
    const jobs = getRecruiterJobs(state)
    const mongoUser = getMongoUser(state)
    if (page != 1 && jobs.length > (page - 1)*PageSizes.jobSearch) return

    dispatch(DashboardActions.setLoadingRecruiterJobs(true))

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        page,
        ...filters,
        ...(searchText ?
            {title: searchText}
            : {}
        ),

    })

    try {
        const res = await api.get('/jobs/recruiter-search' + queryString)

        if (page === 1) {
            dispatch(DashboardActions.setRecruiterJobs(res.data))
        } else {
            dispatch(DashboardActions.addRecruiterJobs(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(DashboardActions.setLoadingRecruiterJobs(false))
}

export const fetchApplications = (filters, page) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)
    const applications = getApplications(state)
    if (page != 1 && applications.length > (page - 1)*PageSizes.candidateApplicationSearch) return

    dispatch(DashboardActions.setLoadingApplications(true))

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        page,
        ...filters
    })

    try {
        const res = await api.get('applications/candidate-search' + queryString)

        if (page === 1) {
            dispatch(DashboardActions.setApplications(res.data))
        } else {
            dispatch(DashboardActions.addApplications(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(DashboardActions.setLoadingApplications(false))
}