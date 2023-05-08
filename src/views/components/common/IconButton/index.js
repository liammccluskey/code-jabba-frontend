import React from 'react'
import styled from 'styled-components'

export const IconButton = props => {
    const {
        icon,
        size, // 's' | 'm' | 'l'
        showHoverOutline=true,
        color='', // 'tint' | 'white'

        onClick,

        ...rest
    } = props

    return (
        <Root
            {...rest}
            className={`${size} ${props.className} ${showHoverOutline && 'hover-outline'} ${color}`}
            onClick={onClick}
        >
            <i className={`icon ${icon}`} />
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

    &.white .icon {
        color: white;
    }
    &.tint .icon {
        color: ${p => p.theme.tint};
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