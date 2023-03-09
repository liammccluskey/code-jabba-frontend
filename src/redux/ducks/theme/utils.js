import {Colors, Themes, Tints} from './constants'

export const generateTheme = (themeColor, tintColor) => {
    return {
        ...Colors,
        ...Themes[themeColor],
        ...Tints[tintColor],
    }
}