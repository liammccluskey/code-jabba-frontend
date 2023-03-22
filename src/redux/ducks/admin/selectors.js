import {createSelector} from '@reduxjs/toolkit'

export const getAdminUsers = state => state.admin.adminUsers
export const getLoadingAdminUsers = state => state.admin.loadingAdminUsers
export const getUsersSearchResults = state => state.admin.usersSearchResults
export const getLoadingUsersSearchResults = state => state.admin.loadingUsersSearchResults