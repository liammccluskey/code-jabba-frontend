import {createSelector} from '@reduxjs/toolkit'

export const getCompany = state => state.company.company
export const getLoadingCompany = state => state.company.loadingCompany
export const getCompanyNotFound = state => state.company.companyNotFound
export const getCompanies = state => state.company.companies.payload.companies
export const getLoadingCompanies = state => state.company.companies.loading
export const getCompaniesPagesCount = state => state.company.companies.payload.pagesCount