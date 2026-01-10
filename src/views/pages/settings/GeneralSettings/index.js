import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression'

import { auth, getFirebaseErrorMessage } from '../../../../networking'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { SettingsHeader } from '../../../components/settings/SettingsHeader'
import {
    getUser,
    getFirebaseUser,
    getIsPremiumUser,
    getIsCandidatePremiumUser,
    getIsRecruiterPremiumUser,

    patchUserDisplayName,
    patchUserPhoto,
    patchUserThemeColor,
    patchUserTintColor,
    deleteUser,
    fetchThisMongoUser,
    cancelSubscription,
    setIsRecruiterMode
} from '../../../../redux/user'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { SubscriptionTiersFormatted } from '../../../../redux/user'
import {
    getTintColor,
    getThemeColor,
    Tints,
    Themes,
} from '../../../../redux/theme'
import { addMessage } from '../../../../redux/communication'
import { SettingsRow } from '../../../components/settings/SettingsRow'
import { Button } from '../../../components/common/Button'
import { UserIcon } from '../../../components/common/UserIcon'

const ProfileIconMaxSizeMB = 1 * 1024 * 1024 // 1 mb
const ProfileIconMaxSizeB = 1024 * 1024

export const GeneralSettingsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    // Utils

    const getMembershipText = () => {
        const membershipType = props.isCandidatePremiumUser ?
            SubscriptionTiersFormatted.candidatePremium
            : props.isRecruiterPremiumUser ?
                SubscriptionTiersFormatted.recruiterPremium
                : 'None'
        if (props.user.subscription && props.user.subscription.isLifetime)
            return `Lifetime ${membershipType}`
        else
            return membershipType
    }

    const formInitialValues = {
        membership: {
            memberSince: moment(props.user.createdAt).format('LL'),
            membership: getMembershipText()
        },
        account: {
            email: props.user.email
        },
        profile: {
            displayName: props.user.displayName,
            photoURL: props.user.photoURL
        },
        appearance: {
            themeColor: {
                value: props.themeColor,
                name: Themes[props.themeColor].name,
                icon: Themes[props.themeColor].icon,
                selectValues: Object.values(Themes)
            },
            tintColor: {
                value: props.tintColor,
                name: Tints[props.tintColor].name,
                color: Tints[props.tintColor].tint,
                selectValues: Object.values(Tints)
            }
        }
    }

    // Direct

    const onClickGoPremium = () => {
        navigate('/membership/premium')
    }

    const onClickCancelPremium = () => {
        if (props.user.subscription.isLifetime) {
            props.addMessage('You cannot cancel a lifetime subscription.', true)
            return
        }

        if (props.isRecruiterPremiumUser) props.setIsRecruiterMode(true)
        else if (props.isCandidatePremiumUser) props.setIsRecruiterMode(false)
        
        const cancelMembershipURL = props.isRecruiterPremiumUser || props.isCandidatePremiumUser ? 
            '/membership/cancel' 
            : '/dashboard'
        navigate(cancelMembershipURL)
    }

    const onClickResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, props.user.email)
            props.addMessage('Check your email for a link to reset your password.')
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            props.addMessage(errorMessage, true)
        }
    }

    const onClickDeleteAccount = async () => {
        props.addModal(ModalTypes.CONFIRM, {
            message: 'Are you sure you want to delete your account?',
            onConfirm: onSuccess => {
                props.deleteUser(() => {
                    navigate('/')
                    onSuccess()
                })
            },
            isDanger: true
        })
    }

    const submitDisplayName = (val, onSuccess) => {
        if (val === props.user.displayName) {
            onSuccess()
            return
        }
        props.patchUserDisplayName(val, onSuccess)
    }

    const submitThemeColor = (val, onSuccess, onFailure) => {
        if (val == props.themeColor) return
        props.patchUserThemeColor(val, onSuccess, onFailure)
    }

    const submitTintColor = (val, onSuccess, onFailure) => {
        if (val == props.tintColor) return
        props.patchUserTintColor(val, onSuccess, onFailure)
    }

    const submitProfilePhoto = async (file, onSuccess, onFailure) => {
        if (!file) {
            onFailure()
            return
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

        if (!allowedTypes.includes(file.type)) {
            props.addMessage('Invalid file type. We only accept images of type JPG, JPEG, or PNG', true, true)
            onFailure()
            return
        }

        let compressedFile
        try {
            const options = {
                maxSizeMB: ProfileIconMaxSizeMB,
                maxWidthOrHeight: 512,
                useWebWorker: true,
                alwaysKeepResolution: true,
            }
    
            compressedFile = await imageCompression(file, options)
    
            if (compressedFile.size > ProfileIconMaxSizeB) {
                props.addMessage('File to large. The maximum size image you can upload is 1 MB', true, true)
                onFailure()
                return
            }
    
        } catch (err) {
            props.addMessage('An error occurred while processing your photo. Please try again later', true)
        }

        props.patchUserPhoto(compressedFile, onSuccess, onFailure)
    }


    return (
        <PageContainer className='bgc-bgc-settings'>
            <MainHeader  />
            <SettingsHeader activeLinkID='general' />
            <BodyContainer style={{maxWidth: 1000}} className='as-center'>
                <Container>
                    <h3 className='settings-title'>
                        Membership
                    </h3>
                    <div className='settings-rows-container'>
                        <SettingsRow
                            title='Member Since'
                            isEditable={false}
                            rightChild={
                                <p>{formInitialValues.membership.memberSince}</p>
                            }
                        />
                        <SettingsRow
                            title='Subscription'
                            isEditable={false}
                            middleChild={
                                <p>{formInitialValues.membership.membership}</p>
                            }
                            rightChild={props.isRecruiterPremiumUser || props.isCandidatePremiumUser ?
                                <Button
                                    title='Cancel Premium'
                                    priority={2}
                                    type='error'
                                    onClick={onClickCancelPremium}
                                />
                                : <Button
                                    title='Go Premium'
                                    priority={2}
                                    type='gold'
                                    onClick={onClickGoPremium}
                                />
                            }
                        />
                    </div>

                    <h3 className='settings-title'>
                        Account
                    </h3>
                    <div className='settings-rows-container'>
                        <SettingsRow
                            title='Email'
                            inputType='text'
                            initialValue={formInitialValues.account.email}
                            isEditable={false}
                            rightChild={
                                <p>{formInitialValues.account.email}</p>
                            }
                        />
                        <SettingsRow
                            title='Password'
                            isEditable={false}
                            rightChild={
                                <Button
                                    title='Reset Password'
                                    priority={2}
                                    type='tint'
                                    onClick={onClickResetPassword}
                                />
                            }
                        />
                        <SettingsRow
                            title=''
                            isEditable={false}
                            rightChild={
                                <Button
                                    title='Delete your account'
                                    priority={2}
                                    type='error'
                                    onClick={onClickDeleteAccount}
                                />
                            }
                        />
                    </div>

                    <h3 className='settings-title'>
                        Profile
                    </h3>
                    <div className='settings-rows-container'>
                        <SettingsRow
                            title='Display Name'
                            isEditable={true}
                            inputType='text'
                            initialValue={formInitialValues.profile.displayName}
                            rightChild={
                                <p>{formInitialValues.profile.displayName}</p>
                            }
                            onSubmit={submitDisplayName}
                        />
                        <SettingsRow
                            title='Profile Photo'
                            isEditable={true}
                            inputType='image'
                            rightChild={
                                <UserIcon size='m' user={props.user} />
                            }
                            onSubmit={submitProfilePhoto}
                        />
                    </div>

                    <h3 className='settings-title'>
                        Appearance
                    </h3>
                    <div className='settings-rows-container'>
                        <SettingsRow
                            title='Theme'
                            isEditable={true}
                            inputType='select'
                            autoSave={true}
                            initialValue={formInitialValues.appearance.themeColor.value}
                            selectValues={formInitialValues.appearance.themeColor.selectValues}
                            rightChild={
                                <div className='d-flex jc-flex-end ai-center'>
                                    <p>{formInitialValues.appearance.themeColor.name}</p>
                                </div>
                            }
                            onSubmit={submitThemeColor}
                        />
                        <SettingsRow
                            title='Tint Color'
                            isEditable={true}
                            inputType='select'
                            autoSave={true}
                            initialValue={formInitialValues.appearance.tintColor.value}
                            selectValues={formInitialValues.appearance.tintColor.selectValues}
                            rightChild={
                                <div className='d-flex jc-flex-end ai-center'>
                                    <p style={{color: formInitialValues.appearance.tintColor.color}}>
                                        {formInitialValues.appearance.tintColor.name}
                                    </p>
                                </div>
                            }
                            onSubmit={submitTintColor}
                            />
                        </div>
                </Container>

            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    .settings-title {
        margin-bottom: 15px;
    }
`

const mapStateToProps = state => ({
    user: getUser(state),
    firebaseUser: getFirebaseUser(),
    isPremiumUser: getIsPremiumUser(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
    tintColor: getTintColor(state),
    themeColor: getThemeColor(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchThisMongoUser,
    patchUserDisplayName,
    patchUserThemeColor,
    patchUserTintColor,
    patchUserPhoto,
    deleteUser,
    cancelSubscription,
    setIsRecruiterMode,
    addMessage,
    addModal,
}, dispatch)

export const GeneralSettings = connect(mapStateToProps, mapDispatchToProps)(GeneralSettingsComponent)