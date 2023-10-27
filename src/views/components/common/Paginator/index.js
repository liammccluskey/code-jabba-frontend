import React from 'react'
import styled from 'styled-components'

export const Paginator = props => {
    const {
        page,
        pagesCount,

        onClickIncrementPage,
        onClickDecrementPage,

        ...rest
    } = props

    return (
        <Root {...rest}>
            <i className='left-arrow bi-chevron-left' onClick={onClickDecrementPage} />
            <h4>{pagesCount == 0 ? 0 : page}</h4>
            <h5>of</h5>
            <h4>{pagesCount}</h4>
            <i className='right-arrow bi-chevron-right' onClick={onClickIncrementPage} />
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    //border: 1px solid ${p => p.theme.bc};
    border-radius: 25px;
    background-color: ${p => p.theme.bgcLight};
    overflow: hidden;

    & .left-arrow,
    & .right-arrow {
        color: ${p => p.theme.tint};
        font-size: 20px;
        padding: 5px 15px;
        cursor: pointer;
    }
    & .left-arrow:hover,
    & .right-arrow:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }
    & .left-arrow {
        margin-right: 15px;
    }
    & .right-arrow {
        margin-left: 15px;
    }

    & h5 {
        margin: 0px 15px;
    }

    & h4,
    & h5 {
        color: ${p => p.theme.textMain};
    }
`