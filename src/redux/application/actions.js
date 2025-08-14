import { ActionTypes as Types } from "./types"

export const setApplications = applicationsPayload => ({
    type: Types.setApplications,
    value: applicationsPayload
})

export const addApplications = applicationsPayload => ({
    type: Types.setApplications,
    value: applicationsPayload
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

export const setApplicationsFilters = filters => ({
    type: Types.setApplicationsFilters,
    value: filters
})

export const updateApplicationStatusLocally = (applicationID, updatedStatus) => ({
    type: Types.updateApplicationStatusLocally,
    value: {applicationID, updatedStatus}
})