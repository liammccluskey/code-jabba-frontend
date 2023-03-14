import React from 'react'
import styled from 'styled-components'

export const CssProvider = props => {
    const {
        children
    } = props

    return (
        <Root>
            {children}
        </Root>
    )
}

const Root = styled.div`
    h1, h2, h3,
    h4, h5, h6 {
        color: ${p => p.theme.textPrimary};
    }

    p {
        color: ${p => p.theme.textMain};
    }

    label {
        color: ${p => p.theme.textMain};
        font-weight: 400;
        font-size: 14px;
    }

    ::placeholder {
        color: ${p => p.theme.textSecondary};
    }

    input, input:active, input:focus,
    textarea, textarea:active, textarea:focus,
    select, select:active, select:focus {
        color: ${p => p.theme.textMain};
        border: 1px solid transparent;
        border-radius: 5px;
        padding: 11px 10px;
        outline: none;
        font-size: 14px;
        background-color: ${p => p.theme.bgcInput};
        margin-top: 5px;
    }

    input:focus, input:active,
    textarea:active, textarea:focus,
    select:active, select:focus {
        border-color: ${p => p.theme.tint};
        background-color: transparent;
        transition: 0.2s;
    }

    /* classes */
    .c-t {
        color: ${p => p.theme.tint};
    }

    .c-ts {
        color: ${p => p.theme.textSecondary};
    }

    .oh-dark {
        cursor: pointer;
    }
    .oh-dark:hover {
        background-color: ${p => p.theme.bgcHover};
    }

    .oh-c-t:hover {
        color: ${p => p.theme.tint};
    }

    .bgc-bgc-nav {
        background-color: ${p => p.theme.bgcNav};
    }

    /* components */
    .float-container {
        border-radius: var(--br-container);
        border: ${p => p.theme.floatBorder};
        padding: none;
        overflow: hidden;
        background-color: ${p => p.theme.bgcLight};
        box-shadow: ${p => p.theme.boxShadow};
    }

`