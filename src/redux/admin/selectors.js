import {createSelector} from '@reduxjs/toolkit'

export const getAdminUsers = state => state.admin.adminUsers
export const getLoadingAdminUsers = state => state.admin.loadingAdminUsers

export const getUsersSearchResults = state => state.admin.usersSearchResults
export const getLoadingUsersSearchResults = state => state.admin.loadingUsersSearchResults

export const getBugReports = state => state.admin.bugReports.payload.bugReports
export const getLoadingBugReports = state => state.admin.bugReports.loading
export const getLoadingBugReportsFirstPage = state => state.admin.bugReports.loadingFirstPage
export const getCanLoadMoreBugReports = state => state.admin.bugReports.payload.canLoadMore
export const getBugReportsPagesCount = state => state.admin.bugReports.payload.pagesCount
export const getBugReportsTotalCount = state => state.admin.bugReports.payload.totalCount

export const getBugReport = state => state.admin.bugReport
export const getLoadingBugReport = state => state.admin.loadingBugReport
export const getBugReportNotFound = state => state.admin.bugReportNotFound

export const getBugReportStats = state => state.admin.bugReportStats
export const getLoadingBugReportStats = state => state.admin.loadingBugReportStats

export const getFAQs = state => state.admin.faqs.payload.faqs
export const getLoadingFAQs = state => state.admin.faqs.payload.loadingFAQs
export const getLoadingFAQsFirstPage = state => state.admin.faqs.loadingFirstPage
export const getCanLoadMoreFAQs = state => state.admin.faqs.payload.canLoadMore
export const getFAQsPagesCount = state => state.admin.faqs.payload.pagesCount
export const getFAQsTotalCount = state => state.admin.faqs.payload.totalCount

export const getFAQ = state => state.admin.faq
export const getLoadingFAQ = state => state.admin.loadingFAQ
export const getFAQNotFound = state => state.admin.faqNotFound
