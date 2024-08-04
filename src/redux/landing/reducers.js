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
        default:
            return state
    }
}
