import React from 'react'
import styled from 'styled-components'

export const PillLabel = props => {
    const {
        title,
        color, // 'yellow' || 'green' || 'orange' || 'red' || 'blue' | 'clear'
        size, // 's' | 'm' | 'l'

        ...rest
    } = props

    return (
        <Root {...rest} className={`${color} ${size} ${props.className}`}>
            {size === 's' ?
                <h6>{title}</h6>
            : size === 'm' ?
                <h5>{title}</h5>
                : <h4>{title}</h4>
            }
        </Root>
    )
}

const Root = styled.div`
    border: 1px solid;
    border: none;
    white-space: nowrap;

    &.clear {
        background-color: transparent;
        border-color: ${p => p.theme.bc} !important;
        border: 1px solid;
    }
    &.clear h6,
    &.clear h5,
    &.clear h4 {
        color: ${p => p.theme.textMain};
    }

    &.yellow {
        background-color: ${p => p.theme.yellowTranslucent};
        border-color: ${p => p.theme.textYellow};
    }
    &.yellow h6,
    &.yellow h5,
    &.yellow h4 {
        color: ${p => p.theme.textYellow};
    }
    &.orange {
        background-color: ${p => p.theme.orangeTranslucent};
        border-color: ${p => p.theme.orange};
    }
    &.orange h6,
    &.orange h5,
    &.orange h4 {
        color: ${p => p.theme.orange};
    }
    &.green {
        background-color: ${p => p.theme.greenTranslucent};
        border-color: ${p => p.theme.green};
    }
    &.green h6,
    &.green h5,
    &.green h4 {
        color: ${p => p.theme.green};
    }
    &.red {
        background-color: ${p => p.theme.brightRedTranslucent};
        border-color: ${p => p.theme.brightRed};
    }
    &.red h6,
    &.red h5,
    &.red h4 {
        color: ${p => p.theme.brightRed};
    }
    &.blue {
        background-color: ${p => p.theme.blueTranslucent};
        border-color: ${p => p.theme.blue};
    }
    &.blue h6,
    &.blue h5,
    &.blue h4 {
        color: ${p => p.theme.blue};
    }

    &.s {
        padding: 1px 5px;
        border-radius: 10px;
    }
    &.m {
        padding: 3px 7px;
        border-radius: 13px;
    }
    &.l {
        padding: 5px 10px;
        border-radius: 20px;
    }
`