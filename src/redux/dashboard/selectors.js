import {createSelector} from '@reduxjs/toolkit'

export const getRecruiterApplicationStats = state => state.dashboard.recruiter.applicationStats
export const getLoadingRecruiterApplicationStats = state => state.dashboard.recruiter.loadingApplicationStats
export const getCandidateApplicationStats = state => state.dashboard.candidate.applicationStats
export const getLoadingCandidateApplicationStats = state => state.dashboard.candidate.loadingApplicationStats
export const getRecruiterCompanies = state => state.dashboard.recruiter.companies.payload.companies
export const getLoadingRecruiterCompanies = state => state.dashboard.recruiter.companies.loading
export const getRecruiterCompaniesPagesCount = state => state.dashboard.recruiter.companies.payload.pagesCount
export const getRecruiterJobs = state => state.dashboard.recruiter.jobs.payload.jobs
export const getLoadingRecruiterJobs = state => state.dashboard.recruiter.jobs.loading
export const getRecruiterJobsPagesCount = state => state.dashboard.recruiter.jobs.payload.pagesCount
export const getApplications = state => state.dashboard.candidate.applications.payload.applications
export const getLoadingApplications = state => state.dashboard.candidate.applications.loading 
export const getApplicationsPagesCount = state => state.dashboard.candidate.applications.payload.pagesCount