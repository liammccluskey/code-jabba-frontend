import React from 'react'
import styled from 'styled-components'

export const Checkbox = props => {
    const {
        selected,

        onClick,

        ...rest
    } = props

    return (
        <Root
            {...rest}
            className={`${selected && 'selected'} ${props.className}`}
            onClick={onClick}
        >
            {selected ? <i className='bi-check' /> : null}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 18px;
    width: 18px;
    min-width: 18px;
    min-height: 18px;
    border-radius: 3px;
    border: 1px solid ${p => p.theme.textTertiary};
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    &.selected {
        border-color: ${p => p.theme.tint};
        background-color: ${p => p.theme.tint};
    }

    & i {
        font-size: 24px;
        color: white;
        margin-left: -3px;
    }
`