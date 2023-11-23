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
import { ModalTypes } from '../../../../containers/ModalProvider'
import { Months } from '../modals/EditEducationModal'
import { capitalizeWords } from '../../../../utils/misc'
import { Button } from '../../common/Button'
import { IconButton } from '../../common/IconButton'
import { PillLabel } from '../../common/PillLabel'

export const ProjectCardComponent = props => {
    const {
        projects=[],
        isEditable,

        ...rest
    } = props

    const onClickAdd = () => {
        props.addModal(ModalTypes.EDIT_PROJECT, {isEditMode: false})
    }

    const onClickEditProject = projectID => {
        props.addModal(ModalTypes.EDIT_PROJECT, {
            isEditMode: true,
            project: projects.find( project => project.id === projectID )
        })
    }

    const onClickViewProject = projectURL => {
        window.open(projectURL, '_blank')
    }

    const onClickViewCode = codeURL => {
        window.open(codeURL, '_blank')
    }

    const onClickDeleteProject = projectID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Project',
            message: 'Are you sure you want to delete this project?',
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => {
                const onDeleteSuccess = () => {
                    props.fetchProfileUser(props.mongoUser._id)
                    onSuccess()
                }

                const eds = projects.filter( we => we.id !== projectID )
                props.patchUser({projects: eds}, onDeleteSuccess, onFailure)
            }
        })
    }

    return (
        <Root className={`float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <div className='project-main-header'>
                <h3>Projects</h3>
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
            {projects.length == 0 ?
                <div className='no-results-container'>
                    <p>No projects to show</p>
                </div>
                : null
            }
            {projects.map( ({title, url, codeURL, languages, skills, description, startMonth, startYear, endMonth, endYear, isCurrent, id}) => (
                <div key={id} className='project-container'>
                    <div className='project-header'>
                        <h4>{title}</h4>
                        {isEditable ?
                            <div className='buttons-container'>
                                <IconButton
                                    icon='bi-pencil'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickEditProject(id)}
                                    style={{marginRight: 10}}
                                />
                                <IconButton
                                    icon='bi-trash'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickDeleteProject(id)}
                                />
                            </div>
                            : null
                        }
                    </div>
                    <p className='time-text'>{`${capitalizeWords(Months.find(month => month.id === startMonth).title)} ${startYear} - ${isCurrent ? 'Present' : `${capitalizeWords(Months.find(month => month.id === endMonth).title)} ${endYear}`}`}</p>
                    <div className='project-buttons-container'>
                        {url ?
                            <Button
                                title='View project'
                                type='solid'
                                priority={2}
                                onClick={() => onClickViewProject(url)}
                                style={{ alignSelf: 'flex-start', marginRight: 15}}
                            />
                            : null
                        }
                        {codeURL ?    
                            <Button
                                title='View code'
                                type='clear'
                                priority={2}
                                onClick={() => onClickViewCode(codeURL)}
                                style={{ alignSelf: 'flex-start'}}
                            />
                            : null
                        }
                    </div>
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
                    <div className='pills-row' style={{marginBottom: 20}}>
                        {[...skills].sort((a, b) => a.localeCompare(b)).map(skill => (
                            <PillLabel
                                title={skill}
                                size='m'
                                color='yellow '
                                style={{marginTop: 10, marginRight: 5}}
                            />
                        ))}
                    </div>
                    <p>{description}</p>
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

    & .project-main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0px;
    }

    & .project-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }
    & .project-container:last-child {
        border-bottom: none;
    }

    & .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    & .time-text {
        color: ${p => p.theme.textSecondary}; 
        margin-bottom: 5px;
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

    & .project-buttons-container {
        display: flex;
        align-items: center;
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

export const ProjectCard = connect(mapStateToProps, mapDispatchToProps)(ProjectCardComponent)