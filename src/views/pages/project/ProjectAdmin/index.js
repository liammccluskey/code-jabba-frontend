import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
import {
    getProject,
    getLoadingProject,
    getProjectNotFound,

    fetchProject,
    patchProjects,
    deleteProjects,

    ProjectStatuses
} from '../../../../redux/project'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { ProjectHeader } from '../../../components/project/ProjectHeader'
import { Loading } from '../../../components/common/Loading'
import { OptionsMenu } from '../../../components/menus/OptionsMenu'
import { PillLabel } from '../../../components/common/PillLabel'
import { ErrorElement } from '../../ErrorElement'

export const ProjectAdminComponent = props => {
    const {
        
    } = props
    const {projectID} = useParams()
    const navigate = useNavigate()
    const [optionsMenuHidden, setOptionsMenuHidden] = useState(true)

    useEffect(() => {
        props.fetchProject(projectID)
    }, [])

    // Utils

    const fetchCurrentProject = () => {
        props.fetchProject(projectID)
    }

    const fetchCurrentProjectAndCloseMenu = () => {
        fetchCurrentProject()
        setOptionsMenuHidden(true)
    }

    // Direct

    const onClickEditProjectStatus = updatedStatus => {
        props.patchProjects([projectID], {
            status: updatedStatus
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditReceivedPayment = () => {
        props.patchProjects([projectID], {
            receivedPayment: !props.project.receivedPayment
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditRefundIssued = () => {
        props.patchProjects([projectID], {
            refundIssued: !props.project.refundIssued
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditInvoiceSent = () => {
        props.patchProjects([projectID], {
            invoiceSent: !props.project.invoiceSent
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditEditingLocked = () => {
        props.patchProjects([projectID], {
            editingLocked: !props.project.editingLocked
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditRevisionsLocked = () => {
        props.patchProjects([projectID], {
            revisionsLocked: !props.project.revisionsLocked
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickEditArchived = () => {
        props.patchProjects([projectID], {
            archived: !props.project.archived
        }, fetchCurrentProjectAndCloseMenu, () => {})
    }

    const onClickDeleteProject = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Project',
            message: 'Are you sure you want to delete this project?',
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => props.deleteProjects(
                [projectID],
                () => {
                    navigate('/dashboard')
                    onSuccess()
                },
                onFailure
            )
        })
    }

    // Function Dependent Variables

    const menuOptions = [
        {title: 'Mark as Pending Approval', icon: 'bi-three-dots', onClick: () => onClickEditProjectStatus(ProjectStatuses.pendingApproval)},
        {title: 'Mark as In Progress', icon: 'bi-three-dots-vertical', onClick: () => onClickEditProjectStatus(ProjectStatuses.inProgress)},
        {title: 'Mark as Completed', icon: 'bi-check-circle', onClick: () => onClickEditProjectStatus(ProjectStatuses.completed)},
        {title: 'Mark as In Review', icon: 'bi-search', onClick: () => onClickEditProjectStatus(ProjectStatuses.inReview)},
        {title: 'Mark as Denied', icon: 'bi-x', onClick: () => onClickEditProjectStatus(ProjectStatuses.denied)},
        {
            title: !props.loadingProject && props.project ?
                props.project.receivedPayment ?
                    'Mark as Unpaid'
                    : 'Mark as Paid'
                : 'Mark as Paid'
            ,
            icon: 'bi-cash-stack',
            onClick: onClickEditReceivedPayment
        },
        {
            title: !props.loadingProject && props.project ?
                props.project.invoiceSent ?
                    'Unsend Invoice'
                    : 'Send Invoice'
                : 'Send Invoice'
            ,
            icon: !props.loadingProject && props.project ?
                props.project.invoiceSent ?
                    'bi-newspaper'
                    : 'bi-newspaper'
                : 'bi-newspaper'
            ,
            onClick: onClickEditInvoiceSent
        },
        {
            title: !props.loadingProject && props.project ?
                props.project.refundIssued ?
                    'Remove Refund'
                    : 'Issue Refund'
                : 'Issue Refund'
            ,
            icon: 'bi-cash-stack',
            onClick: onClickEditRefundIssued
        },
        {
            title: !props.loadingProject && props.project ?
                props.project.editingLocked ?
                    'Allow Editing'
                    : 'Lock Editing'
                : 'Allow Editing'
            ,
            icon: !props.loadingProject && props.project ?
                props.project.editingLocked ?
                    'bi-unlock'
                    : 'bi-lock'
                : 'bi-unlock'
            ,
            onClick: onClickEditEditingLocked
        },
        {
            title: !props.loadingProject && props.project ?
                props.project.revisionsLocked ?
                    'Allow Revisions'
                    : 'Lock Revisions'
                : 'Allow Revisions'
            ,
            icon: !props.loadingProject && props.project ?
                props.project.revisionsLocked ?
                    'bi-unlock'
                    : 'bi-lock'
                : 'bi-unlock'
            ,
            onClick: onClickEditRevisionsLocked
        },
        {
            title: !props.loadingProject && props.project ?
                props.project.archived ?
                    'De-archive'
                    : 'Archive'
                : 'Archive'
            ,
            icon: 'bi-archive',
            onClick: onClickEditArchived
        },
        {title: 'Delete', icon: 'bi-trash', onClick: onClickDeleteProject, isDanger: true},
    ]

    return (props.projectNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <ProjectHeader
                activeLinkID='admin'
                projectID={projectID}
            />
            <BodyContainer>
                {!props.loadingProject && props.project ?
                    <Container className={`float-container ${props.isMobile && 'mobile'}`}>
                        <div className='header-container'>
                            <h3 className='line-clamp-1'>{props.project.projectName}</h3>
                            <OptionsMenu
                                menuHidden={optionsMenuHidden}
                                setMenuHidden={setOptionsMenuHidden}
                                options={menuOptions}
                            />
                        </div>
                        <div className='item-row'>
                            <label>Date Created: </label>
                            <p>{moment(props.project.createdAt).format('LLL')}</p>
                        </div>
                        <div className='item-row'>
                            <label>Project Status: </label>
                            <PillLabel
                                title={props.project.status}
                                color={props.project.status === ProjectStatuses.pendingApproval ?
                                        'yellow'
                                    : props.project.status === ProjectStatuses.inProgress ?
                                        'blue'
                                    : props.project.status === ProjectStatuses.completed ?
                                        'green'
                                    : props.project.status === ProjectStatuses.inReview ?
                                        'blue'
                                    : props.project.status === ProjectStatuses.denied ?
                                        'red'
                                    : 'blue'
                                }
                                size='s'
                            />
                        </div>
                        <div className='item-row'>
                            <label>Payment Status: </label>
                            {props.project.receivedPayment ?
                                <PillLabel title='Paid' color='green' size='s' />
                                : <PillLabel title='Unpaid' color='red' size='s' />
                            }
                        </div>
                        <div className='item-row' >
                            <label>Invoice Status: </label>
                            {props.project.invoiceSent ?
                                <PillLabel title='Sent' color='green' size='s' />
                                : <PillLabel title='Not sent' color='blue' size='s' />
                            }
                        </div>
                        <div className='item-row' >
                            <label>Refund Status: </label>
                            {props.project.refundIssued ?
                                <PillLabel title='Issued' color='green' size='s' />
                                : <PillLabel title='Not issued' color='blue' size='s' />
                            }
                        </div>
                        <div className='item-row' >
                            <label>Editing: </label>
                            {props.project.editingLocked ?
                                <PillLabel title='Locked' color='red' size='s' />
                                : <PillLabel title='Allowed' color='green' size='s' />
                            }
                        </div>
                        <div className='item-row' >
                            <label>Revisions: </label>
                            {props.project.revisionsLocked ?
                                <PillLabel title='Locked' color='red' size='s' />
                                : <PillLabel title='Allowed' color='green' size='s' />
                            }
                        </div>
                        <div className='item-row' style={{marginBottom: 0}}>
                            <label>Archived: </label>
                            {props.project.archived ?
                                <PillLabel title='True' color='green' size='s' />
                                : <PillLabel title='False' color='red' size='s' />
                            }
                        </div>
                    </Container>
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;

    &.mobile {
        padding: 20px;
    }

    & .header-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 40px;
    }

    & .item-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    & .item-row label {
        margin-right: 10px;
    }
`

const mapStateToProps = state => ({
    project: getProject(state),
    loadingProject: getLoadingProject(state),
    projectNotFound: getProjectNotFound(state),
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProject,
    patchProjects,
    deleteProjects,
    addModal
}, dispatch)

export const ProjectAdmin = connect(mapStateToProps, mapDispatchToProps)(ProjectAdminComponent)