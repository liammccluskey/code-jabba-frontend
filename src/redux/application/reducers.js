import {ActionTypes as Types} from './types'

const ApplicationState = {
    application: null,
    loadingApplication: false,
    applicationNotFound: false,
    applications: {
        page: 1,
        loading: false,
        filters: undefined,
        payload: {
            applications: [],
            pagesCount: 0
        }
    },
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
}

export const applicationReducer = (state = ApplicationState, action) => {
    switch (action.type) {
        case Types.setApplications:
            return {
                ...state,
                applications: {
                    ...state.applications,
                    payload: action.value
                }
            }
        case Types.addApplications: 
            return {
                ...state,
                applications: {
                    ...state.applications,
                    payload: {
                        ...action.value,
                        applications: [...state.applications.payload.applications, ...action.value.applications]
                    }
                }
            }
        case Types.setLoadingApplications:
            return {
                ...state,
                applications: {
                    ...state.applications,
                    loading: action.value
                }
            }
        case Types.setApplicationsPage:
            return {
                ...state,
                applications: {
                    ...state.applications,
                    page: action.value
                }
            }
        case Types.setApplication:
            return {
                ...state,
                application: action.value
            }
        case Types.setLoadingApplication:
            return {
                ...state,
                loadingApplication: action.value
            }
        case Types.setApplicationNotFound:
            return {
                ...state,
                applicationNotFound: action.value
            }
        case Types.setApplicationStats:
            return {
                ...state,
                applicationStats: action.value
            }
        case Types.setLoadingApplicationStats:
            return {
                ...state,
                loadingApplicationStats: action.value
            }
        case Types.setApplicationsFilters: {
            return {
                ...state,
                applications: {
                    ...state.applications,
                    filters: action.value
                }
            }
        }
        case Types.updateApplicationStatusLocally:
            return {
                ...state,
                application: {
                    ...state.application,
                    status: action.value.updatedStatus,
                },
            }
        default:
            return state
    }
}
