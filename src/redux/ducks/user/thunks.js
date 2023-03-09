import {updateProfile, updateEmail, signOut} from 'firebase/auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import * as UserActions from './actions'
import * as ThemeActions from '../theme'
import * as UserUtils from './utils'
import { getFirebaseUser } from './selectors'
import {api, auth, storage} from '../../../networking'
import {getMongoUser} from './selectors'
import { addMessage } from '../communication'

export const fetchThisMongoUser = (firebaseUser, onSuccess) => async (dispatch) => {
    dispatch(UserActions.setLoadingMongoUser(true))
    const {uid} = firebaseUser

    try {
        let getRes = await UserUtils.__fetchMongoUserByuid(uid)

        if (!getRes.data) {
            const postRes = await UserUtils.__postMongoUser(firebaseUser)
            dispatch(addMessage(postRes.data.message))
            getRes = await UserUtils.__fetchMongoUserByuid(uid)
        }
        dispatch(UserActions.setMongoUser(getRes.data))
        dispatch(ThemeActions.setThemeColor(getRes.data.themeColor))
        dispatch(ThemeActions.setTintColor(getRes.data.tintColor))
        dispatch(UserActions.setLoadingMongoUser(false))
        onSuccess()
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingMongoUser(false))
}

export const patchMongoUser = partialUser => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser(partialUser, _id)
        dispatch(UserActions.updateMongoUser(partialUser))
        dispatch(addMessage(res.data.message))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserDisplayName = displayName => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        updateProfile(firebaseUser, {displayName})
        const res = await UserUtils.__patchMongoUser({displayName}, _id)
        dispatch(UserActions.updateMongoUser({displayName}))
        dispatch(addMessage(res.data.message))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }
    
    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserEmail = email => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        updateEmail(firebaseUser, {email})
        const res = await UserUtils.__patchMongoUser({email}, _id)
        dispatch(UserActions.updateMongoUser({email}))
        dispatch(addMessage(res.data.message))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }
    
    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserPhoto = photoFile => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const storageRef = ref(storage, `/users/${_id}/photo`)
        const photoURL = getDownloadURL(storageRef)
        await uploadBytes(storageRef, photoFile)
        await updateProfile(firebaseUser, {photoURL})
        const res = await UserUtils.__patchMongoUser({photoURL}, _id)
        dispatch(UserActions.updateMongoUser({photoURL}))
        dispatch(addMessage(res.data.message))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserThemeColor = themeColor => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    dispatch(ThemeActions.setThemeColor(themeColor))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser({themeColor}, _id)
        dispatch(UserActions.updateMongoUser({themeColor}))
        dispatch(addMessage(res.data.message, true))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const patchUserTintColor = tintColor => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingProfileUpdate(true))
    dispatch(ThemeActions.setTintColor(tintColor))
    const state = getState()
    const {_id} = getMongoUser(state)

    try {
        const res = await UserUtils.__patchMongoUser({tintColor}, _id)
        dispatch(UserActions.updateMongoUser({tintColor}))
        dispatch(addMessage(res.data.message, true))
    } catch (error) {
        console.log(error)
        dispatch(addMessage(error.response.data.message, true))
    }

    dispatch(UserActions.setLoadingProfileUpdate(false))
}

export const signOutUser = onSuccess => async dispatch => {
    try {
        await signOut(auth)
        dispatch(UserActions.clearUser())
        onSuccess()
    } catch (error) {
        console.log(error)
    }
}