import { SupportActionTypes as Types } from "./types"

export const setFAQs = faqs => ({
    type: Types.SET_FAQS,
    value: faqs
})

export const setLoadingFAQs = loading => ({
    type: Types.SET_LOADING_FAQS,
    value: loading
})

export const setFAQ = faq => ({
    type: Types.SET_FAQ,
    value: faq
})

export const setLoadingFAQ = loading => ({
    type: Types.SET_LOADING_FAQ,
    value: loading
})

export const setFAQNotFound = notFound => ({
    type: Types.SET_FAQ_NOT_FOUND,
    value: notFound
})