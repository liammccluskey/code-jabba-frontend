import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const DefaultPhotoURL = '/images/logo.png'

export const NotificationCard = props => {
    const {
        notification, // {channel: {id, title}, message, ?photoURL, isRead, createdAt}
        isActive = false,
        timeFormat, // 'fromNow' | 'date'

        onClick,

        ...rest
    } = props

    const {
        channel,
        message,
        photoURL,
        isRead,
        createdAt
    } = notification

    const timeText = timeFormat === 'date' ?
        moment(createdAt).format('LL')
        : moment(createdAt).fromNow()

    return (
        <Root
            {...rest}
            className={`notification-container oh-dark ${isActive && 'active'}`}
            onClick={onClick}
        >
            {isRead ?
                <div className='read-mark' />
                : <div className='unread-mark' />
            }
            <img className='notification-photo' src={photoURL || '/images/logo.png'} />
            <div className='notification-body'>
                <div className='notification-title-container'>
                    <h5 className='fw-m'>{channel.title}</h5>
                    <h6>{timeText}</h6>
                </div>
                <p className={`notification-message line-clamp-2 ${!isRead && 'fw-m'}`}>
                    {message}
                </p>
            </div>
        </Root>
    )
}

const Root = styled.div`
    &.notification-container {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid ${p => p.theme.bc};
    }
    &.notification-container.active {
        border-left: 3px solid ${p => p.theme.tint};
    }
    &:last-child {
        border-bottom: none;
    }

    & .unread-mark,
    & .read-mark {
        min-height: 10px;
        min-width: 10px;
        box-sizing: border-box;
        border-radius: 50%;
        margin-right: 10px;
    }
    & .unread-mark {
        background-color: ${p => p.theme.tint};
    }
    & .read-mark {
        background-color: clear;
    }

    & .notification-photo {
        flex: 0;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }

    & .notification-body {
        flex: 1;
    }
    & .notification-title-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    } 

    & .notification-message {
        text-overflow: ellipsis;
        font-size: 15px;
        color: ${p => p.theme.textMain};
    }
`