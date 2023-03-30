import {createSelector} from '@reduxjs/toolkit'

export const getSupportFAQs = state => state.support.faqs
export const getLoadingSupportFAQs = state => state.support.loadingFAQs
export const getSupportFAQ = state => state.support.faq
export const getLoadingSupportFAQ = state => state.support.loadingFAQ
export const getSupportFAQNotFound = state => state.support.faqNotFound