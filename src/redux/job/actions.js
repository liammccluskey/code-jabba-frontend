import { ActionTypes as Types } from "./types"

export const setCompanySearchResults = results => ({
    type: Types.setCompanySearchResults,
    value: results
})

export const setLoadingCompanySearchResults = loading => ({
    type: Types.setLoadingCompanySearchResults,
    value: loading
})

export const setJob = job => ({
    type: Types.setJob,
    value: job
})

export const setLoadingJob = loading => ({
    type: Types.setLoadingJob,
    value: loading
})

export const setJobNotFound = notFound => ({
    type: Types.setJobNotFound,
    value: notFound
})

export const setJobs = jobsPayload => ({
    type: Types.setJobs,
    value: jobsPayload
})

export const addJobs = jobsPayload => ({
    type: Types.addJobs,
    value: jobsPayload
})

export const setLoadingJobs = loading => ({
    type: Types.setLoadingJobs,
    value: loading
})

export const setSavedFilters = filters => ({
    type: Types.setSavedFilters,
    value: filters
})

export const setLoadingPostJob = loading => ({
    type: Types.setLoadingPostJob,
    value: loading
})

export const setRecruiterCanPostJobs = canPostJobs => ({
    type: Types.setRecruiterCanPostJobs,
    value: canPostJobs
})