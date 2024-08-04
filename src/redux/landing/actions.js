import { ActionTypes as Types } from "./types"

export const setStats = stats => ({
    type: Types.SET_STATS,
    value: stats
})