import styled from 'styled-components'

export const FloatContainer = styled.div`
    border-radius: var(--br-container);
    border: ${p => p.theme.floatBorder};
    padding: none;
    overflow: hidden;
    background-color: ${p => p.theme.bgcLight};
    box-shadow: ${p => p.theme.boxShadow};
`