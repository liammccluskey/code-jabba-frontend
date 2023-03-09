import { UserActionTypes as Types } from "./types"

export const setMongoUser = mongoUser => ({
    type: Types.SET_MONGO_USER,
    value: mongoUser
})

export const updateMongoUser = partialUser => ({
    type: Types.UPDATE_USER,
    value: partialUser
})

export const clearUser = () => ({
    type: Types.CLEAR_USER
})

export const setLoadingMongoUser = loading => ({
    type: Types.SET_LOADING_MONGO_USER,
    value: loading
})

export const setLoadingProfileUpdate = loading => ({
    type: Types.SET_LOADING_PROFILE_UPDATE,
    value: loading
})