import React from 'react'
import styled from 'styled-components'

import { Tooltip } from '../Tooltip'

export const StarRating = props => {
    const {
        starsTotal,
        starsCount,
        reviewCount,
        size, // s | m | l
        shortDisplay=false,

        ...rest
    } = props

    const starsRounded1Decimals = Math.round(starsCount * 10) / 10
    const starsRounded0Decimals = Math.floor(starsCount)
    const actualRatingText = reviewCount === 0 ? 'Unrated' : starsRounded1Decimals + ' / ' + starsTotal

    return (shortDisplay ?
        <Root {...rest} className={`${props.className} ${size} short-display`}>
            <p>{actualRatingText}</p>
            <i className='bi-star-fill star-icon' />
        </Root>
        : <Tooltip {...rest} title={actualRatingText}>
            <Root className={`${props.className} ${size}`}>
                {Array(starsTotal).fill(0).map( (_, i) => i < starsRounded0Decimals ?
                    <i className='bi-star-fill star-icon' />
                    : <i className='bi-star star-icon' />
                )}
            </Root>
        </Tooltip>
    )
}

const Root = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    & .star-icon {
        color: ${p => p.theme.tint};
        margin-left: 10px;
        font-size: 15px;
    }
    & .star-icon:first-child {
        margin-left: 0px;
    }
    &.short-display .star-icon {
        margin-left: 5px;
        color: ${p => p.theme.textSecondary}
    }

    &.m .star-icon {
        font-size: 25px;
    }

    &.l .star-icon {
        font-size: 40px;
    }

    & p {
        color: ${p => p.theme.textSecondary} !important;
    }
`