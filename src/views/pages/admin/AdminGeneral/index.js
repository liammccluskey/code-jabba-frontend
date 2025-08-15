import React, {useEffect} from 'react'
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

export const AdminGeneralComponent = props => {
    const {
        
    } = props

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
            message: "Are you sure you want to revoke this user's admin privilges?",
            confirmButtonTitle: 'Revoke',
            onConfirm: (onSuccess, onFailure) => props.removeAdminUser(adminUserID, onSuccess, onFailure),
            isDanger: true
        })
    }

    const onClickCreateAdmin = () => {
        props.addModal(ModalTypes.CREATE_NEW_ADMIN)
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
    addModal,
    addMessage
}, dispatch)

export const AdminGeneral = connect(mapStateToProps, mapDispatchToProps)(AdminGeneralComponent)