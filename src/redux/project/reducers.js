import {ProjectActionTypes as Types} from './types'

const ProjectState = {
    project: null,
    loadingProject: false,
    isValidAccessCode: false,
}

export const projectReducer = (state = ProjectState, action) => {
    switch (action.type) {
        case Types.SET_PROJECT:
            return {
                ...state,
                project: action.value
            }
        case Types.SET_LOADING_PROJECT:
            return {
                ...state,
                loadingProject: action.value
            }
        case Types.SET_IS_VALID_ACCESS_CODE:
            return {
                ...state,
                isValidAccessCode: action.value
            }
        default:
            return state
    }
}
