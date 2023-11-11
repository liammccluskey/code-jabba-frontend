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