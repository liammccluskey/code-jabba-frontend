import { ThemeActionTypes as Types } from "./types"

export const setThemeColor = themeColor => ({
    type: Types.SET_THEME_COLOR,
    value: themeColor
})

export const setTintColor = tintColor => ({
    type: Types.SET_TINT_COLOR,
    value: tintColor
})

export const setIsMobile = isMobile => ({
    type: Types.SET_IS_MOBILE,
    value: isMobile
})

export const setIsSemiMobile = isSemiMobile => ({
    type: Types.SET_IS_SEMI_MOBILE,
    value: isSemiMobile
})