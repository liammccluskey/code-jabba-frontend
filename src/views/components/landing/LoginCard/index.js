
import styled from 'styled-components'

export const LoginCard = styled.div`
    border-radius: var(--br-container);
    padding: none;
    overflow: hidden;
    background-color: ${p => p.theme.bgcLight};
    box-shadow: ${p => p.theme.boxShadow};
    box-sizing: border-box;
    width: 450px;
    max-width: 450px;
    padding: 30px 30px;
    text-align: left;
    margin: 0 auto;
    border: 1px solid ${p => p.theme.bc};
    overflow: visible;

    @media only screen and (max-width: 601px) {
        & {
            width: 100%;
        }
    }

    & label {
        font-weight: 500 !important;
    }
`