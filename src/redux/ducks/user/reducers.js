import {UserActionTypes as Types} from './types'

const UserState = {
    mongoUser: null,
    loadingMongoUser: false,
    loadingProfileUpdate: false,
    loadingLogout: false,

    // calculated,
    firebaseUser: null,
    user: null,
    isLoggedIn: false,
    hasAdminPrivileges: false,
    hasSuperAdminPrivileges: false,
}

export const userReducer = (state = UserState, action) => {
    switch (action.type) {
        case Types.SET_MONGO_USER:
            return {
                ...state,
                mongoUser: action.value
            }
        case Types.UPDATE_MONGO_USER:
            return {
                ...state,
                mongoUser: {
                    ...state.mongoUser,
                    ...action.value
                }
            }
        case Types.CLEAR_USER:
            return {
                ...state,
                mongoUser: null,
            }
        case Types.SET_LOADING_MONGO_USER:
            return {
                ...state,
                loadingMongoUser: action.value
            }
        case Types.SET_LOADING_PROFILE_UPDATE:
            return {
                ...state,
                loadingProfileUpdate: action.value
            }
        case Types.SET_LOADING_LOGOUT:
            return {
                ...state,
                loadingLogut: action.value
            }
        default:
            return state
    }
}
