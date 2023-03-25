import React, {useEffect} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import styled from 'styled-components'

import {
    getTheme,
    getIsMobile,
    getIsSemiMobile,
    setIsMobile,
    setIsSemiMobile,
    calculateIsMobile,
    calculateIsSemiMobile
} from '../../redux/theme'

export const ThemeProviderComponent = props => {
    const {
        children
    } = props

    useEffect(() => {
        const handleResize = e => {
            const width = window.innerWidth
            const isMobile = calculateIsMobile(width)
            const isSemiMobile = calculateIsSemiMobile(width)

            if (isMobile != props.isMobile) {
                props.setIsMobile(isMobile)
            }
            if (isSemiMobile != props.isSemiMobile) {
                props.setIsSemiMobile(isSemiMobile)
            }
        }
        props.setIsMobile(calculateIsMobile(window.innerWidth))
        props.setIsSemiMobile(calculateIsSemiMobile(window.innerWidth))

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [props.isMobile, props.isSemiMobile])

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
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsMobile,
    setIsSemiMobile
}, dispatch)

export const ThemeProvider = connect(mapStateToProps, mapDispatchToProps)(ThemeProviderComponent)

