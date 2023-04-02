import React from 'react'
import styled from 'styled-components'

export const ValidLabel = props => {
    const {
        isValid,
        validMessage,
        invalidMessage,

        ...rest
    } = props

    return (isValid ?
        <Root {...rest}>
            <i className='bi-check-circle-fill check-icon' />
            <h5>{validMessage}</h5>
        </Root>
        : <Root {...rest} className={`invalid ${props.className}`}>
            <i className='bi-x-circle-fill x-icon' />
            <h5>{invalidMessage}</h5>
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 5px;
    background-color: ${p => p.theme.successTranslucent};
    border: 1px solid ${p => p.theme.success};

    &.invalid {
        background-color: ${p => p.theme.errorTranslucent};
        border-color: ${p => p.theme.error};
    }

    & .x-icon,
    & .check-icon {
        font-size: 20px;
        margin-right: 10px;
    }

    & .check-icon {
        color: ${p => p.theme.success};
    }

    & .x-icon {
        color: ${p => p.theme.error};
    }
`