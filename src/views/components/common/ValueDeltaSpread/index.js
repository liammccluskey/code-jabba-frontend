import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import { getIsMobile } from '../../../../redux/theme'

export const ValueDeltaSpreadComponent = props => {
    const {
        values, // [{title, value, percentDelta}]
        timePeriod,
        isMobile,

        ...rest
    } = props

    return (
        <Root {...rest} className={`${isMobile && 'mobile'} ${props.className}`}>
            {values.map(({title, value, percentDelta}) => (
                <div className={`value-container`} key={title}>
                    <h2 className='value-text'>{value}</h2>
                    <p className='title-text'>{title}</p>
                    <div className='d-flex jc-center ai-center'>
                        {percentDelta >= 0 ?
                            <i className='delta-arrow bi-arrow-up-short' />
                            : <i className='delta-arrow bi-arrow-down-short' />
                        }
                        <p className={`delta-text ${percentDelta >= 0 ? 'pos' : 'neg'}`}>
                            {percentDelta}%
                        </p>
                        <p className='time-text'>vs. last {timePeriod}</p>
                    </div>
                </div>
            ))}
        </Root>
    )
}

const mapStateToProps = state => ({
    isMobile: getIsMobile(state)
})

export const ValueDeltaSpread = connect(mapStateToProps)(ValueDeltaSpreadComponent)

const Root = styled.div`
    display: flex;
    overflow: scroll !important;
    
    & .value-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        border-right: 1px solid ${p => p.theme.bc};
        padding: 0px 15px;
    }
    & .value-container:last-child {
        border-right: none;
    }

    & .value-text {
        margin-bottom: 4px;
    }

    & .title-text {
        color: ${p => p.theme.textSecondary} !important;
        margin-bottom: 7px;
    }

    & .delta-arrow {
        margin-right: 3px;
    }
    & .delta-text {
        margin-right: 8px;
    }

    & .bi-arrow-up-short,
    & .delta-text.pos {
        color: ${p => p.theme.success};
    }

    & .bi-arrow-down-short,
    & .delta-text.neg {
        color: ${p => p.theme.error};
    }

    & .time-text {
        color: ${p => p.theme.textTertiary};
    }

    &.mobile .time-text {
        display: none;
    }

`