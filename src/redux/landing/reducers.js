import {ActionTypes as Types} from './types'

const LandingState = {
    stats: {
        totalActiveJobsCount: 0,
        jobsPostedTodayCount: 0,
    }
}

export const landingReducer = (state = LandingState, action) => {
    switch (action.type) {
        case Types.SET_STATS: 
            return {
                ...state,
                stats: action.value
            }
        default:
            return state
    }
}
