import {createSelector} from '@reduxjs/toolkit'

export const getCompany = state => state.company.company
export const getLoadingCompany = state => state.company.loadingCompany
export const getCompanyNotFound = state => state.company.companyNotFound