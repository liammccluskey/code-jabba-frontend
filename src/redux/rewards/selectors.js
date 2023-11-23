import {createSelector} from '@reduxjs/toolkit'

export const getRewardsStats = state => state.rewards.stats
export const getLoadingRewardsStats = state => state.rewards.loadingStats
export const getRewards = state => state = state.rewards.rewards.payload.rewards
export const getLoadingRewards = state => state.rewards.rewards.loading 
export const getRewardsPagesCount = state => state.rewards.rewards.payload.pagesCount
