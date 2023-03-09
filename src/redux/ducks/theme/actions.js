import { ThemeActionTypes as Types } from "./types"

export const setThemeColor = themeColor => ({
    type: Types.SET_THEME_COLOR,
    value: themeColor
})

export const setTintColor = tintColor => ({
    type: Types.SET_TINT_COLOR,
    value: tintColor
})