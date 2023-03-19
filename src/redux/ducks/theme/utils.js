import {Colors, Themes, Tints} from './constants'

export const generateTheme = (themeColor, tintColor) => {
    return {
        ...Colors,
        ...Themes[themeColor],
        ...Tints[tintColor],
    }
}

export const calculateIsMobile = windowWidth => {
    return windowWidth < 601
}

export const calculateIsSemiMobile = windowWidth => {
    return windowWidth < 801
}