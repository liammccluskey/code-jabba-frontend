import React from 'react'
import styled from 'styled-components'

export const ActionLink = props => {
    const {
        title,
        size='s', // 's' | 'm'

        onClick, // () => void

        ...rest
    } = props

    return (
        <Root
            {...rest}
            onClick={onClick}
            className={`${size} ${props.className}`}
        >
            {title}
        </Root>
    )
}

const Root = styled.p`
    display: inline;
    cursor: pointer;
    color: ${p => p.theme.tint} !important;

    &:hover {
        text-decoration: underline;
    }

    &.s {
        font-size: 14px !important;
    }
    &.m {
        font-size: 16px !important;
    }
`