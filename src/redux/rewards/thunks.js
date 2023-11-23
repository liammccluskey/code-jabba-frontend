import * as RewardsActions from './actions'
import {api, stringifyQuery} from '../../networking'
import { addMessage } from '../communication'
import { getMongoUser } from '../user'

export const sendReferralEmail = (email, message, onSuccess, onFailure) => async (dispatch) => {
    try {
        const res = await api.post('/rewards/send-referral-email', {
            email,
            message
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const fetchRewards = (filters) => async (dispatch, getState) => {
    dispatch(RewardsActions.setLoadingRewards(true))
    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id,
        ...filters
    })

    try {
        const res = await api.get('/rewards/search' + queryString)

        dispatch(RewardsActions.setRewards(res.data))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(RewardsActions.setLoadingRewards(false))
}

export const fetchRewardsStats = () => async (dispatch, getState) => {
    dispatch(RewardsActions.setLoadingRewardsStats(true))

    const state = getState()
    const mongoUser = getMongoUser(state)

    const queryString = stringifyQuery({
        userID: mongoUser._id
    })
    
    try {
        const res = await api.get('/rewards/stats' + queryString)

        dispatch(RewardsActions.setRewardsStats(res.data))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(RewardsActions.setLoadingRewardsStats(false))
}