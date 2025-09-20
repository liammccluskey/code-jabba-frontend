import { FirebaseErrors } from "./constants"

const encodeSpecialCharacters = value => {
    if (typeof value !== 'string') return value

    let ret = value.replace(/#/g, '%23')
    ret = ret.replace(/\+/g, '%2B')

    return ret
}

export const stringifyQuery = queryParams => {
    return '?' + Object
        .entries(queryParams)
        .map( ([key, value]) => Array.isArray(value) ?
            value.map(item => `${key}[]=${encodeSpecialCharacters(item)}`).join('&')
            : `${key}=${encodeSpecialCharacters(value)}`
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

export const hasLoadedPageResults = (page, pageSize, results) => {
    return (page != 1 && results.length > (page - 1)*pageSize)
}