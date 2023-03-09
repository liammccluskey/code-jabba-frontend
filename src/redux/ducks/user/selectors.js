import {createSelector} from '@reduxjs/toolkit'
import {auth} from '../../../networking'

export const getMongoUser = state => state.user.getMongoUser
export const getFirebaseUser = () => auth.currentUser
export const getUser = createSelector(
    [
        getMongoUser,
        getFirebaseUser
    ],
    (mongoUser, firebaseUser) => ({
        ...mongoUser,
        ...firebaseUser
    })
)
export const getIsLoggedIn = createSelector(
    [
        getMongoUser,
        getFirebaseUser
    ],
    (mongoUser, firebaseUser) => mongoUser && firebaseUser
)