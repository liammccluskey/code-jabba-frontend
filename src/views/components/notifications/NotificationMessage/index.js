import React, {useCallback} from 'react'
import styled from 'styled-components'
import moment from 'moment'

export const NotificationMessage = props => {
    const {
        notification, // {channelID, message, isRead, createdAt}
        channel, // {title, photoURL}
        messageContainerClassName=undefined,

        onLayout = () => {},

        ...rest
    } = props
    const messageRef = useCallback(node => {
        if (node) {
            const offsetTop = node.offsetTop
            onLayout(offsetTop)
        }
    })

    const timestampText = moment(notification.createdAt).format('MMM D')
        + ' - '
        + moment(notification.createdAt).format('h:mm a')

    return (
        <Root {...rest} ref={messageRef} className=''>
            <h5 className='timestamp-text'>
                {timestampText}
            </h5>
            <div className='content-container'>
                {channel.photoURL ?
                    <img className='channel-photo' src={channel.photoURL} />
                    : null      
                }
                {channel.icon ?
                    <div className='channel-icon-container'>
                        <i className={`channel-icon ${channel.icon}`} />
                    </div>
                    : null
                }
                <div className={`message-container ${messageContainerClassName}`}>
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

    & .channel-photo,
    & .channel-icon-container {
        flex: 0;
        height: 35px;
        width: 35px;
        min-height: 35px;
        min-width: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }

    & .channel-icon-container {
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        background-color: ${p => p.theme.tintTranslucent};
    }

    & .channel-icon {
        font-size: 20px;
        color: ${p => p.theme.tint};
    }

    & .message-container {
        text-overflow: ellipsis;
        padding: 15px;
        border: 1px solid ${p => p.theme.bgcLight};
        border-radius: var(--br-container);
        overflow: hidden;
        background-color: ${p => p.theme.bgcLight};
        box-shadow: ${p => p.theme.boxShadow};
    }
`