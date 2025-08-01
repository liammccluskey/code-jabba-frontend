import { FirebaseErrors } from "./constants"

export const stringifyQuery = queryParams => {
    return '?' + Object
        .entries(queryParams)
        .map( ([key, value]) => Array.isArray(value) ?
            value.map(item => `${key}[]=${item}`).join('&')
            : `${key}=${value}`
        )
        .filter(item => item.length > 0)
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