import {SupportActionTypes as Types} from './types'

const SupportState = {
    faqs: [],
    loadingFAQs: false,
    faq: null,
    loadingFAQ: false,
    faqNotFound: false
}

export const supportReducer = (state = SupportState, action) => {
    switch (action.type) {
        case Types.SET_FAQS:
            return {
                ...state,
                faqs: action.value
            }
        case Types.SET_LOADING_FAQS:
            return {
                ...state,
                loadingFAQs: action.value
            }
        case Types.SET_FAQ:
            return {
                ...state,
                faq: action.value
            }
        case Types.SET_LOADING_FAQ:
            return {
                ...state,
                loadingFAQ: action.value
            }
        case Types.SET_FAQ_NOT_FOUND:
            return {
                ...state,
                faqNotFound: action.value
            }
        default:
            return state
    }
}
