import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getNotifications,
    getLoadingNotificationsFirstPage,
    fetchNotifications,
    markNotificationsAsRead,
    NotificationChannels
} from '../../../../redux/ducks/communication'
import { DropdownMenu } from '../DropdownMenu'
import { Button } from '../../common/Button'
import { NotificationCard } from '../../notifications/NotificationCard'
import { Loading } from '../../common/Loading'

export const NotificationsMenuComponent = props => {
    const {
        menuHidden,

        setMenuHidden,

        ...rest
    } = props
    const navigate = useNavigate()

    const notifications = props.notifications.slice(0, 5)
    const hasUnreadNotifications = !!notifications.find(n => !n.isRead)

    useEffect(() => {
        props.fetchNotifications(1)
    }, [])

    useEffect(() => {
        if (hasUnreadNotifications && !menuHidden) {
            const unreadNotificationIDs = notifications.filter(n => !n.isRead)
                .map( n => n._id )
            props.markNotificationsAsRead(unreadNotificationIDs)
        }
    }, [menuHidden, hasUnreadNotifications])

    const onClickViewAll = () => {
        navigate('/notifications')
        setMenuHidden(true)
    }

    const onClickNotification = notification => {
        const {_id} = notification
        navigate(`/notifications/${_id}`)
        setMenuHidden(true)
    }

    return (
        <DropdownMenu
            {...rest}
            menuHidden={menuHidden}
            setMenuHidden={setMenuHidden}
            triggerElement={
                <IconContainer>
                    <i className={`bi-bell ${!menuHidden && 'active'}`} />
                    {hasUnreadNotifications ?
                        <div className='unread-mark' />
                        : null
                    }
                </IconContainer>
            }
            triggerHeight={35}
            menuElement={
                <MenuContainer>
                    <div className='header-container'>
                        <h4 className='menu-title'>Notifications</h4>
                        <Button
                            title='View all'
                            type='tint'
                            priority={2}
                            onClick={onClickViewAll}
                        />
                    </div>
                    {props.loading ?
                        <div className='loading-container'>
                            <Loading />
                        </div>
                    : notifications.length ?
                        <div className='notifications-container'>
                            {notifications.map( notification => (
                                <NotificationCard
                                    notification={notification}
                                    channel={NotificationChannels[notification.channelID]}
                                    onClick={() => onClickNotification(notification)}
                                    timeFormat='fromNow'
                                    key={notification._id}
                                />
                            ))}
                        </div>
                        : <div className='no-notifications-container'>
                            <p className='message'>No notifications.</p>
                        </div>
                    }
                </MenuContainer>
            }
        />
    )
}

const IconContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    & i {
        font-size: 25px;
        color: ${p => p.theme.textMain};
    }
    & i.active,
    & i:hover {
        color: ${p => p.theme.tint};
    }

    .unread-mark {
        min-height: 10px;
        min-width: 10px;
        max-height: 10px;
        max-width: 10px;
        position: absolute;
        top: 2px;
        right: -1px;
        background-color: ${p => p.theme.tint};
        border-radius: 50%;
    }
`


const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    & .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .loading-container,
    & .no-notifications-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px 15px;
    }

    & .message {
        color: ${p => p.theme.textSecondary};
    }

    & .notifications-container {
        max-height: 338px;
        box-sizing: border-box;
        overflow: scroll;
    }
`
const mapStateToProps = state => ({
    notifications: getNotifications(state),
    loading: getLoadingNotificationsFirstPage(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchNotifications,
    markNotificationsAsRead
}, dispatch)

export const NotificationsMenu = connect(mapStateToProps, mapDispatchToProps)(NotificationsMenuComponent)