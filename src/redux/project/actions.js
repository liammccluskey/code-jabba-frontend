import { ProjectActionTypes as Types } from "./types"

export const setProject = project => ({
    type: Types.SET_PROJECT,
    value: project
})

export const setLoadingProject = loading => ({
    type: Types.SET_LOADING_PROJECT,
    value: loading
})

export const setIsValidAccessCode = isValid => ({
    type: Types.SET_IS_VALID_ACCESS_CODE,
    value: isValid
})