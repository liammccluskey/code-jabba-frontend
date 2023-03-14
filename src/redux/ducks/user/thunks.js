import {updateProfile, updateEmail, signOut} from 'firebase/auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import * as UserActions from './actions'
import * as ThemeActions from '../theme'
import * as UserUtils from './utils'
import { getFirebaseUser, getIsLoggedIn, getMongoUser } from './selectors'
import {api, auth, storage, getFirebaseErrorMessage} from '../../../networking'
import { addMessage } from '../communication'

export const fetchThisMongoUser = (
    firebaseUser,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch) => {
    dispatch(UserActions.setLoadingMongoUser(true))
    const {uid} = firebaseUser

    try {
        let getRes = await UserUtils.__fetchMongoUserByuid(uid)
        let postRes = null

        if (!getRes.data) {
            const postRes = await UserUtils.__postMongoUser(firebaseUser)
            dispatch(addMessage(postRes.data.message))
            getRes = await UserUtils.__fetchMongoUserByuid(uid)
        }
        if (!getRes.data) {
            throw Error('There is no user with that uid.')
        }
        dispatch(UserActions.setMongoUser(getRes.data))
        dispatch(ThemeActions.setThemeColor(getRes.data.themeColor))
        dispatch(ThemeActions.setTintColor(getRes.data.tintColor))
        dispatch(UserActions.setLoadingMongoUser(false))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(UserActions.setLoadingMongoUser(false))
        onFailure()
    }
}

export const patchUser = (partialUser, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser(partialUser, _id)
        dispatch(UserActions.updateMongoUser(partialUser))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserDisplayName = (displayName, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        try {
            await updateProfile(firebaseUser, {displayName})
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }
        const res = await UserUtils.__patchMongoUser({displayName}, _id)
        dispatch(UserActions.updateMongoUser({displayName}))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
    
    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserEmail = (email, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        try {
            await updateEmail(firebaseUser, email)
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }
        const res = await UserUtils.__patchMongoUser({email}, _id)
        dispatch(UserActions.updateMongoUser({email}))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
    
    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserPhoto = (photoFile, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const storageRef = ref(storage, `/users/${_id}/photo`)
        const photoURL = getDownloadURL(storageRef)
        try {
            await uploadBytes(storageRef, photoFile)
            await updateProfile(firebaseUser, {photoURL})
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }

        const res = await UserUtils.__patchMongoUser({photoURL}, _id)
        dispatch(UserActions.updateMongoUser({photoURL}))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserThemeColor = (themeColor, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    dispatch(ThemeActions.setThemeColor(themeColor))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser({themeColor}, _id)
        dispatch(UserActions.updateMongoUser({themeColor}))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserTintColor = (tintColor, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    dispatch(ThemeActions.setTintColor(tintColor))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser({tintColor}, _id)
        dispatch(UserActions.updateMongoUser({tintColor}))
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const signOutUser = onSuccess => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingLogout(true))
    try {
        await signOut(auth)
        dispatch(UserActions.clearUser())
        dispatch(UserActions.setLoadingLogout(false))

        onSuccess()
    } catch (error) {
        dispatch(UserActions.setLoadingLogout(false))
        const errorMessage = getFirebaseErrorMessage(error)
        dispatch(addMessage(errorMessage, true))
        console.log(errorMessage)
    }
}