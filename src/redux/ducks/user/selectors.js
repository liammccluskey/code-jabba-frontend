import {createSelector} from '@reduxjs/toolkit'
import {auth} from '../../../networking'

export const getMongoUser = state => state.user.mongoUser
export const getFirebaseUser = () => auth.currentUser
export const getLoadingMongoUser = state => state.user.loadingMongoUser
export const getLoadingProfileUpdate = state => state.user.loadingProfileUpdate
export const getLoadingLogout = state => state.user.loadingLogout

export const getUser = createSelector(
    [
        getMongoUser,
        getFirebaseUser
    ],
    (mongoUser, firebaseUser) => ({
        ...mongoUser,
        ...firebaseUser,
    })
)

export const getIsLoggedIn = createSelector(
    [
        getMongoUser,
        getFirebaseUser
    ],
    (mongoUser, firebaseUser) => !!mongoUser && !!firebaseUser
)