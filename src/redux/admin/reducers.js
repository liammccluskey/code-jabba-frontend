import {AdminActionTypes as Types} from './types'

const AdminState = {
    adminUsers: [],
    loadingAdminUsers: false,
    usersSearchResults: [],
    loadingUsersSearchResults: false,
    bugReports: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            bugReports: [], // [{title, description, reporter, resolved, highPriority, archived, createdAt}]
            pagesCount: 0,
            canLoadMore: false,
            totalCount: 0,
        }
    },
}

export const adminReducer = (state = AdminState, action) => {
    switch (action.type) {
        case Types.SET_ADMIN_USERS:
            return {
                ...state,
                adminUsers: action.value
            }
        case Types.SET_LOADING_ADMIN_USERS:
            return {
                ...state,
                loadingAdminUsers: action.value
            }
        case Types.SET_USERS_SEARCH_RESULTS:
            return {
                ...state,
                usersSearchResults: action.value
            }
        case Types.CLEAR_USERS_SEARCH_RESUTLS:
            return {
                ...state,
                usersSearchResults: []
            }
        case Types.SET_LOADING_USERS_SEARCH_RESULTS:
            return {
                ...state,
                loadingUsersSearchResults: action.value
            }
        case Types.SET_BUG_REPORTS_DATA:
            const bugReportsData = action.value
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    payload: bugReportsData
                }
            }
        case Types.ADD_BUG_REPORTS_DATA:
            const newBugReportsData = action.value
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    payload: {
                        ...state.bugReports.payload,
                        bugReports: [
                            ...state.bugReports.payload.bugReports,
                            ...newBugReportsData.bugReports
                        ]
                    }
                }
            }
        case Types.SET_LOADING_BUG_REPORTS:
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_BUG_REPORTS_FIRST_PAGE:
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    loadingFirstPage: action.value
                }
            }
        case Types.DELETE_BUG_REPORTS:
            const {bugReportIDsToDelete} = action
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    payload: {
                        ...state.bugReports.payload,
                        bugReports: state
                            .bugReports
                            .payload
                            .bugReports.filter(({_id}) => !bugReportIDsToDelete.includes(_id))
                    }
                }
            }
        case Types.UPDATE_BUG_REPORTS:
            const {bugReportIDsToUpdate, updatedFields} = action
            return {
                ...state,
                bugReports: {
                    ...state.bugReports,
                    payload: {
                        ...state.bugReports.payload,
                        bugReports: state
                            .bugReports
                            .payload
                            .bugReports.map(bugReport => bugReportIDsToUpdate.includes(bugReport._id) ?
                                {...bugReport, ...updatedFields}
                                : bugReport
                            )
                    }
                }
            }
        default:
            return state
    }
}
