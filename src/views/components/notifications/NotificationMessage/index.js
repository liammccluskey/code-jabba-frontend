import React, {useCallback} from 'react'
import styled from 'styled-components'
import moment from 'moment'

export const NotificationMessage = props => {
    const {
        notification, // {channelID, message, isRead, createdAt}
        channel, // {title, photoURL}
        rootRef,

        onLayout = () => {},

        ...rest
    } = props
    const messageRef = useCallback(node => {
        if (node) {
            const offsetTop = node.offsetTop
            onLayout(offsetTop)
            // console.log(JSON.stringify({
            //     offsetTop
            // }, null, 4))
        }
    })

    const timestampText = moment(notification.createdAt).format('MMM D')
        + ' - '
        + moment(notification.createdAt).format('h:mm a')

    return (
        <Root {...rest} ref={messageRef}>
            <h5 className='timestamp-text'>
                {timestampText}
            </h5>
            <div className='content-container'>
                <img className='channel-photo' src={channel.photoURL} />
                <div className='message-container float-container'>
                    <p>{notification.message}</p>
                </div>
            </div>
        </Root>
    )
}

const Root = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px 0px;

    & .timestamp-text {
        color: ${p => p.theme.textTertiary};
        text-transform: uppercase;
        align-self: center;
        margin-bottom: 10px;
    }

    & .content-container {
        width: 75%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    & .channel-photo {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }

    & .message-container {
        text-overflow: ellipsis;
        padding: 15px;
    }
`