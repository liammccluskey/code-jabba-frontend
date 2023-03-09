import styled from 'styled-components'

export const ActionLink = styled.p`
    display: inline;
    cursor: pointer;
    color: ${p => p.theme.tint} !important;
    
    &:hover {
        text-decoration: underline;
    }
`