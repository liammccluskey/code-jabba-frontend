import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import {
    getNotifications,
    getLoadingNotificationsFirstPage,
    getLoadingNotifications,
    getCanLoadMoreNotifications,
    getChannelNotifications,
    getLoadingChannelNotificationsFirstPage,
    getLoadingChannelNotifications,
    getCanLoadMoreChannelNotifications,
    markNotificationsAsRead,
    fetchNotifications,
    fetchChannelNotifications,
    NotificationChannels
} from '../../../redux/ducks/communication'
import { getIsSemiMobile } from '../../../redux/ducks/theme'
import { PageContainer } from '../../components/common/PageContainer'
import { FixedBodyContainer } from '../../components/common/FixedBodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { NotificationCard } from '../../components/notifications/NotificationCard'
import { NotificationMessage } from '../../components/notifications/NotificationMessage'
import { Button } from '../../components/common/Button'
import { Loading } from '../../components/common/Loading'

export const NotificationsComponent = props => {
    const {
        
    } = props
    const {activeNotificationID} = useParams()
    const navigate = useNavigate()
    const [activeChannelID, setActiveChannelID] = useState(null)
    const [notificationsPage, setNotificationsPage] = useState(1)
    const [channelNotificationsPage, setChannelNotificationsPage] = useState(1)
    const [activeMessageOffsetTop, setActiveMessageOffsetTop] = useState(0)
    const [hasRenderedActiveMessage, setHasRenderedActiveMessage] = useState(false)

    const activeChannel = NotificationChannels[activeChannelID]

    useEffect(() => {
        props.fetchNotifications(1)
        setNotificationsPage(1)
    }, [])

    useEffect(() => {
        setHasRenderedActiveMessage(false)
        setActiveMessageOffsetTop(0)
    }, [activeNotificationID])

    useEffect(() => {
        if (
            !props.loadingNotificationsFirstPage &&
            props.notifications.length &&
            !activeNotificationID && 
            !props.isSemiMobile
        ) {
            navigateToNotification(props.notifications[0]._id)
        }
    }, [
        props.loadingNotificationsFirstPage,
        activeNotificationID,
        props.isSemiMobile,
        props.notifications
    ])

    useEffect(() => {
        if (activeNotificationID && !props.loadingNotificationsFirstPage) {
            const notification = props.notifications.find(n => n._id === activeNotificationID)
            if (notification) {
                const {isRead, channelID} = notification
                notification && setActiveChannelID(channelID)
                !isRead && props.markNotificationsAsRead([activeNotificationID])
            }
        }
    }, [activeNotificationID, props.loadingNotificationsFirstPage, props.notifications])

    useEffect(() => {
        if (activeChannelID) {
            props.fetchChannelNotifications(activeChannelID, 1)
            setChannelNotificationsPage(1)
        }
    }, [activeChannelID])

    useEffect(() => {
        if (!activeNotificationID && props.isSemiMobile) {
            setActiveChannelID(null)
        }
    }, [activeNotificationID, props.isSemiMobile])

    useEffect(() => {
        const containsMessage = !!props.channelNotifications.find(n => n._id === activeNotificationID)

        if (hasRenderedActiveMessage && containsMessage) {
            console.log('did call scroll to channel message')
            scrollToChannelMessage(activeMessageOffsetTop)
            console.log(JSON.stringify({
                activeMessageOffsetTop,
                containsMessage
            }, null, 4))
        }
    }, [activeNotificationID, props.channelNotifications, activeMessageOffsetTop, hasRenderedActiveMessage])

    // Utils

    const navigateToNotification = notificationID => {
        navigate(`/notifications/${notificationID}`)
    }

    const scrollToChannelMessage = messageOffsetTop => {
        const channelMessagesContainer = document.getElementById('channel-messages-container')
        channelMessagesContainer.scrollTop = messageOffsetTop
    }

    // Direct

    const onClickLoadMore = () => {
        props.fetchNotifications(notificationsPage + 1)
        setNotificationsPage(curr => curr + 1)
    }

    const onClickNotification = navigateToNotification

    const onClickBack = () => {
        navigate('/notifications')
    }

    const onLayoutActiveNotificationMessage = messageOffsetTop => {
        setActiveMessageOffsetTop(messageOffsetTop)
        setHasRenderedActiveMessage(true)
    }

    return (
        <PageContainer>
            <MainHeader showBorder={false} />
            <Subheader title='Notifications' />
            <FixedBodyContainer
                className='no-subheader-links' 
                style={{paddingTop: 30, paddingBottom: 30}}
            >
                {props.loadingNotificationsFirstPage ?
                    <Loading />
                    : <Container className={props.isSemiMobile ? 'semi-mobile' : ''}>
                        {props.isSemiMobile && activeChannel ? null
                            : <div className='notifications-list float-container'>
                                {props.notifications.map( notification => (
                                    <NotificationCard
                                        notification={notification}
                                        channel={NotificationChannels[notification.channelID]}
                                        isActive={notification._id == activeNotificationID}
                                        timeFormat='fromNow'
                                        onClick={() => onClickNotification(notification._id)}
                                    />
                                ))}
                                {props.canLoadMoreNotifications ?
                                    <Button
                                        title='Load more'
                                        priority={1}
                                        type='tint'
                                        onClick={onClickLoadMore}
                                    />
                                    : null
                                }
                            </div>
                        }
                        
                        {activeChannelID ?
                            props.loadingChannelNotifications ?
                                <Loading />
                                : <div className='channel-container'>
                                    <div className='channel-header'>
                                        {props.isSemiMobile ?
                                            <i className='bi-arrow-left icon-clickable-large' onClick={onClickBack} />
                                            : null
                                        }
                                        <h3 className='channel-title'>{activeChannel.title}</h3>
                                    </div>
                                    <div className='channel-messages-container' id='channel-messages-container'>
                                        {[...props.channelNotifications].reverse().map( notification => (
                                            <NotificationMessage
                                                notification={notification}
                                                channel={activeChannel}
                                                id={`channel-mesage-${notification._id}`}
                                                onLayout={notification._id === activeNotificationID ?
                                                    onLayoutActiveNotificationMessage
                                                    : undefined
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            : null
                        }
                    </Container>
                }
            </FixedBodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    
    & .notifications-list {
        display: flex;
        flex-direction :column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: scroll !important;
        width: 275px;
        min-width: 275px;
        margin-right: 30px;
    }

    &.semi-mobile .notifications-list {
        width: 100%;
        margin-right: 0px;
    }

    & .channel-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;
    }

    & .channel-header {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 10px;
    }

    & .channel-title {
        position: aboslute;
        margin: 0 auto;
    }

    & .channel-messages-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-top: 1px solid ${p => p.theme.bc};
        border-bottom: 1px solid ${p => p.theme.bc};
        overflow: scroll;
        position: relative;
    }
`

const mapStateToProps = state => ({
    isSemiMobile: getIsSemiMobile(state),

    notifications: getNotifications(state),
    loadingNotifications: getLoadingNotifications(state),
    loadingNotificationsFirstPage: getLoadingNotificationsFirstPage(state),
    canLoadMoreNotifications: getCanLoadMoreNotifications(state),

    channelNotifications: getChannelNotifications(state),
    loadingChannelNotifications: getLoadingChannelNotifications(state),
    loadingNotificationsFirstPage: getLoadingChannelNotificationsFirstPage(state),
    canLoadMoreChannelNotifications: getCanLoadMoreChannelNotifications(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    markNotificationsAsRead,
    fetchNotifications,
    fetchChannelNotifications
}, dispatch)

export const Notifications = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent)