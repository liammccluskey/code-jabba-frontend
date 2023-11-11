import * as CompanyActions from './actions'
import {api} from '../../networking'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'

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
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}