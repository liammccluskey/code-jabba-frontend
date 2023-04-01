import React from 'react'
import styled from 'styled-components'

export const IconButton = props => {
    const {
        iconClassName,
        size, // 's' | 'm' | 'l'
        showHoverOutline=true,

        onClick,

        ...rest
    } = props

    return (
        <Root {...rest} className={`${size} ${props.className} ${showHoverOutline && 'hover-outline'}`} onClick={onClick}>
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

    &.hover-outline:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    &.s {
        height: 25px;
        width: 25px;
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
        font-size: 18px;
    }
    &.m i {
        font-size: 25px;
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