import {ActionTypes as Types} from './types'

const CompanyState = {
    company: null,
    loadingCompany: false,
    companyNotFound: false,
}

export const companyReducer = (state = CompanyState, action) => {
    switch (action.type) {
        case Types.SET_COMPANY:
            return {
                ...state,
                company: action.value
            }
        case Types.SET_LOADING_COMPANY:
            return {
                ...state,
                loadingCompany: action.value
            }
        case Types.SET_COMPANY_NOT_FOUND:
            return {
                ...state,
                companyNotFound: action.value
            }
        default:
            return state
    }
}
