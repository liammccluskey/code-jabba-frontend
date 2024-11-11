import * as JobActions from './actions'
import {api} from '../../networking'
import { addMessage } from '../communication'
import { stringifyQuery } from '../../networking'
import { getMongoUser } from '../user'

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

export const fetchJob = (jobID, isForApplications=false) => async (dispatch, getState) => {
    dispatch(JobActions.setLoadingJob(true))
    dispatch(JobActions.setJobNotFound(false))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id
    })

    try {
        const res = await api.get(`/jobs/${jobID}` + queryString)

        if (!isForApplications || isForApplications && res.data.recruiter._id === mongoUser._id) {
            dispatch(JobActions.setJob(res.data))
        }
        else dispatch(JobActions.setJobNotFound(true))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(JobActions.setJobNotFound(true))
    }

    dispatch(JobActions.setLoadingJob(false))
}

export const postJob = (formData, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/jobs', {
            userID: mongoUser._id,
            job: formData
        })

        dispatch(addMessage(res.data.message))
        onSuccess(res.data.jobID)
    } catch (error) {
        
    }
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
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const fetchCanApplyToJob = (onSuccess) => async (dispatch, getState) => {
    dispatch(JobActions.setCanApplyToJob(false))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id
    })

    try {
        const res = await api.get('/applications/can-apply-to-job' + queryString)

        dispatch(JobActions.setCanApplyToJob(res.data.canApply))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}