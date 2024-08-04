import * as Actions from './actions'
import {api} from '../../networking'
import { getMongoUser } from '../user'

export const logEvent = eventID => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.post('/events', {
            eventID,
            userID: mongoUser ? mongoUser._id : undefined
        })
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
    }
}