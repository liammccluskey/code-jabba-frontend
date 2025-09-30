import * as CompanyActions from './actions'
import {api, stringifyQuery, PageSizes} from '../../networking'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'
import { getCompanies } from './selectors'
import { logEventFB, Events } from '../events'

export const fetchCompany = (companyID) => async (dispatch, getState) => {
    dispatch(CompanyActions.setLoadingCompany(true))
    dispatch(CompanyActions.setCompanyNotFound(false))

    try {
        const res = await api.get(`/companies/${companyID}`)

        dispatch(CompanyActions.setCompany(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(CompanyActions.setCompanyNotFound(true))
    }
    dispatch(CompanyActions.setLoadingCompany(false))
}

export const postCompany = (company, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post(`/companies`, {
            company,
            userID: mongoUser._id
        })

        dispatch(addMessage(res.data.message))
        onSuccess(res.data.companyID)

        logEventFB(Events.createCompany)
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const searchCompanies = (searchText, page) => async (dispatch, getState) => {
    const state = getState()
    const companies = getCompanies(state)
    if (page != 1 && companies.length > (page - 1)*PageSizes.candidateApplicationSearch) return

    dispatch(CompanyActions.setLoadingCompanies(true))

    const queryString = stringifyQuery({
        name: searchText,
        page
    })

    try {
        const res = await api.get('/companies/search' + queryString)

        if (page == 1) {
            dispatch(CompanyActions.setCompanies(res.data))
        } else {
            dispatch(CompanyActions.addCompanies(res.data))
        }
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(CompanyActions.setLoadingCompanies(false))
}

export const updateCompany = (companyID, updatedCompany, onSuccess) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch(`/companies/${companyID}`, {
            company: updatedCompany,
            userID: mongoUser._id
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}