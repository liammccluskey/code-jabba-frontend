import {generateTheme} from './utils'
import {createSelector} from '@reduxjs/toolkit'

export const getThemeColor = state => state.theme.themeColor
export const getTintColor = state => state.theme.tintColor
export const getIsMobile = state => state.theme.isMobile
export const getIsSemiMobile = state => state.theme.isSemiMobile

export const getTheme = createSelector(
    [
        getThemeColor,
        getTintColor
    ],
    (themeColor, tintColor) => generateTheme(themeColor, tintColor)
)