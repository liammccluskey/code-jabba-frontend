import {ActionTypes as Types} from './types'

const RewardsState = {
    stats: {
        referralsCount: 0,
        claimedReferralsCount: 0,
        unclaimedReferralsCount: 0,
    },
    loadingStats: false,
    rewards: {
        loading: false,
        payload: {
            rewards: [],
            pagesCount: 0,
        }
    }
}

export const rewardsReducer = (state = RewardsState, action) => {
    switch (action.type) {
        case Types.SET_REWARDS_STATS:
            return {
                ...state,
                stats: action.value
            }
        case Types.SET_LOADING_REWARDS_STATS:
            return {
                ...state,
                loadingStats: action.value
            }
        case Types.SET_REWARDS:
            return {
                ...state,
                rewards: {
                    ...state.rewards,
                    payload: action.value
                }
            }
        case Types.SET_LOADING_REWARDS:
            return {
                ...state,
                rewards: {
                    ...state.rewards,
                    loading: action.value
                }
            }
        default:
            return state
    }
}
