import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getHasSuperAdminPrivileges,
} from '../../../../redux/ducks/user'
import {
    getAdminUsers,
    getLoadingAdminUsers,
    fetchAdminUsers,
    makeUserSuperAdmin,
    removeAdminUser
} from '../../../../redux/ducks/admin'
import { getIsMobile } from '../../../../redux/ducks/theme'
import { addModal, ModalTypes } from '../../../../redux/ducks/modal'
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
            title: 'Confirm Add Super Admin',
            message: "Are you sure you want to give this user super admin privileges?",
            onConfirm: onSuccess => props.makeUserSuperAdmin(adminUserID, onSuccess)
        })
    }

    const onClickRemoveAdmin = adminUserID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Confirm Remove Admin',
            message: "Are you sure you want to remove this user's admin privilges?",
            onConfirm: onSuccess => props.removeAdminUser(adminUserID, onSuccess),
            isDanger: true
        })
    }

    const onClickCreateAdmin = () => {

    }

    return (
        <PageContainer>
            <MainHeader showBorder={false}/>
            <AdminHeader activeLinkID='general' />
            <BodyContainer>
                <Container>
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
    addModal
}, dispatch)

export const AdminGeneral = connect(mapStateToProps, mapDispatchToProps)(AdminGeneralComponent)