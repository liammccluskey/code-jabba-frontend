import { AdminActionTypes as Types } from "./types"

export const setAdminUsers = users => ({
    type: Types.SET_ADMIN_USERS,
    value: users
})

export const setLoadingAdminUsers = loading => ({
    type: Types.SET_LOADING_ADMIN_USERS,
    value: loading
})

export const setUsersSearchResults = users => ({
    type: Types.SET_USERS_SEARCH_RESULTS,
    value: users
})

export const clearUsersSearchResults = () => ({
    type: Types.CLEAR_USERS_SEARCH_RESUTLS,
})

export const setLoadingUsersSearchResults = loading => ({
    type: Types.SET_LOADING_USERS_SEARCH_RESULTS,
    value: loading
})

export const setBugReportsData = bugReports => ({
    type: Types.SET_BUG_REPORTS_DATA,
    value: bugReports
})

export const addBugReportsData = bugReports => ({
    type: Types.ADD_BUG_REPORTS_DATA,
    value: bugReports
})

export const setLoadingBugReports = loading => ({
    type: Types.SET_LOADING_BUG_REPORTS,
    value: loading
})

export const setLoadingBugReportsFirstPage = loading => ({
    type: Types.SET_LOADING_BUG_REPORTS_FIRST_PAGE,
    value: loading
})

export const __deleteBugReports = bugReportIDs => ({
    type: Types.DELETE_BUG_REPORTS,
    bugReportIDsToDelete: bugReportIDs
})

export const updateBugReports = (bugReportIDs, updatedFields) => ({
    type: Types.UPDATE_BUG_REPORTS,
    bugReportIDsToUpdate: bugReportIDs,
    updatedFields
})