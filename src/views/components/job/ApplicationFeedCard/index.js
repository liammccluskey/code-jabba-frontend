import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { Tooltip } from '../../common/Tooltip'
import { PillLabel } from '../../common/PillLabel'
import { PageLink } from '../../common/PageLink'

export const ApplicationFeedCard = props => {
    const {
        application,
        candidate,
        job,
        selected,

        onClick, // () => void
        
        ...rest
    } = props

    return (
        <Root {...rest} onClick={onClick} className={`oh-dark ${selected && 'selected'}`}>
            <div className='header'>
                <p>{candidate.displayName}</p>
                <p className='time-applied-text'>{moment(application.createdAt).fromNow()}</p>
            </div>
            
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
    padding-left: 12px;
    border-bottom: 1px solid ${p => p.theme.bc};
    border-left: 3px solid transparent;

    &.selected {
        border-left: 3px solid ${p => p.theme.tint};
    }

    & .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    & .time-applied-text {
        color: ${p => p.theme.textSecondary};
    }
`