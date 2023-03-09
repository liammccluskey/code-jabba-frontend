import {api} from '../../../networking'

export const __fetchMongoUserByuid = async uid => {
    try {
        const res = await api.get(`/users/uid/${uid}`)
        return res
    } catch (error) {
        throw(error)
    }
}

export const __fetchMongoUserBy_id = async _id => {
    try {
        const res = await api.get(`/users/_id/${_id}`)
        return res
    } catch (error) {
        throw(error)
    }
}

export const __postMongoUser = async firebaseUser => {
    const {
        displayName,
        email,
        photoURL,
        uid
    } = firebaseUser

    try {
        const res = await api.post('/users', {
            displayName,
            email,
            photoURL,
            uid
        })
        return res
    } catch (error) {
        throw(error)
    }
}

export const __patchMongoUser = async (partialUser, _id) => {
    try {
        const res = await api.patch(`/users/${_id}`, partialUser)
        return res
    } catch (error) {
        throw(error)
    }
}