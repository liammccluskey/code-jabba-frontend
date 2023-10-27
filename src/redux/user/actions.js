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