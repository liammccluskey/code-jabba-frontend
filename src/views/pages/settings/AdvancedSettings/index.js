import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'
import { sendPasswordResetEmail } from 'firebase/auth'

import { auth, getFirebaseErrorMessage } from '../../../../networking'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { SettingsHeader } from '../../../components/settings/SettingsHeader'
import {
    getUser,
    patchUserDisplayName,
    patchUserEmail,
    patchUserPhoto,
    patchUserThemeColor,
    patchUserTintColor
} from '../../../../redux/ducks/user'
import { addModal, ModalTypes } from '../../../../redux/ducks/modal'
import { addMessage } from '../../../../redux/ducks/communication'
import { SettingsRow } from '../../../components/settings/SettingsRow'
import { Button } from '../../../components/common/Button'
import { UserIcon } from '../../../components/common/UserIcon'

export const AdvancedSettingsComponent = props => {
    const {
        
    } = props

    const formInitialValues = {
    }

    return (
        <PageContainer className='bgc-bgc-nav'>
            <MainHeader />
            <SettingsHeader activeLinkID='advanced' />
            <BodyContainer style={{maxWidth: 1000}} className='as-center'>
                <Container>
                    <h3 className='settings-title'>
                        Membership
                    </h3>
                    <SettingsRow
                        title='Member Since'
                        isEditable={false}
                        isLastRow={true}
                        rightChild={
                            <p></p>
                        }
                    />
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    addModal,
}, dispatch)

export const AdvancedSettings = connect(mapStateToProps, mapDispatchToProps)(AdvancedSettingsComponent)