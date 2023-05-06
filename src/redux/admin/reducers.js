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
            bugReports: [],
            canLoadMore: false,
            pagesCount: 0,
            totalCount: 0,
        }
    },
    bugReport: null,
    loadingBugReport: false,
    bugReportNotFound: false,
    bugReportStats: {
        reportsCount: 0,
        resolvedCount: 0,
        archivedCount: 0,
        reportsPercentDelta: 0,
        resolvedPercentDelta: 0,
        archivedPercentDelta: 0,
    },
    loadingBugReportStats: false,
    faqs: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            faqs: [],
            canLoadMore: false,
            pagesCount: 0,
            totalCount: 0
        }
    },
    faq: null,
    loadingFAQ: false,
    faqNotFound: false,

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
        case Types.SET_BUG_REPORT:
            return {
                ...state,
                bugReport: action.value
            }
        case Types.SET_LOADING_BUG_REPORT:
            return {
                ...state,
                loadingBugReport: action.value
            }
        case Types.SET_BUG_REPORT_NOT_FOUND:
            return {
                ...state,
                bugReportNotFound: action.value
            }
        case Types.SET_BUG_REPORT_STATS:
            return {
                ...state,
                bugReportStats: action.value
            }
        case Types.SET_LOADING_BUG_REPORT_STATS:
            return {
                ...state,
                loadingBugReportStats: action.value
            }
        case Types.SET_FAQS_DATA:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    payload: action.value
                }
            }
        case Types.ADD_FAQS_DATA:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    payload: {
                        ...state.faqs.payload,
                        faqs: [
                            ...state.faqs.payload.faqs,
                            ...action.value
                        ]
                    }
                }
            }
        case Types.SET_LOADING_FAQS:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_FAQS_FIRST_PAGE:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    loadingFirstPage: action.value
                }
            }
        case Types.UPDATE_FAQS:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    payload: {
                        ...state.faqs.payload,
                        faqs: state.faqs.payload.faqs.map(faq => action.value.faqIDs.includes(faq._id) ?
                            {...faq, ...updatedFields}
                            : faq
                        )
                    }
                }
            }
        case Types.DELETE_FAQS:
            return {
                ...state,
                faqs: {
                    ...state.faqs,
                    payload: {
                        ...state.faqs.payload,
                        faqs: state.faqs.payload.faqs.filter( faq => !action.faqIDs.includes(faq._id) )
                    }
                }
            }
        case Types.SET_FAQ:
            return {
                ...state,
                faq: action.value
            }
        case Types.SET_LOADING_FAQ:
            return {
                ...state,
                loadingFAQ: action.value
            }
        case Types.SET_FAQ_NOT_FOUND:
            return {
                ...state,
                faqNotFound: action.value
            }
        default:
            return state
    }
}
