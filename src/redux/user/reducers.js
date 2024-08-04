import {UserActionTypes as Types} from './types'

const UserState = {
    mongoUser: null,
    loadingMongoUser: false,
    loadingLogout: false,
    loadingSignIn: false,
    loadingUserFetch: false,
    isRecruiterMode: null,
    profileUser: null,
    loadingProfileUser: false,
    profileUserNotFound: false,
    userStats: {
        candidatesCount: 0,
        recruitersCount: 0,
    },

    // calculated
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
        case Types.SET_LOADING_LOGOUT:
            return {
                ...state,
                loadingLogut: action.value
            }
        case Types.SET_LOADING_SIGN_IN:
            return {
                ...state,
                loadingSignIn: action.value
            }
        case Types.SET_IS_RECRUITER_MODE:
            return {
                ...state,
                isRecruiterMode: action.value
            }
        case Types.SET_PROFILE_USER:
            return {
                ...state,
                profileUser: action.value
            }
        case Types.SET_LOADING_PROFILE_USER:
            return {
                ...state,
                loadingProfileUser: action.value
            }
        case Types.SET_PROFILE_USER_NOT_FOUND:
            return {
                ...state,
                profileUserNotFound: action.value
            }
        case Types.SET_USER_STATS:
            return {
                ...state,
                userStats: action.value
            }
        case Types.SET_LOADING_USER_STATS:
            return {
                ...state,
                loadingUserStats: action.value
            }
        default:
            return state
    }
}
