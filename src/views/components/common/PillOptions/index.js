import React from 'react'
import styled from 'styled-components'

export const PillOptions = props => {
    const {
        options, // [{title, id}]
        activeOptionID,

        onClickOption, // optionID => void

        ...rest
    } = props

    const leftOption = options[0]
    const middleOptions = options.slice(1, options.length - 1)
    const rightOption = options[options.length - 1]

    return (
        <Root {...rest}>
            <p
                className={`option ${activeOptionID === leftOption.id && 'active'}`}
                onClick={() => onClickOption(leftOption.id)}
            >
                {leftOption.title}
            </p>
            {middleOptions.map( ({id, title}) => (
                <p
                    className={`option ${activeOptionID === id && 'active'}`}
                    onClick={() => onClickOption(id)}
                    key={id}
                >
                    {title}
                </p>
            ))}
            <p
                className={`option ${activeOptionID === rightOption.id && 'active'}`}
                onClick={() => onClickOption(rightOption.id)}
            >
                {rightOption.title}
            </p>
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 15px;
    cursor: pointer;
    overflow: hidden;

    & .option {
        padding: 5px 15px;
        border-right: 1px solid ${p => p.theme.bc};
    }
    & .option:last-child {
        border-right: none;
    }
    & .option:hover {
        color: ${p => p.theme.tint};
    }

    & .active {
        background-color: ${p => p.theme.tintTranslucent};
        color: ${p => p.theme.tint};
    }
`