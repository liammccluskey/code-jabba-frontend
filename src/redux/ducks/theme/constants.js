export const Colors = {
    yellow: 'rgb(254, 221, 74)',
    yellowTranslucent: 'rgba(254, 221, 74, 0.3)',
    red: '#f04747',
    redTranslucent: 'rgba(240, 71, 71, 0.2)',
    error: '#f04747',
    errorTranslucent: 'rgba(240, 71, 71, 0.2)',
    success: 'rgb(23, 169, 86)',
    successTranslucent: 'rgba(23, 169, 86, 0.3)',
    pageLink: 'rgb(70, 141, 228)',
    pageLinkTranslucent: 'rgba(70, 141, 228, 0.3)',
    orange: '#0e7fb6',
    orangeTranslucent: 'rgba(14, 127, 182, 0.2)',
    blue: '#5a9ff6',
    blueTranslucent: 'rgba(90, 159, 246, 0.2)',
    green: '#17a956',
    greenTranslucent: 'rgba(23, 169, 86, 0.2)',
    purple: '#7288d9',
    purpleTranslucent: 'rgba(114, 137, 218, 0.25)',
    mint: '#189e8a',
    mintTranslucent: 'rgba(24, 158, 138, 0.2)',
    gray: '#6f787d',
    facebookBlue: '#4267B2',
}

const DarkTheme = {
    name: 'Dark',
    bgc: 'black',
    bgcLight: 'rgb(21,24,28)',
    bgcSemilight: 'rgb(15,17,19)',
    bgcHover: 'rgba(249, 252, 255, 0.08)',
    bgcNav: 'rgb(21, 24, 28)',
    bgcSettings: 'rgb(21, 24, 28)',
    bgcInput: 'rgb(38, 41, 45)',
    bc: 'rgb(48, 54, 58)',
    textMain: 'rgb(205,205,205)',
    textPrimary: 'rgb(235, 235, 235)',
    textSecondary: 'rgb(147, 151, 156)',
    textTertiary: 'rgb(121, 124, 125)',
    textYellow: Colors.yellow,
    boxShadow: 'none',
    floatBorder: '1px solid rgb(48, 54, 58)'
}

const LightTheme = {
    name: 'Light',
    bgc: 'rgb(244, 246, 248)',
    bgcLight: 'white',
    bgcSemilight: 'rgb(248, 250, 252)',
    bgcHover: 'rgb(245, 247, 249)',
    bgcNav: 'white',
    bgcSettings: 'white',
    bgcInput: 'rgb(235, 238, 240)',
    bc: 'rgb(215, 222, 226)',
    textMain: 'rgb(60,64,67)',
    textPrimary: 'rgb(10, 12, 14)',
    textSecondary: 'rgb(135, 138, 140)',
    textTertiary: 'rgb(102, 102, 102)',
    textYellow: '#85681d',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
    floatBorder: 'none'
}

const BlueTheme = {
    name: 'Blue',
    bgc: '#0e2439',
    bgcLight: '#1f364d',
    bgcSemilight: '#182e43',
    bgcHover: 'rgba(249, 252, 255, 0.08)',
    bgcNav: '#182e43',
    bgcSettings: '#0e2439',
    bgcInput: '#284059',
    bc: '#325070',
    textMain: 'rgb(225,225,225)',
    textPrimary: 'rgb(245, 245, 245)',
    textSecondary: '#9cb3c9',
    textTertiary: '#63809c',
    textYellow: Colors.yellow,
    boxShadow: 'none',
    floatBorder: 'none'
}

export const Themes = {
    0: LightTheme,
    1: DarkTheme,
    2: BlueTheme
}

export const Tints = {
    0: {
        name: 'Purple',
        tint: Colors.purple,
        tintTranslucent: Colors.purpleTranslucent
    },
    1: {
        name: 'Blue',
        tint: Colors.blue,
        tintTranslucent: Colors.blueTranslucent
    },
    2: {
        name: 'Mint',
        tint: Colors.mint,
        tintTranslucent: Colors.mintTranslucent
    },
    3: {
        name: 'Green',
        tint: Colors.green,
        tintTranslucent: Colors.greenTranslucent
    },
}