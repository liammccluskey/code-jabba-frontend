import { ActionTypes as Types } from "./types"

export const setRecruiterApplicationStats = stats => ({
    type: Types.setRecruiterApplicationStats,
    value: stats
})

export const setLoadingRecruiterApplicationStats = loading => ({
    type: Types.setLoadingRecruiterApplicationStats,
    value: loading
})

export const setCandidateApplicationStats = stats => ({
    type: Types.setCandidateApplicationStats,
    value: stats
})

export const setLoadingCandidateApplicationStats = loading => ({
    type: Types.setLoadingCandidateApplicationStats,
    value: loading
})

export const setRecruiterCompanies = companies => ({
    type: Types.setRecruiterCompanies,
    value: companies
})

export const addRecruiterCompanies = companies => ({
    type: Types.addRecruiterCompanies,
    value: companies
})

export const setLoadingRecruiterCompanies = loading => ({
    type: Types.setLoadingRecruiterCompanies,
    value: loading
})

export const setRecruiterJobs = jobs => ({
    type: Types.setRecruiterJobs,
    value: jobs
})

export const addRecruiterJobs = jobs => ({
    type: Types.addRecruiterJobs,
    value: jobs
})

export const setLoadingRecruiterJobs = loading => ({
    type: Types.setLoadingRecruiterJobs,
    value: loading
})

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

export const setLoadingCandidateApplicationsHeatmap = loading => ({
    type: Types.setLoadingCandidateApplicationsHeatmap,
    value: loading
})

export const setCandidateApplicationsHeatmap = heatmap => ({
    type: Types.setCandidateApplicationsHeatmap,
    value: heatmap
})

export const setLoadingRecruiterApplicationsHeatmap = loading => ({
    type: Types.setLoadingRecruiterApplicationsHeatmap,
    value: loading
})

export const setRecruiterApplicationsHeatmap = heatmap => ({
    type: Types.setRecruiterApplicationsHeatmap,
    value: heatmap
})