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
    giveFreeLifetimePremium
} from '../../../../redux/admin'
import { SubscriptionTiers, SubscriptionTiersFormatted } from '../../../../redux/user'
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

    const [email, setEmail] = useState('')
    const [subscriptionTier, setSubscriptionTier] = useState(SubscriptionTiers.candidatePremium)

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

    const onClickGiveLifetimePremium = () => {
        if (!email) {
            props.addMessage('You must specify the email of the user you are giving lifetime premium to.', true)
            return
        }
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Give free lifetime premium',
            message: `Are you sure you want to give free lifetime premium to user with email { ${email} }?`,
            confirmButtonTitle: 'Yes',
            onConfirm: (onSuccess, onFailure) => {
                const onGivePremiumSuccess = () => {
                    onSuccess()
                    setEmail('')
                }
                
                props.giveFreeLifetimePremium(email, subscriptionTier, onGivePremiumSuccess, onFailure)
            },
            closeModalOnConfirmFailure: true,
        })
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
                        <h3>Actions</h3>
                    </div>
                    <div className='actions-container float-container'>
                        <div className='action-row-container'>
                            <h4 className='action-title'>
                                Give user free lifetime premium
                            </h4>
                            <div className='action-item-container'>
                                <div className='inputs-container'>
                                    <div className='input-container'>
                                        <label>User email</label>
                                        <input 
                                            type='text'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                            style={{width: 300, marginRight: 10}}
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <label>Subscription tier</label>
                                        <select
                                            value={subscriptionTier}
                                            onChange={e => setSubscriptionTier(e.target.value)}
                                        >
                                            <option value={SubscriptionTiers.candidatePremium} key={SubscriptionTiers.candidatePremium}>
                                                {SubscriptionTiersFormatted.candidatePremium}
                                            </option>
                                            <option value={SubscriptionTiers.recruiterPremium} key={SubscriptionTiers.recruiterPremium}>
                                                {SubscriptionTiersFormatted.recruiterPremium}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <Button
                                    title='Give premium'
                                    type='clear'
                                    priority={3}
                                    onClick={onClickGiveLifetimePremium}
                                    icon='bi-plus'
                                />
                            </div>
                        </div>
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

    & .actions-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }

    & .action-row-container {
        padding: 15px;
    }

    & .action-item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    & .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    & .inputs-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
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
    giveFreeLifetimePremium,
    addModal,
    addMessage
}, dispatch)

export const AdminGeneral = connect(mapStateToProps, mapDispatchToProps)(AdminGeneralComponent)