import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import {
    getLoadingNotifications,
    getNotifications,
    markNotificationAsRead
} from '../../../redux/ducks/communication'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'

export const NotificationsComponent = props => {
    const {
        
    } = props
    const {notificationID} = useParams()


    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Notifications' />
            <BodyContainer>
                <NotificationsList>

                </NotificationsList>
                
            </BodyContainer>
        </PageContainer>
    )
}

const NotificationsList = styled.div`
    
`
const mapStateToProps = state => ({
    notifications: getNotifications(state),
    loadingNotifications: getLoadingNotifications(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    markNotificationAsRead
}, dispatch)

export const Notifications = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent)