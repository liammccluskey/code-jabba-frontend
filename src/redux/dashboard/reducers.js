import {ActionTypes as Types} from './types'

const DashboardState = {
    recruiter: {
        loadingApplicationStats: false,
        applicationStats: {
            submittedCount: 0,
            viewedCount: 0,
            rejectedCount: 0,
            acceptedCount: 0,
            submittedPercentDelta: 0,
            viewedPercentDelta: 0,
            rejectedPercentDelta: 0,
            acceptedPercentDelta: 0,
        },
        loadingApplicationsHeatmap: false,
        applicationsHeatmap: {
            count: 0,
            max: 0,
            data: {},
        },
        companies: {
            loading: false,
            payload: {
                companies: [],
                pagesCount: 0,
            }
        }, 
        jobs: {
            loading: false,
            payload: {
                jobs: [],
                pagesCount: 0
            }
        }
    },
    candidate: {
        loadingApplicationStats: false,
        applicationStats: {
            submittedCount: 0,
            viewedCount: 0,
            rejectedCount: 0,
            acceptedCount: 0,
            submittedPercentDelta: 0,
            viewedPercentDelta: 0,
            rejectedPercentDelta: 0,
            acceptedPercentDelta: 0,
        },
        loadingApplicationsHeatmap: false,
        applicationsHeatmap: {
            count: 0,
            max: 0,
            data: {},
        },
        applications: {
            loading: false,
            payload: {
                applications: [],
                pagesCount: 0
            }
        }
    },
}

export const dashboardReducer = (state = DashboardState, action) => {
    switch (action.type) {
        case Types.setRecruiterApplicationStats:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    applicationStats: action.value
                }
            }
        case Types.setLoadingRecruiterApplicationStats:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    loadingApplicationStats: action.value
                }
            }
        case Types.setCandidateApplicationStats:
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    applicationStats: action.value
                }
            }
        case Types.setLoadingCandidateApplicationStats:
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    loadingApplicationStats: action.value
                }
            }
        case Types.setRecruiterCompanies:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    companies: {
                        ...state.recruiter.companies,
                        payload: action.value
                    }
                }
            }
        case Types.addRecruiterCompanies:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    companies: {
                        ...state.recruiter.companies,
                        payload: {
                            ...action.value,
                            companies: [...state.recruiter.companies.payload.companies, ...action.value.companies]
                        }
                    }
                }
            }
        case Types.setLoadingRecruiterCompanies:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    companies: {
                        ...state.recruiter.companies,
                        loading: action.value
                    }
                }
            }
        case Types.setRecruiterJobs:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    jobs: {
                        ...state.recruiter.jobs,
                        payload: action.value
                    }
                }
            }
        case Types.addRecruiterJobs:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    jobs: {
                        ...state.recruiter.jobs,
                        payload: {
                            ...action.value,
                            companies: [...state.recruiter.jobs.payload.jobs, ...action.value.jobs]
                        }
                    }
                }
            }
        case Types.setLoadingRecruiterJobs:
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    jobs: {
                        ...state.recruiter.jobs,
                        loading: action.value
                    }
                }
            }
        case Types.setApplications:
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    applications: {
                        ...state.candidate.applications,
                        payload: action.value
                    }
                }
            }
        case Types.addApplications:
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    applications: {
                        ...state.candidate.applications,
                        payload: {
                            ...action.value,
                            companies: [...state.candidate.applications.payload.applications, ...action.value.applications]
                        }
                    }
                }
            }
        case Types.setLoadingApplications:
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    applications: {
                        ...state.candidate.applications,
                        loading: action.value
                    }
                }
            }
        case Types.setLoadingCandidateApplicationsHeatmap: {
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    loadingApplicationsHeatmap: action.value
                }
            }
        }
        case Types.setCandidateApplicationsHeatmap: {
            return {
                ...state,
                candidate: {
                    ...state.candidate,
                    applicationsHeatmap: action.value
                }
            }
        }
        case Types.setLoadingRecruiterApplicationsHeatmap: {
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    loadingApplicationsHeatmap: action.value
                }
            }
        }
        case Types.setRecruiterApplicationsHeatmap: {
            return {
                ...state,
                recruiter: {
                    ...state.recruiter,
                    applicationsHeatmap: action.value
                }
            }
        }
        default:
            return state
    }
}
