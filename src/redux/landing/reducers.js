import {ActionTypes as Types} from './types'

const LandingState = {
    stats: {
        applicationsCount: 0,
        jobsCount: 0,
        candidatesCount: 0,
        recruitersCount: 0,
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
