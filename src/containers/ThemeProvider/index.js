import React from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import {getTheme} from '../../redux/ducks/theme'

export const ThemeProviderComponent = props => {
    const {
        children
    } = props

    return (
        <StyledThemeProvider theme={props.theme}>
            {children}
        </StyledThemeProvider>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

export const ThemeProvider = connect(mapStateToProps)(ThemeProviderComponent)

