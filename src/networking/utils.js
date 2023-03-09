import { FirebaseAuthErrors } from "./constants"

export const stringifyQuery = (queryParams) => {
    return Object
        .entries(queryParams)
        .map( (key, value) => `${key}=${value}`)
        .join('&')
}

export const getFirebaseAuthErrorMessage = error => {
    const errorCode = error.code.replace('auth/', '')
    return FirebaseAuthErrors[errorCode] || errorCode
}