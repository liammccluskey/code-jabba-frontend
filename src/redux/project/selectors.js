import {createSelector} from '@reduxjs/toolkit'

export const getProject = state => state.project.project
export const getLoadingProject = state => state.project.loadingProject
export const getIsValidAccessCode = state => state.project.isValidAccessCode