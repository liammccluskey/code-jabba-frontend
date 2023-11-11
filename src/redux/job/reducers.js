import {ActionTypes as Types} from './types'

const JobState = {
    companySearchResults: [],
    loadingCompanySearchResults: false,
    job: null,
    loadingJob: false,
    jobNotFound: false,
}

export const jobReducer = (state = JobState, action) => {
    switch (action.type) {
        case Types.setCompanySearchResults:
            return {
                ...state,
                companySearchResults: action.value
            }
        case Types.setLoadingCompanySearchResults:
            return {
                ...state,
                loadingCompanySearchResults: action.value
            }
        case Types.setJob:
            return {
                ...state,
                job: action.value
            }
        case Types.setLoadingJob:
            return {
                ...state,
                loadingJob: action.value
            }
        case Types.setJobNotFound:
            return {
                ...state,
                jobNotFound: action.value
            }
        default:
            return state
    }
}
