import {ActionTypes as Types} from './types'

const JobState = {
    companySearchResults: [],
    loadingCompanySearchResults: false,
    job: null,
    loadingJob: false,
    jobNotFound: false,
    jobs: {
        loading: false,
        payload: {
            jobs: [],
            pagesCount: 0
        }
    },
    savedFilters: [],
    savedFilterID: null,
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
        case Types.setJobs:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    payload: action.value
                }
            }
        case Types.addJobs:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    payload: {
                        pagesCount: action.value.pagesCount,
                        jobs: [...state.jobs.payload.jobs, ...action.value.jobs]
                    }
                }
            }
        case Types.setLoadingJobs:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    loading: action.value
                }
            }
        case Types.setSavedFilters:
            return {
                ...state,
                savedFilters: action.value
            }
        case Types.setSavedFilterID: 
            return {
                ...state,
                savedFilterID: action.value
            }
        default:
            return state
    }
}
