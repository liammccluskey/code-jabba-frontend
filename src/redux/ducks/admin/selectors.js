import {createSelector} from '@reduxjs/toolkit'

export const getAdminUsers = state => state.admin.adminUsers
export const getLoadingAdminUsers = state => state.admin.loadingAdminUsers
