import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getUser,
    patchUserSettings
} from '../../../../redux/user'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { SettingsHeader } from '../../../components/settings/SettingsHeader'
import { SettingsRow } from '../../../components/settings/SettingsRow'
import { Button } from '../../../components/common/Button'
import { Switch } from '../../../components/common/Switch'

export const AdvancedSettingsComponent = props => {
    const {
        
    } = props

    const {settings} = props.user
    const formInitialValues = {
        appNotifications: [
            {
                path: 'appNotifications.generalEnabled',
                name: 'General',
                enabled: settings.appNotifications.generalEnabled,
                locked: true,
            },
            {
                path: 'appNotifications.socialEnabled',
                name: 'Social',
                enabled: settings.appNotifications.socialEnabled,
                locked: false,
            },
            {
                path: 'appNotifications.jobUpdatesEnabled',
                name: 'Job updates',
                enabled: settings.appNotifications.jobUpdatesEnabled,
                locked: false,
            },
        ],
        emailNotifications: [
            {
                path: 'emailNotifications.generalEnabled',
                name: 'General',
                enabled: settings.emailNotifications.generalEnabled,
            },
            {
                path: 'emailNotifications.socialEnabled',
                name: 'Social',
                enabled: settings.emailNotifications.socialEnabled,
            },
            {
                path: 'emailNotifications.jobUpdatesEnabled',
                name: 'Job updates',
                enabled: settings.emailNotifications.jobUpdatesEnabled,
            },
        ],
    }

    const onClickSwitch = (settingPath, enabled) => {
        props.patchUserSettings(settingPath, enabled)
    }

    return (
        <PageContainer className='bgc-bgc-settings'>
            <MainHeader  />
            <SettingsHeader activeLinkID='advanced' />
            <BodyContainer style={{maxWidth: 1000}} className='as-center'>
                <Container>
                    <h3 className='settings-title'>
                        App Notifications
                    </h3>
                    <div className='settings-rows-container'>
                        {formInitialValues.appNotifications
                            .map( ({path, name, enabled, locked}, i) => (
                                <SettingsRow
                                    key={name}
                                    title={name}
                                    isEditable={false}
                                    rightChild={
                                        <div className='d-inline-flex jc-flex-start ai-center'>
                                            {locked ?
                                                <i className='bi-lock lock-icon' />
                                                : null
                                            }
                                            <Switch
                                                enabled={enabled}
                                                onClick={() => !locked && onClickSwitch(path, !enabled)}
                                            />
                                        </div>
                                    }
                                />
                            )
                        )}
                    </div>

                    <h3 className='settings-title'>
                        Email Notifications
                    </h3>
                    <div className='settings-rows-container'>
                        {formInitialValues.emailNotifications
                            .map( ({path, name, enabled}, i) => (
                                <SettingsRow
                                    key={name}
                                    title={name}
                                    isEditable={false}
                                    rightChild={
                                        <Switch
                                            enabled={enabled}
                                            onClick={() => onClickSwitch(path, !enabled)}
                                        />
                                    }
                                />
                            )
                        )}
                    </div> 
                </Container>

            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    & .settings-title {
        margin-bottom: 15px;
    }

    & .lock-icon {
        font-size: 17px;
        color: ${p => p.theme.textSecondary};
        margin-right: 8px;
    }
`

const mapStateToProps = state => ({
    user: getUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUserSettings
}, dispatch)

export const AdvancedSettings = connect(mapStateToProps, mapDispatchToProps)(AdvancedSettingsComponent)