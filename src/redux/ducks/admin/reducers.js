import {AdminActionTypes as Types} from './types'

const AdminState = {
    adminUsers: [],
    loadingAdminUsers: false
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
        default:
            return state
    }
}
