import React, {useEffect} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import styled from 'styled-components'

import {getTheme, getIsMobile, calculateIsMobile} from '../../redux/ducks/theme'

export const ThemeProviderComponent = props => {
    const {
        children
    } = props

    useEffect(() => {
        const handleResize = e => {
            const width = window.innerWidth
            const isMobile = width < 601
            if (isMobile !== props.isMobile) {
                props.calculateIsMobile(width)
            }
        }
        props.calculateIsMobile(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [props.isMobile])

    return (
        <div>
            <StyledThemeProvider theme={props.theme}>
                {children}
            </StyledThemeProvider>
        </div>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
    isMobile: getIsMobile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    calculateIsMobile
}, dispatch)

export const ThemeProvider = connect(mapStateToProps, mapDispatchToProps)(ThemeProviderComponent)

