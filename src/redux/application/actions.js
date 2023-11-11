import { ActionTypes as Types } from "./types"

export const setApplications = applications => ({
    type: Types.setApplications,
    value: applications
})

export const addApplications = applications => ({
    type: Types.addApplications,
    value: applications
})

export const setLoadingApplications = loading => ({
    type: Types.setLoadingApplications,
    value: loading
})

export const setApplicationsPage = page => ({
    type: Types.setApplicationsPage,
    value: page
})

export const setApplication = application => ({
    type: Types.setApplication,
    value: application
})

export const setLoadingApplication = loading => ({
    type: Types.setLoadingApplication,
    value: loading
})

export const setApplicationNotFound = notFound => ({
    type: Types.setApplicationNotFound,
    value: notFound
})

export const setApplicationStats = stats => ({
    type: Types.setApplicationStats,
    value: stats
})

export const setLoadingApplicationStats = loading => ({
    type: Types.setLoadingApplicationStats,
    value: loading
})