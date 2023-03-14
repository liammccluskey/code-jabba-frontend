import React from 'react'
import styled from 'styled-components'

export const Tooltip = props => {
    const {
        children,
        title,

        ...rest
    } = props

    return (
        <Root {...rest}>
            {children}
            <h5 className='tooltip-text'>
                {title}
            </h5>
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;

    &:hover .tooltip-text {
        visibility: visible;
    }
    & .tooltip-text {
        visibility: hidden;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 2px 10px;
        height: 30px;
        margin-top: -36px;
        border-radius: 5px;
        background-color: var(--bgc-light);
        pointer-events: none;
        position: absolute;
        overflow: auto;
        white-space: nowrap;
        box-shadow: ${p => p.theme.boxShadow};
        border: 1px solid ${p => p.theme.bc};
        background-color: ${p => p.theme.bgcLight};
    }
`