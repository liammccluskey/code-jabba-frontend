import * as JobActions from './actions'
import {api} from '../../networking'
import { addMessage } from '../communication'
import { stringifyQuery, PageSizes } from '../../networking'
import { getMongoUser } from '../user'
import { getJobs } from './selectors'
import { logEventFB, Events } from '../events'

export const searchCompanies = companySearch => async (dispatch) => {
    dispatch(JobActions.setLoadingCompanySearchResults(true))

    const queryString = stringifyQuery({
        page: 1,
        name: companySearch
    })

    try {
        const res = await api.get(`/companies/search${queryString}`)

        dispatch(JobActions.setCompanySearchResults(res.data.companies))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(JobActions.setLoadingCompanySearchResults(false))
}

export const fetchJob = (jobID) => async (dispatch, getState) => {
    dispatch(JobActions.setLoadingJob(true))
    dispatch(JobActions.setJobNotFound(false))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id
    })

    try {
        const res = await api.get(`/jobs/${jobID}` + queryString)

        dispatch(JobActions.setJob(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(JobActions.setJobNotFound(true))
    }

    dispatch(JobActions.setLoadingJob(false))
}

export const postJob = (formData, onSuccess) => async (dispatch, getState) => {
    dispatch(JobActions.setLoadingPostJob(true))
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/jobs', {
            userID: mongoUser._id,
            job: formData
        })

        dispatch(addMessage(res.data.message))
        onSuccess(res.data.jobID)

        logEventFB(Events.createJob)
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true, true))
    }

    dispatch(JobActions.setLoadingPostJob(false))
}

export const patchJob = (jobID, updatedFields, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(`/jobs/${jobID}`, {
            userID: mongoUser._id,
            updatedFields
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const repostJob = (jobID, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(`/jobs/repost/${jobID}`, {
            userID: mongoUser._id
        })

        dispatch(addMessage(res.data.message))
        onSuccess()

        logEventFB(Events.repostJob)
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const fetchJobs = (filters, page, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const jobs = getJobs(state)
    const mongoUser = getMongoUser(state)
    if (page != 1 && jobs.length > (page - 1)*PageSizes.jobSearch) {
        onSuccess()
        return
    }

    dispatch(JobActions.setLoadingJobs(true))

    const filtersCopy = {...filters}
    const unwantedKeys = ['title', 'createdAt', 'updatedAt', '__v', 'asMongoFilter']
    unwantedKeys.forEach( key => { delete filtersCopy[key] })

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        page,
        ...filtersCopy,
    })

    try {
        const res = await api.get('/jobs/candidate-search' + queryString)

        if (page === 1) {
            dispatch(JobActions.setJobs(res.data))
        } else {
            dispatch(JobActions.addJobs(res.data))
        }
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(JobActions.setLoadingJobs(false))
}

export const fetchSavedJobFilters = (onSuccess = () => {}) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get('/job-filters/users/' + mongoUser._id)

        dispatch(JobActions.setSavedFilters(res.data))
        onSuccess()
    } catch (error) {
        const errorMessage = 'Error fetching saved filters: ' + 
            (error.response ? error.response?.data?.message : error.message)
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const postJobFilter = (filterTitle, filters, onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(`/job-filters`, {
            userID: mongoUser._id,
            title: filterTitle,
            filters,
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

export const deleteSavedJobFilter = (filterID, onSuccess, onFailure, showSuccessMessage=true) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.delete(`/job-filters/${filterID}`)

        showSuccessMessage && dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = 'Error deleting saved filter: ' +
            (error.response ? error.response?.data?.message : error.message)
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const fetchRecruiterCanPostJobs = () => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(`/jobs/recruiter-can-post-jobs/${mongoUser._id}`)

        dispatch(JobActions.setRecruiterCanPostJobs(res.data))
    } catch (error) {
        const errorMessage = error.response ? 
            error.response?.data?.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const fetchDailyJobPostViewCount = () => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.get(`/job-post-views/daily-applied-count/${mongoUser._id}`)

        dispatch(JobActions.setDailyJobPostViewCount(res.data))
    } catch (error) {
        const errorMessage = error.response ? 
            error.response?.data?.message : error.message
        console.log(errorMessage)
    }
}

export const postJobPostView = (jobID) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/job-post-views', {
            userID: mongoUser._id,
            jobID
        })
    } catch (error) {
        const errorMessage = error.response ? 
            error.response?.data?.message : error.message
        // console.log(errorMessage)
    }
}

// sent when candidate clicks 'Apply' : sets didClickApply to true
export const patchJobPostView = (jobID) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch('/job-post-views/did-click-apply', {
            userID: mongoUser._id,
            jobID
        })
    } catch (error) {
        const errorMessage = error.response ? 
            error.response?.data?.message : error.message
        console.log(errorMessage)
    }
}