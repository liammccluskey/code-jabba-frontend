import { ActionTypes as Types } from "./types"

export const setRewardsStats = stats => ({
    type: Types.SET_REWARDS_STATS,
    value: stats
})

export const setLoadingRewardsStats = loading => ({
    type: Types.SET_LOADING_REWARDS_STATS,
    value: loading
})

export const setRewards = rewards => ({
    type: Types.SET_REWARDS,
    value: rewards
})

export const setLoadingRewards = loading => ({
    type: Types.SET_LOADING_REWARDS,
    value: loading
})