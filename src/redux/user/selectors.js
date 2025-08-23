import {createSelector} from '@reduxjs/toolkit'

import {auth} from '../../networking'
import { isAdmin, isSuperAdmin } from './utils'
import { SubscriptionTiers } from './constants'

export const getMongoUser = state => state.user.mongoUser
export const getFirebaseUser = () => auth.currentUser
export const getLoadingMongoUser = state => state.user.loadingMongoUser
export const getLoadingLogout = state => state.user.loadingLogout
export const getLoadingSignIn = state => state.user.loadingSignIn
export const getIsRecruiterMode = state => state.user.isRecruiterMode
export const getProfileUser = state => state.user.profileUser
export const getLoadingProfileUser = state => state.user.loadingProfileUser
export const getProfileUserNotFound = state => state.user.profileUserNotFound
export const getUserStats = state => state.user.userStats
export const getLoadingUserStats = state => state.user.loadingUserStats

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

export const getIsCandidatePremiumUser = createSelector(
    [
        getMongoUser
    ],
    mongoUser => mongoUser && 
        mongoUser.subscription && 
        mongoUser.subscription.tier === SubscriptionTiers.candidatePremium &&
        mongoUser.subscription.status === 'active'
)

export const getIsRecruiterPremiumUser = createSelector(
    [
        getMongoUser
    ],
    mongoUser => mongoUser && 
        mongoUser.subscription &&
        mongoUser.subscription.tier === SubscriptionTiers.recruiterPremium &&
        mongoUser.subscription.status === 'active'
)

export const getIsPremiumUser = createSelector(
    [
        getIsCandidatePremiumUser,
        getIsRecruiterPremiumUser
    ],
    (isCandidatePremiumUser, isRecruiterPremiumUser) => isCandidatePremiumUser || isRecruiterPremiumUser
)