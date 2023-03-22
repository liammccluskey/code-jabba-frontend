import { AdminActionTypes as Types } from "./types"

export const setAdminUsers = users => ({
    type: Types.SET_ADMIN_USERS,
    value: users
})

export const setLoadingAdminUsers = loading => ({
    type: Types.SET_LOADING_ADMIN_USERS,
    value: loading
})

export const setUsersSearchResults = users => ({
    type: Types.SET_USERS_SEARCH_RESULTS,
    value: users
})

export const clearUsersSearchResults = () => ({
    type: Types.CLEAR_USERS_SEARCH_RESUTLS,
})

export const setLoadingUsersSearchResults = loading => ({
    type: Types.SET_LOADING_USERS_SEARCH_RESULTS,
    value: loading
})