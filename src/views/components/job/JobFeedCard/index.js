import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import {
    EmploymentTypes,
    SettingTypes,
    PositionTypes,
} from '../EditJobCard'
import { formatSalary, formatSalaryRange, getJobExperienceLevel } from '../JobCard/utils'

import { Tooltip } from '../../common/Tooltip'
import { PillLabel } from '../../common/PillLabel'
import { PageLink } from '../../common/PageLink'

export const JobFeedCard = props => {
    const {
        job,
        selected,

        onClick, // () => void
        
        ...rest
    } = props

    return (
        <Root {...rest} onClick={onClick} className={`oh-dark ${selected && 'selected'}`}>
            <div className='header'>
                <p>{job.title}</p>
                <p className='time-posted-text'>{moment(job.createdAt).fromNow()}</p>
            </div>
            <div className='body'>
                <div className='section-1'>
                    <PageLink
                        title={job.company.name}
                        url={`/companies/${job.company._id}`}
                        openInNewTab={true}
                    />
                    <p style={{marginRight: 5, marginLeft: 5}}>-</p>
                    <p>{job.location || 'Remote'}</p>
                </div>
                <div className='section-2'>
                    {job.salaryType === 'range' ?
                        job.salaryFrequency === 'hour' ?
                            <Tooltip
                                title={`Estimated: ${formatSalaryRange(job.estimatedSalaryMin, job.estimatedSalaryMax, 'year')}`}
                            >
                                <p className='salary-text'>
                                    {formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryFrequency)}
                                </p>
                            </Tooltip>
                            : <p className='salary-text'>
                                {formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryFrequency)}
                            </p>
                    : job.salaryType === 'exact' ?
                        job.salaryFrequency === 'hour' ?
                        <Tooltip
                            title={`Estimated: ${formatSalary(job.estimatedSalaryMin, 'year')}`}
                        >
                            <p className='salary-text'>
                                {formatSalary(job.salaryExact, job.salaryFrequency)}
                            </p>
                        </Tooltip>
                        : <p className='salary-text'>
                            {formatSalary(job.salaryExact, job.salaryFrequency)}
                        </p>
                    : <p className='salary-text'>Salary not provided</p>
                    }
                </div>
                <div className='section-2'>
                    <PillLabel
                        title={SettingTypes.find( settingType => settingType.id === job.setting).title}
                        color='blue'
                        size='m'
                        style={{marginRight: 5}}
                    />
                    <PillLabel
                        title={EmploymentTypes.find( type => type.id === job.employmentType).title}
                        color='blue'
                        size='m'
                        style={{marginRight: 5}}
                    />
                    <PillLabel
                        title={PositionTypes.find( positionType => positionType.id === job.position).title}
                        color='blue'
                        size='m'
                        style={{marginRight: 5}}
                    />
                    <PillLabel
                        title={getJobExperienceLevel(job.minExperienceLevel, job.maxExperienceLevel)}
                        color='yellow'
                        size='m'
                        style={{marginRight: 5}}
                    />
                </div>
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

    &:last-child {
        border-bottom: none;
    }

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

    & .body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    & .section-1 {
        margin-bottom: 4px;
        display: flex;
        align-items: center;
    }
    & .section-2 {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    & .salary-text,
    & .time-posted-text {
        color: ${p => p.theme.textSecondary};
    }
`