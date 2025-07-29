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
    }
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
                    ...state.recruiter.jobs,
                    payload: action.value
                }
            }
        case Types.addJobs:
            return {
                ...state,
                jobs: {
                    ...state.recruiter.jobs,
                    payload: {
                        pagesCount: action.value.pagesCount,
                        jobs: [...state.recruiter.jobs.payload.jobs, ...action.value.jobs]
                    }
                }
            }
        case Types.setLoadingJobs:
            return {
                ...state,
                jobs: {
                    ...state.recruiter.jobs,
                    loading: action.value
                }
            }
        default:
            return state
    }
}
