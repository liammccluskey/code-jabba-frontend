import React from 'react'
import styled from 'styled-components'

export const SearchBar = props => {
    const {
        value,
        placeholder='',

        onChange,
        onSubmit, // () => void

        ...rest
    } = props

    return (
        <Root {...rest} onSubmit={onSubmit}>
            <i className='bi-search' />
            <input
                className='search-input'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </Root>
    )
}

const Root = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 5px;
    width: 300px;
    padding-left: 10px;
    box-sizing: border-box;

    &:hover {
        border-color: ${p => p.theme.tint};
    }

    & i {
        font-size: 20px;
        color: ${p => p.theme.textSecondary};
        margin-right: 0px;
    }

    & input.search-input {
        flex: 1;
        border: none;
        background-color: transparent;
        margin-top: 0px;
    }

    & input.search-input:active,
    & input.search-input:focus {
        border: none !important;
        margin-top: 0px;
    }
`