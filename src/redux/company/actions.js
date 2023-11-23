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

export const setCompanies = companies => ({
    type: Types.SET_COMPANIES,
    value: companies
})

export const addCompanies = companies => ({
    type: Types.ADD_COMPANIES,
    value: companies
})

export const setLoadingCompanies = loading => ({
    type: Types.SET_LOADING_COMPANIES,
    value: loading
})