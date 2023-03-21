import { AdminActionTypes as Types } from "./types"

export const setAdminUsers = users => ({
    type: Types.SET_ADMIN_USERS,
    value: users
})

export const setLoadingAdminUsers = loading => ({
    type: Types.SET_LOADING_ADMIN_USERS,
    value: loading
})