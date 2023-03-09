import styled from 'styled-components'

export const PageContainer = styled.div`
    background-color: ${p => p.theme.bgc};
    height: 100vh;
    width: 100vw;
    overflow: scroll;
    display: flex;
    justify-content: flex-start;
    alignItems: stretch;
    flex-direction: column;

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
`