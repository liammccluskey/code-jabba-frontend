import {ThemeActionTypes as Types} from './types'

const ThemeState = {
    tintColor: 0,
    themeColor: 0,
    isMobile: false,

    // calculated
    theme: null
}

export const themeReducer = (state = ThemeState, action) => {
    switch (action.type) {
        case Types.SET_THEME_COLOR:
            return {
                ...state,
                themeColor: action.value
            }
        case Types.SET_TINT_COLOR:
            return {
                ...state,
                tintColor: action.value
            }
        case Types.CALCUALTE_IS_MOBILE:
            return {
                ...state,
                isMobile: action.windowWidth < 601
            }
        default:
            return state
    }
}
