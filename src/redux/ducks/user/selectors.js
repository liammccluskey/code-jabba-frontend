import {createSelector} from '@reduxjs/toolkit'
import {auth} from '../../../networking'
import { isAdmin, isSuperAdmin } from './utils'

export const getMongoUser = state => state.user.mongoUser
export const getFirebaseUser = () => auth.currentUser
export const getLoadingMongoUser = state => state.user.loadingMongoUser
export const getLoadingProfileUpdate = state => state.user.loadingProfileUpdate
export const getLoadingLogout = state => state.user.loadingLogout

export const getHasAdminPrivileges = createSelector(
    [
        getMongoUser
    ],
    (mongoUser) => mongoUser && (isAdmin(mongoUser) || isSuperAdmin(mongoUser))
)

export const getHasSuperAdminPrivileges = createSelector(
    [
        getMongoUser
    ],
    (mongoUser) => mongoUser && isSuperAdmin(mongoUser)
)

export const getUser = createSelector(
    [
        getFirebaseUser,
        getMongoUser
    ],
    (firebaseUser, mongoUser) => ({
        ...firebaseUser,
        ...mongoUser,
    })
)

export const getIsLoggedIn = createSelector(
    [
        getMongoUser,
        getFirebaseUser
    ],
    (mongoUser, firebaseUser) => !!mongoUser && !!firebaseUser
)