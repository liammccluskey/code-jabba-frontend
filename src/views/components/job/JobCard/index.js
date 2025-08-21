import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getMongoUser,
    getIsRecruiterMode,
    getIsCandidatePremiumUser,
} from '../../../../redux/user'
import { getIsMobile } from '../../../../redux/theme'
import {
    patchJob,
    fetchJob,
    repostJob,
} from '../../../../redux/job'
import { postApplication } from '../../../../redux/application'
import { addMessage } from '../../../../redux/communication'
import {
    EmploymentTypes,
    SettingTypes,
    PositionTypes,
    ExperienceLevels,
    ExperienceYears,
    VisaSponsorshipOptions
} from '../EditJobCard'
import {
    formatSalary,
    formatSalaryRange
} from './utils'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'

import { OptionsMenu } from '../../menus/OptionsMenu'
import { PageLink } from '../../common/PageLink'
import { PillLabel } from '../../common/PillLabel'
import { Tooltip } from '../../common/Tooltip'
import { Button } from '../../common/Button'
import { PendingMessage } from '../../common/PendingMessage'

export const JobCardComponent = props => {
    const {
        job,
        hideable=false,

        onJobUpdate = () => {}, // () => {}

        ...rest
    } = props
    const navigate = useNavigate()
    const [isJobRecruiter, setIsJobRecruiter] = useState(false)
    const [optionsMenuHidden, setOptionsMenuHidden] = useState(true)
    const [expanded, setExpanded] = useState(!hideable)
    const [loadingPostApplication, setLoadingPostApplication] = useState(false)

    const sortedJobLanguages = !props.loadingJob && job ?
        [...job.languages].sort((a, b) => a.localeCompare(b))
        : []
    const sortedJobSkills = !props.loadingJob && job ?
        [...job.skills].sort((a, b) => a.localeCompare(b))
        : []

    const userHasLanguage = language => {
        return props.mongoUser.languages.includes(language)
    }

    const userHasSkill = skill => {
        return props.mongoUser.skills.includes(skill)
    }

    useEffect(() => {
        job && setIsJobRecruiter(props.mongoUser._id === job.recruiter._id)
    }, [job])

    const onClickEdit = () => {
        navigate(`/edit-job/${job._id}`)
    }

    const onClickEditArchived = () => {
        props.patchJob(
            job._id, 
            { archived: !job.archived },
            () => {
                props.fetchJob(job._id)
                setOptionsMenuHidden(true)
                onJobUpdate()
            }
        )
    }

    const onClickViewApplications = () => {
        setOptionsMenuHidden(true)
        navigate(`/applications/${job._id}`)

    }

    const onClickReviewApplications = () => {
        navigate(`/review-applications/${job._id}`)
    }

    const onClickRepost = () => {
        props.repostJob(job._id, () => {
            props.fetchJob(job._id)
            setOptionsMenuHidden(true)
            onJobUpdate()
        })

    }

    const menuOptions = [
        {title: 'Edit', icon: 'bi-pencil', onClick: onClickEdit},
        {title: 'View applications', icon: 'bi-file-earmark-person', onClick: onClickViewApplications},
        ...(job.applicationType === 'easy-apply' ?
            [{title: 'Review applications', icon: 'bi-eye', onClick: onClickReviewApplications}]
            : []
        ),
        job.archived ? 
            {title: 'Repost job', icon: 'bi-signpost', onClick: onClickRepost}
            : {title: 'Archive', icon: 'bi-archive', onClick: onClickEditArchived},
    ]

    const onClickApply = () => {
        const postApplication = (onSuccess, onFailure) => {
            setLoadingPostApplication(true)
            props.postApplication(
                job._id, 
                job.recruiter._id, 
                () => {
                    props.fetchJob(job._id)
                    setLoadingPostApplication(false)
                    onSuccess()
                },
                () => {
                    setLoadingPostApplication(false)
                    onFailure()
                }
            )
        }

        if (job.applicationType === 'easy-apply') {
            if (props.mongoUser.canApplyToJobs) {
                props.addModal(ModalTypes.CONFIRM, {
                    title: 'Application',
                    message: 'Are you sure you want to apply to this job?',
                    confirmButtonTitle: 'Yes',
                    onConfirm: (onSuccess, onFailure) => postApplication(onSuccess, onFailure)
                })
            } else {
                props.addMessage('You must complete the To Do items on the dashboard before you can apply to jobs', true, true)
            }
        } else {
            props.addModal(ModalTypes.CONFIRM, {
                title: 'Application',
                message: 'Did you apply to this job?',
                confirmButtonTitle: 'Yes',
                cancelButtonTitle: 'No',
                onConfirm: (onSuccess, onFailure) => postApplication(onSuccess, onFailure)
            })
            job.applicationType === 'custom' && window.open(job.applicationURL, '_blank')
        }
    }

    return (
        <Root 
            {...rest}
            className={`float-container ${props.isMobile && 'mobile'} ${props.className && props.className}`} 
        >
            <div className='job-header'>
                <div className='left-job-header'>
                    <h3 className='title'>{job.title}</h3>
                    {job.applied ?
                        <PillLabel
                            title='Applied'
                            size='l'
                            color='clear'
                            style={{marginRight: 10}}
                        />
                        : null
                    }
                    {job.archived ?
                        <PillLabel
                            title='Archived'
                            size='l'
                            color='clear'
                        />
                        : null
                    }
                </div>
                {props.isRecruiterMode && isJobRecruiter ?
                    <OptionsMenu
                        menuHidden={optionsMenuHidden}
                        setMenuHidden={setOptionsMenuHidden}
                        options={menuOptions}
                    />
                    : !props.isRecruiterMode && !job.applied ?
                        <div className='apply-button-container'>
                            <Button
                                title={job.applicationType === 'easy-apply' ? 'Easy apply' : 'Apply'}
                                icon={job.applicationType === 'easy-apply' ? null : 'bi-link-45deg'}
                                priority={2}
                                type='solid'
                                onClick={onClickApply}
                                style={{alignSelf: 'flex-start', marginRight: 10}}
                            />
                            {loadingPostApplication ?
                                <PendingMessage />
                                : null
                            }
                        </div>
                        : null
                }
            </div>
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
            </div>
            <div className='section-2' >
                <PillLabel
                    title={job.minExperienceLevel === job.maxExperienceLevel ? 
                        ExperienceLevels.find(level => level.id === job.minExperienceLevel).title + ' level'
                        : `${ExperienceLevels.find(level => level.id === job.minExperienceLevel).title}
                            - 
                        ${ExperienceLevels.find(level => level.id === job.maxExperienceLevel).title} level`
                    }
                    color='yellow'
                    size='m'
                    style={{marginRight: 5}}
                />
                <PillLabel
                    title={job.minExperienceYears == job.maxExperienceYears ? 
                        ExperienceYears.find(years => years.id == job.minExperienceYears).title + ' years'
                        : `${ExperienceYears.find(years => years.id == job.minExperienceYears).min} - ${ExperienceYears.find(years => years.id == job.maxExperienceYears).max} years`
                    }
                    color='yellow'
                    size='m'
                    style={{marginRight: 5}}
                />
            </div>
            <div className='section-3'
                style={{marginBottom: props.isRecruiterMode && expanded || expanded ? 30 : 10}}
            >
                {job.requiresClearance ?
                    <PillLabel
                        title={'Secruity Clearance required'}
                        color='green'
                        size='m'
                        style={{marginRight: 5}}
                    />
                    : null
                }
                <PillLabel
                    title={'Sponsors visa: ' + VisaSponsorshipOptions.find( option => option.id === job.sponsorsVisa).title}
                    color='green'
                    size='m'
                    style={{marginRight: 5}}
                />
            </div>
            {hideable && !expanded ?
                <Button
                    title='Show more'
                    icon='bi-chevron-down'
                    priority={3}
                    type='clear'
                    onClick={() => setExpanded(true)}
                    style={{alignSelf: 'center'}}
                />
                : null
            }
            {expanded ?
                <div className='expandable-section'>
                    <div className='languages-and-skills-section' >
                        <div className='languages-section'>
                            <label>Languages</label>
                            {sortedJobLanguages.map( language => (
                                <div key={language} className={`option-container ${userHasLanguage(language) && 'included'}`}>
                                    <i className={`status-icon ${userHasLanguage(language) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} />
                                    <p>{language}</p>
                                </div>
                            ))}
                        </div>
                        <div className='skills-section'>
                            <label>Skills</label>
                            {sortedJobSkills.map( skill => (
                                <div key={skill} className={`option-container ${userHasSkill(skill) && 'included'}`}>
                                    <i className={`status-icon ${userHasSkill(skill) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} />
                                    <p>{skill}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='about-section'>
                        <h3>About the job</h3>
                        <p className='description-text'>{job.description}</p>
                    </div>
                    <div className='recruiter-section'>
                        <h3>Meet the recruiter</h3>
                        <PageLink
                            title={job.recruiter.displayName}
                            url={`/users/${job.recruiter._id}`}
                        />
                    </div>
                </div>
                : null
            }

            {hideable && expanded ?
                <Button
                    title='Hide'
                    icon='bi-chevron-up'
                    priority={3}
                    type='clear'
                    onClick={() => setExpanded(false)}
                    style={{alignSelf: 'center'}}
                />
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;

    &.mobile {
        padding: 20px;
    }

    & .job-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 30px;
    }
    & .left-job-header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    & .left-job-header .title {
        margin-right: 10px;
    }


    & .section-1 {
        margin-bottom: 4px;
        display: flex;
        align-items: center;
    }
    & .section-2,
    & .section-3 {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    & .languages-and-skills-section {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 30px;
    }
    & .languages-section,
    & .skills-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
    }

    & .about-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 30px;
    }

    & .recruiter-section {
        margin-bottom: 30px;
    }

    & .options-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    & .option-container {
        display: flex;
        align-items: center;
        margin-top: 5px;
    }
    & .option-container .status-icon {
        color: ${p => p.theme.textSecondary};
        margin-right: 5px;
    }
    & .option-container.included .status-icon {
        color: ${p => p.theme.tint};
    }

    & .salary-text {
        color: ${p => p.theme.textSecondary};
    }

    & .description-text {
        white-space: pre-wrap;
    }

    & .apply-button-container {
        display: flex;
        align-items: flex-start;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    mongoUser: getMongoUser(state),
    isRecruiterMode: getIsRecruiterMode(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchJob,
    fetchJob,
    postApplication,
    repostJob,
    addMessage,
    addModal
}, dispatch)

export const JobCard = connect(mapStateToProps, mapDispatchToProps)(JobCardComponent)