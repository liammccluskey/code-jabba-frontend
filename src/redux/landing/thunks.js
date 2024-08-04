import * as LandingActions from './actions'
import {api} from '../../networking'
import { addMessage } from '../communication'

export const fetchLandingStats = () => async dispatch => {
    try {
        const res = await api.get('/stats/landing-stats')

        dispatch(LandingActions.setStats(res.data))
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}