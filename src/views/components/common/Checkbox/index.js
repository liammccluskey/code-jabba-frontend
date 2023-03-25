import React from 'react'
import styled from 'styled-components'

export const Checkbox = props => {
    const {
        active,

        onClick,

        ...rest
    } = props

    return (
        <Root
            {...rest}
            className={`${active && 'active'} ${props.className}`}
            onClick={onClick}
        >
            {active ? <i className='bi-check' /> : null}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 18px;
    width: 18px;
    border-radius: 3px;
    border: 1px solid ${p => p.theme.textTertiary};

    &.active {
        border-color: ${p => p.theme.tint};
        background-color: ${p => p.theme.tint};
    }

    & i {
        font-size: 24px;
        color: white;
    }
`