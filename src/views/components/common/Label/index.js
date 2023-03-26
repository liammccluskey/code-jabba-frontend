import React from 'react'
import styled from 'styled-components'

export const PillLabel = props => {
    const {
        title,
        color, // 'yellow' || 

        ...rest
    } = props

    return (
        <Root {...rest} className={`${color} ${props.className}`}>
            <h6>{title}</h6>
        </Root>
    )
}

const Root = styled.div`
    padding: 1px 5px;
    border: 1px solid;
    border-radius: 10px;

    &.yellow {
        background-color: ${p => p.theme.yellowTranslucent};
        border-color: ${p => p.theme.yellow};
    }
    &.yellow h6 {
        color: ${p => p.theme.textYellow};
    }
`