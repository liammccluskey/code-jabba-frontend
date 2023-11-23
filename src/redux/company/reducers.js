import {ActionTypes as Types} from './types'

const CompanyState = {
    company: null,
    loadingCompany: false,
    companyNotFound: false,
    companies: {
        loading: false,
        payload: {
            companies: [],
            pagesCount: 0
        }
    }
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
        case Types.SET_COMPANIES:
            return {
                ...state,
                companies: {
                    ...state.companies,
                    payload: action.value
                }
            }
        case Types.ADD_COMPANIES:
            return {
                ...state,
                companies: {
                    ...state.companies,
                    payload: {
                        ...action.value,
                        companies: [...state.companies.payload.companies, ...action.value.companies]
                    }
                }
            }
        case Types.SET_LOADING_COMPANIES:
            return {
                ...state,
                companies: {
                    ...state.companies,
                    loading: action.value
                }
            }
        default:
            return state
    }
}
