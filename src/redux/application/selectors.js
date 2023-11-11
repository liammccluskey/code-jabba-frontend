import {createSelector} from '@reduxjs/toolkit'

export const getApplication = state => state.application.application
export const getLoadingApplication = state => state.application.loadingApplication
export const getApplicationNotFound = state => state.application.applicationNotFound
export const getApplications = state => state.application.applications.payload.applications
export const getLoadingApplications = state => state.application.applications.loading
export const getApplicationsPagesCount = state => state.application.applications.payload.pagesCount
export const getApplicationsPage = state => state.application.applications.page
export const getApplicationStats = state => state.application.applicationStats
export const getLoadingApplicationStats = state => state.application.loadingApplicationStats