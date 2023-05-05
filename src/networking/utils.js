import { FirebaseErrors } from "./constants"

export const stringifyQuery = queryParams => {
    return '?' + Object
        .entries(queryParams)
        .map( ([key, value]) => `${key}=${value}`)
        .join('&')
}

export const getFirebaseErrorMessage = error => {
    if (!error.code) {
        return error.message
    }
    const [type, code] = error.code.split('/')
    return FirebaseErrors[type] && FirebaseErrors[type][code] ?
        FirebaseErrors[type][code]
        : code
}

export const getPaginatedDataForCurrentPage = (data, page, pageSize) => {
    return data.slice((page - 1)*pageSize, page*pageSize)
}