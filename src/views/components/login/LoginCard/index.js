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
    flex: 1;
    padding: 40px 40px;
    text-align: left;
    margin: 0 auto;
    border: 1px solid ${p => p.theme.bc};

    @media only screen and (max-width: 500px) {
        & {
            width: 100%;
        }
    }
`