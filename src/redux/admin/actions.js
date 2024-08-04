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

export const setBugReport = bugReport => ({
    type: Types.SET_BUG_REPORT,
    value: bugReport
})

export const setLoadingBugReport = loading => ({
    type: Types.SET_LOADING_BUG_REPORT,
    value: loading
})

export const setBugReportNotFound = notFound => ({
    type: Types.SET_BUG_REPORT_NOT_FOUND,
    value: notFound
})

export const setBugReportStats = statistics => ({
    type: Types.SET_BUG_REPORT_STATS,
    value: statistics
})

export const setLoadingBugReportStats = loading => ({
    type: Types.SET_LOADING_BUG_REPORT_STATS,
    value: loading
})

export const setFAQsData = faqsData => ({
    type: Types.SET_FAQS_DATA,
    value: faqsData
})

export const addFAQsData = faqsData => ({
    type: Types.ADD_FAQS_DATA,
    value: faqsData
})

export const setLoadingFAQs = loading => ({
    type: Types.SET_LOADING_FAQS,
    value: loading
})

export const setLoadingFAQsFirstPage = loading => ({
    type: Types.SET_LOADING_FAQS_FIRST_PAGE,
    value: loading
})

export const updateFAQs = (faqIDs, updatedFields) => ({
    type: Types.UPDATE_FAQS,
    faqIDs,
    updatedFields
})

export const __deleteFAQs = faqIDs => ({
    type: Types.DELETE_FAQS,
    faqIDs
})

export const setFAQ = faq => ({
    type: Types.SET_FAQ,
    value: faq
})

export const setLoadingFAQ = loading => ({
    type: Types.SET_LOADING_FAQ,
    value: loading
})

export const setFAQNotFound = notFound => ({
    type: Types.SET_FAQ_NOT_FOUND,
    value: notFound
})

export const setUserStats = stats => ({
    type: Types.SET_USER_STATS,
    value: stats
})

export const setLoadingUserStats = loading => ({
    type: Types.SET_LOADING_USER_STATS,
    value: loading
})

export const setSiteStats = stats => ({
    type: Types.SET_SITE_STATS,
    value: stats
})

export const setLoadingSiteStats = loading => ({
    type: Types.SET_LOADING_SITE_STATS,
    value: loading
})

export const setEvents = events => ({
    type: Types.SET_EVENTS,
    value: events
})

export const setLoadingEvents = loading => ({
    type: Types.SET_LOADING_EVENTS,
    value: loading
})