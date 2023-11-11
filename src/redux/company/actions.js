import { ActionTypes as Types } from "./types"

export const setCompany = company => ({
    type: Types.SET_COMPANY,
    value: company
})

export const setLoadingCompany = loading => ({
    type: Types.SET_LOADING_COMPANY,
    value: loading
})

export const setCompanyNotFound = notFound => ({
    type: Types.SET_COMPANY_NOT_FOUND,
    value: notFound
})