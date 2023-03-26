import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getHasSuperAdminPrivileges,
} from '../../../../redux/user'
import {
    getAdminUsers,
    getLoadingAdminUsers,
    fetchAdminUsers,
    makeUserSuperAdmin,
    removeAdminUser,
    postAppAnnouncementToAllUsers,
    postEmailAnnouncementToAllUsers
} from '../../../../redux/admin'
import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addMessage } from '../../../../redux/communication'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { AdminUserRow } from '../../../components/admin/AdminUserRow'
import { Button } from '../../../components/common/Button'
import { CreateAppAnnouncemnentForm } from '../../../components/admin/CreateAppAnnouncementForm'
import { CreateEmailAnnouncemnentForm } from '../../../components/admin/CreateEmailAnnouncementForm'
import { ClickableContainer } from '../../../components/common/ClickableContainer'

export const AdminGeneralComponent = props => {
    const {
        
    } = props
    const [activeQuickActionID, setActiveQuickActionID] = useState(null)

    const quickActions = [
        {
            title: 'Create app announcement',
            icon: 'bi-megaphone',
            id: 'create-app-announcement',
        },
        {
            title: 'Create email announcement',
            icon: 'bi-mailbox',
            id: 'create-email-announcement'
        }
    ]

    useEffect(() => {
        props.fetchAdminUsers()
    }, [])

    // Direct

    const onClickMakeSuperAdmin = adminUserID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Add Super Admin',
            message: "Are you sure you want to give this user super admin privileges?",
            confirmButtonTitle: 'Add',
            onConfirm: (onSuccess, onFailure) => props.makeUserSuperAdmin(adminUserID, onSuccess, onFailure)
        })
    }

    const onClickRemoveAdmin = adminUserID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Remove Admin',
            message: "Are you sure you want to remove this user's admin privilges?",
            confirmButtonTitle: 'Remove',
            onConfirm: (onSuccess, onFailure) => props.removeAdminUser(adminUserID, onSuccess, onFailure),
            isDanger: true
        })
    }

    const onClickCreateAdmin = () => {
        props.addModal(ModalTypes.CREATE_NEW_ADMIN)
    }

    const onClickQuickAction = quickActionID => {
        setActiveQuickActionID(curr => curr === quickActionID ? null : quickActionID)
    }

    const onSubmitAppAnnouncementForm = formData => {
        if (!formData.message) {
            props.addMessage('Announcment message cannot be blank.', true)
        } else {
            props.addModal(ModalTypes.CONFIRM, {
                title: 'Create App Announcment',
                message: `
                    Are you sure you want to send the following app announcment
                    notification to all ${process.env.REACT_APP_SITE_NAME} users?
                `,
                children: [
                    <ModalAppAnnouncementMessageContainer>
                        <p>{formData.message}</p>
                    </ModalAppAnnouncementMessageContainer>
                ],
                confirmButtonTitle: 'Send',
                pendingMessage: "This operation might take a while. You can safely exit this page and we'll notify you once the operation is complete",
                onConfirm: (onSuccess, onFailure) => props.postAppAnnouncementToAllUsers(formData, onSuccess, onFailure)
            })
        }
    }

    const onSubmitEmailAnnouncementForm = formData => {
        if (!formData.message) {
            props.addMessage('Email message cannot be blank.', true)
        } else if (!formData.subject) {
            props.addMessage('Email subject cannot be blank.', true)
        } else {
            props.addModal(ModalTypes.CONFIRM, {
                title: 'Create Email Announcment',
                message: `
                    Are you sure you want to send the following email announcment
                    to all ${process.env.REACT_APP_SITE_NAME} users?
                `,
                children: [
                    <ModalEmailAnnouncementContainer>
                        <p className='subject'>{formData.subject}</p>
                        <p className='message'>{formData.message}</p>
                    </ModalEmailAnnouncementContainer>
                ],
                confirmButtonTitle: 'Send',
                pendingMessage: "This operation might take a while. You can safely exit this page and we'll notify you once the operation is complete",
                onConfirm: (onSuccess, onFailure) => props.postEmailAnnouncementToAllUsers(formData, onSuccess, onFailure)
            })
        }
    }

    return (
        <PageContainer>
            <MainHeader />
            <AdminHeader activeLinkID='general' />
            <BodyContainer>
                <Container className={props.isMobile ? 'mobile' : ''}>
                    <div className='section-header-container'>
                        <h3>Admins</h3>
                        <Button
                            title='Create new admin'
                            type='clear'
                            priority={3}
                            onClick={onClickCreateAdmin}
                            icon='bi-plus'
                        />
                    </div>
                    <div className='admin-users-container float-container'>
                        {props.adminUsers.map( adminUser => (
                            <AdminUserRow
                                adminUser={adminUser}
                                hasSuperAdminPrivileges={props.hasSuperAdminPrivileges}
                                onClickRemoveAdmin={() => onClickRemoveAdmin(adminUser._id)}
                                onClickMakeSuperAdmin={() => onClickMakeSuperAdmin(adminUser._id)}
                                isMobile={props.isMobile}
                                key={adminUser._id}
                            />
                        ))}
                    </div>
                    <div className='section-header-container'>
                        <h3>Quick Actions</h3>
                    </div>
                    <div className='quick-actions-container'>
                        {quickActions.map( ({title, icon, id}) => (
                            <ClickableContainer
                                className={`quick-action-container ${id === activeQuickActionID && 'active'}`}
                                onClick={() => onClickQuickAction(id)}
                                key={id}
                            >
                                <i className={icon} />
                                <h4>{title}</h4>
                            </ClickableContainer>
                        ))}
                    </div>
                    {activeQuickActionID === 'create-app-announcement' ? 
                        <CreateAppAnnouncemnentForm
                            onSubmit={onSubmitAppAnnouncementForm}
                            onClickCancel={() => setActiveQuickActionID(null)}
                            isMobile={props.isMobile}
                        />
                    : activeQuickActionID === 'create-email-announcement' ?
                        <CreateEmailAnnouncemnentForm
                            onSubmit={onSubmitEmailAnnouncementForm}
                            onClickCancel={() => setActiveQuickActionID(null)}
                            isMobile={props.isMobile}
                        />
                    : null
                    }
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 200px;

    & .section-header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .admin-users-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 60px;
    }

    & .quick-actions-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30px;
    }

    & .quick-action-container {
        margin-right: 20px;
    }

    & .quick-action-container:last-child {
        margin-right: 0px;
    }
    &.mobile .quick-action-container {
        margin-right: 15px;
    }

    & .quick-action-container.active i,
    & .quick-action-container.active h4 {
        color: ${p => p.theme.tint};
    }

    & .quick-action-container i {
        font-size: 35px;
        color: ${p => p.theme.textMain};
        margin-bottom: 10px;
    }
`

const ModalAppAnnouncementMessageContainer = styled.div`
    border: 1px solid ${p => p.theme.bc};
    border-radius: 5px;
    padding: 15px;
    white-space: pre-line;
`

const ModalEmailAnnouncementContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 5px;
    white-space: pre-line;

    & .subject {
        border-bottom: 1px solid ${p => p.theme.bc};
        padding: 10px;
    }

    & .message {
        padding: 15px 10px;
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    hasSuperAdminPrivileges: getHasSuperAdminPrivileges(state),
    adminUsers: getAdminUsers(state),
    loadingAdminUsers: getLoadingAdminUsers(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAdminUsers,
    makeUserSuperAdmin,
    removeAdminUser,
    postAppAnnouncementToAllUsers,
    postEmailAnnouncementToAllUsers,
    addModal,
    addMessage
}, dispatch)

export const AdminGeneral = connect(mapStateToProps, mapDispatchToProps)(AdminGeneralComponent)