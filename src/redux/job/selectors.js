import {createSelector} from '@reduxjs/toolkit'

export const getCompanySearchResults = state => state.job.companySearchResults
export const getLoadingCompanySearchResults = state => state.job.loadingCompanySearchResults
export const getJob = state => state.job.job
export const getLoadingJob = state => state.job.loadingJob
export const getJobNotFound = state => state.job.jobNotFound
export const getCanApplyToJobs = state => state.job.canApplyToJobs