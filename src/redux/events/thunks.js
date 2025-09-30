import { logEvent as __logEventFB } from 'firebase/analytics'

import * as Actions from './actions'
import {analytics, api} from '../../networking'
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

// Log firebase event -> not really a thunk but makes most sense to put it here
export const logEventFB = (eventID, payload=undefined) => {
    __logEventFB(analytics, eventID, payload)
}