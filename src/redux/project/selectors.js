import {createSelector} from '@reduxjs/toolkit'

export const getProject = state => state.project.project
export const getLoadingProject = state => state.project.loadingProject
export const getProjectNotFound = state => state.project.projectNotFound

export const getIsValidAccessCode = state => state.project.isValidAccessCode

export const getAdminProjects = state => state.project.adminProjects.payload.adminProjects
export const getLoadingAdminProjects = state => state.project.adminProjects.loading
export const getLoadingAdminProjectsFirstPage = state => state.project.adminProjects.loadingFirstPage
export const getCanLoadMoreAdminProjects = state => state.project.adminProjects.payload.canLoadMore
export const getAdminProjectsPagesCount = state => state.project.adminProjects.payload.pagesCount
export const getAdminProjectsTotalCount = state => state.project.adminProjects.payload.totalCount

export const getAccessCodes = state => state.project.accessCodes.payload.accessCodes
export const getLoadingAccessCodes = state => state.project.accessCodes.loading
export const getLoadingAccessCodesFirstPage = state => state.project.accessCodes.loadingFirstPage
export const getCanLoadMoreAccessCodes = state => state.project.accessCodes.payload.canLoadMore
export const getAccessCodesPagesCount = state => state.project.accessCodes.payload.pagesCount
export const getAccessCodesTotalCount = state => state.project.accessCodes.payload.totalCount

export const getThisUserProjects = state => state.project.thisUserProjects.payload.thisUserProjects
export const getLoadingThisUserProjects = state => state.project.thisUserProjects.loading
export const getLoadingThisUserProjectsFirstPage = state => state.project.thisUserProjects.loadingFirstPage
export const getCanLoadMoreThisUserProjects = state => state.project.thisUserProjects.payload.canLoadMore
export const getThisUserProjectsPagesCount = state => state.project.thisUserProjects.payload.pagesCount
export const getThisUserProjectsTotalCount = state => state.project.thisUserProjects.payload.totalCount
