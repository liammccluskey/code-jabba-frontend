import React from 'react'
import styled from 'styled-components'

export const IconButton = props => {
    const {
        iconClassName,
        size, // 's' | 'm' | 'l'

        onClick,

        ...rest
    } = props

    return (
        <Root {...rest} className={`${size} ${props.className}`} onClick={onClick}>
            <i className={`icon ${iconClassName}`} />
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    &.s {

    }
    &.m {
        height: 30px;
        width: 30px;
    }
    &.l {
        height: 40px;
        width: 40px;
    }

    &.s i {
        font-size: 20px;
    }
    &.m i {
        font-size: 30px;
    }
    &.l i {
        font-size: 40px;
    }

    & .icon {
        color: ${p => p.theme.textSecondary};
    }
    & .icon:hover {
        color: ${p => p.theme.tint};
    }
`