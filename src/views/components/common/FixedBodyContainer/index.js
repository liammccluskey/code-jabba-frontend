import styled from 'styled-components'

export const FixedBodyContainer = styled.div`
    background-color: clear;
    padding: 50px var(--ps-body);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    alignItems: flex-start;
    width: 100%;
    height: calc(100% - var(--h-mainheader));
    box-sizing: border-box;

    &.no-subheader {
        height: calc(100% - var(--h-mainheader) - 60px); // TODO : fix last val
    }

    &.no-subheader-links {
        height: calc(100% - var(--h-mainheader) - 60px);
    }
`