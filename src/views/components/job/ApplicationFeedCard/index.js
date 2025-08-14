import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { capitalizeWords } from '../../../../utils'
import { getApplicationStatusPillColor } from './utils'

import { PillLabel } from '../../common/PillLabel'

export const ApplicationFeedCard = props => {
    const {
        application,
        candidate,
        job,
        selected,

        onClick, // () => void
        
        ...rest
    } = props

    // Utils

    const getStatusUpdateTimestammp = () => {
        const statusUpdateFieldName = application.status === 'applied' ?
            'createdAt'
            : `${application.status}At`

        return moment(application[statusUpdateFieldName]).fromNow()
    }

    return (
        <Root {...rest} onClick={onClick} className={`oh-dark ${selected && 'selected'}`}>
            <div className='header'>
                <h4>{candidate.displayName}</h4>
                <PillLabel
                    title={capitalizeWords(application.status)}
                    color={getApplicationStatusPillColor(application.status)}
                    size='m'
                />
            </div>
            <div className='card-row'>
                <p>{application.candidate.email}</p>
                <p className='timestamp-text'>{getStatusUpdateTimestammp()}</p>
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
        margin-bottom: 10px;
    }

    & .timestamp-text {
        color: ${p => p.theme.textSecondary};
    }

    & .card-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`