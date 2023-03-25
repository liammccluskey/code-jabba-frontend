import {updateProfile, updateEmail, signOut, deleteUser as deleteFirebaseUser} from 'firebase/auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import * as UserActions from './actions'
import * as ThemeActions from '../theme'
import * as UserUtils from './utils'
import { getFirebaseUser, getIsLoggedIn, getMongoUser } from './selectors'
import {api, auth, storage, getFirebaseErrorMessage} from '../../networking'
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
        dispatch(ThemeActions.setThemeColor(getRes.data.settings.theme.themeColor))
        dispatch(ThemeActions.setTintColor(getRes.data.settings.theme.tintColor))
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

// TODO : unused, consider deleting
export const patchUser = (
    partialUser,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const res = await UserUtils.__patchMongoUser(partialUser, _id)
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserDisplayName = (
    displayName,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
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
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserEmail = (
    email,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
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
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserPhoto = (
    photoFile,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
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
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserSettings = (
    settingPath,
    settingValue,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const res = await UserUtils.__patchMongoUserSettings(settingPath, settingValue, _id)
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserThemeColor = (themeColor, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(ThemeActions.setThemeColor(themeColor))
    dispatch(patchUserSettings('theme.themeColor', themeColor, onSuccess))
}

export const patchUserTintColor = (tintColor, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(ThemeActions.setTintColor(tintColor))
    dispatch(patchUserSettings('theme.tintColor', tintColor, onSuccess))
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

export const deleteUser = onSuccess => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        try {
            await deleteFirebaseUser(firebaseUser)
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }
        const res = await UserUtils.__deleteMongoUser(firebaseUser.uid, _id)
        dispatch(addMessage(res.data.message))
        dispatch(signOutUser(onSuccess))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}