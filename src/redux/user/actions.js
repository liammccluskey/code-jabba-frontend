import { UserActionTypes as Types } from "./types"

export const setMongoUser = mongoUser => ({
    type: Types.SET_MONGO_USER,
    value: mongoUser
})

export const updateMongoUser = partialUser => ({
    type: Types.UPDATE_MONGO_USER,
    value: partialUser
})

export const clearUser = () => ({
    type: Types.CLEAR_USER
})

export const setLoadingMongoUser = loading => ({
    type: Types.SET_LOADING_MONGO_USER,
    value: loading
})

export const setLoadingLogout = loading => ({
    type: Types.SET_LOADING_LOGOUT,
    value: loading
})

export const setLoadingSignIn = loading => ({
    type: Types.SET_LOADING_SIGN_IN,
    value: loading
})

export const setIsRecruiterMode = isRecruiterMode => ({
    type: Types.SET_IS_RECRUITER_MODE,
    value: isRecruiterMode
})

export const setProfileUser = user => ({
    type: Types.SET_PROFILE_USER,
    value: user
})

export const setLoadingProfileUser = loading => ({
    type: Types.SET_LOADING_PROFILE_USER,
    value: loading
})

export const setProfileUserNotFound = notFound => ({
    type: Types.SET_PROFILE_USER_NOT_FOUND,
    value: notFound
})

export const setUserStats = stats => ({
    type: Types.SET_USER_STATS,
    value: stats
})

export const setLoadingUserStats = loading => ({
    type: Types.SET_LOADING_USER_STATS,
    value: loading
})