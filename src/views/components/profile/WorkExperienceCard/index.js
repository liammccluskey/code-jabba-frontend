import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getMongoUser,

    patchUser,
    fetchProfileUser,
} from '../../../../redux/user'
import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { 
    SettingTypes,  
    JobTypes,
    PositionTypes
} from '../../job/EditJobCard'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { Months } from '../modals/EditEducationModal'
import { capitalizeWords } from '../../../../utils'
import { IconButton } from '../../common/IconButton'
import { PillLabel } from '../../common/PillLabel'

export const WorkExperienceCardComponent = props => {
    const {
        workExperiences=[],
        isEditable,

        ...rest
    } = props

    const onClickAdd = () => {
        props.addModal(ModalTypes.EDIT_WORK_EXPERIENCE, {isEditMode: false})
    }

    const onClickEditWorkExperience = workExperienceID => {
        const workExperience = workExperiences.find( we => we.id === workExperienceID )
        props.addModal(ModalTypes.EDIT_WORK_EXPERIENCE, {
            isEditMode: true,
            workExperience
        })
    }

    const onClickDeleteWorkExperience = workExperienceID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Work Experience',
            message: 'Are you sure you want to delete this work experience?',
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => {
                const onDeleteSuccess = () => {
                    props.fetchProfileUser(props.mongoUser._id)
                    onSuccess()
                }

                const wes = workExperiences.filter( we => we.id !== workExperienceID )
                props.patchUser({workExperiences: wes}, onDeleteSuccess, onFailure)
            }
        })
    }

    return (
        <Root className={`of-visible-float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <div className='work-experience-main-header'>
                <h3>Work Experience</h3>
                {isEditable ?
                    <IconButton
                        icon='bi-plus'
                        size='m'
                        color='tint'
                        onClick={onClickAdd}
                    />
                    : null
                }
            </div>
            {workExperiences.length == 0 ?
                <div className='no-results-container'>
                    <p>No work experiences to show</p>
                </div>
                : null
            }
            {workExperiences.map( ({company, jobTitle, setting, type, position, description, languages, skills, startMonth, startYear, endMonth, endYear, isCurrent, id}) => (
                <div key={id} className='work-experience-container'>
                    <div className='work-experience-header'>
                        <h4>{jobTitle}</h4>
                        {isEditable ?
                            <div className='buttons-container'>
                                <IconButton
                                    icon='bi-pencil'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickEditWorkExperience(id)}
                                    style={{marginRight: 10}}
                                />
                                <IconButton
                                    icon='bi-trash'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickDeleteWorkExperience(id)}
                                />
                            </div>
                            : null
                        }
                    </div>
                    <p className='company-text'>{company}</p>
                    <div className='pills-container'>
                        <PillLabel
                            title={SettingTypes.find( settingType => settingType.id === setting).title}
                            color='green'
                            size='m'
                            style={{marginRight: 5}}
                        />
                        <PillLabel
                            title={JobTypes.find( jobType => jobType.id === type).title}
                            color='green'
                            size='m'
                            style={{marginRight: 5}}
                        />
                        <PillLabel
                            title={PositionTypes.find( positionType => positionType.id === position).title}
                            color='blue'
                            size='m'
                            style={{marginRight: 5}}
                        />
                    </div>
                    <p className='time-text'>{`${capitalizeWords(Months.find(month => month.id === startMonth).title)} ${startYear} - ${isCurrent ? 'Present' : `${capitalizeWords(Months.find(month => month.id === endMonth).title)} ${endYear}`}`}</p>
                    <p>{description}</p>
                    <div className='pills-row'>
                        {[...languages].sort((a, b) => a.localeCompare(b)).map(language => (
                            <PillLabel
                                title={language}
                                size='m'
                                color='yellow'
                                style={{marginTop: 10, marginRight: 5}}
                            />
                        ))}
                    </div>
                    <div className='pills-row'>
                        {[...skills].sort((a, b) => a.localeCompare(b)).map(skill => (
                            <PillLabel
                                title={skill}
                                size='m'
                                color='yellow'
                                style={{marginTop: 10, marginRight: 5}}
                            />
                        ))}
                    </div>
                </div>
            ))}
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

    & .no-results-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    & .no-results-container p {
        color: ${p => p.theme.textSecondary};
    }

    & .work-experience-main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .work-experience-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }
    & .work-experience-container:last-child {
        border-bottom: none;
    }

    & .work-experience-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    & .company-text {
        margin-bottom: 5px;
    }

    & .pills-container {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    & .time-text {
        color: ${p => p.theme.textSecondary};
        margin-bottom: 20px;
    }

    & .pills-row {
        display: flex;
        align-item: center;
        flex-wrap: wrap;
    }

    & .buttons-container {
        display: inline-flex;
        align-items: center;
        margin-left: 10px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal,
    patchUser,
    fetchProfileUser
}, dispatch)

export const WorkExperienceCard = connect(mapStateToProps, mapDispatchToProps)(WorkExperienceCardComponent)