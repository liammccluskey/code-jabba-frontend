import {AdminActionTypes as Types} from './types'

const AdminState = {
    adminUsers: [],
    loadingAdminUsers: false,
    usersSearchResults: [],
    loadingUsersSearchResults: false
}

export const adminReducer = (state = AdminState, action) => {
    switch (action.type) {
        case Types.SET_ADMIN_USERS:
            return {
                ...state,
                adminUsers: action.value
            }
        case Types.SET_LOADING_ADMIN_USERS:
            return {
                ...state,
                loadingAdminUsers: action.value
            }
        case Types.SET_USERS_SEARCH_RESULTS:
            return {
                ...state,
                usersSearchResults: action.value
            }
        case Types.CLEAR_USERS_SEARCH_RESUTLS:
            return {
                ...state,
                usersSearchResults: []
            }
        case Types.SET_LOADING_USERS_SEARCH_RESULTS:
            return {
                ...state,
                loadingUsersSearchResults: action.value
            }
        default:
            return state
    }
}
