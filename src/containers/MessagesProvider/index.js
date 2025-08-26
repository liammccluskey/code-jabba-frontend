import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getMessages } from '../../redux/communication'
import { deleteMessage } from '../../redux/communication'

export const MessagesProviderComponent = props => {
    const {
        children
    } = props

    const onClickCloseMessage = messageID => {
        props.deleteMessage(messageID)
    }

    return (
        <div>
            {children}
            <Root className='messages-provider d-flex fd-column jc-flex-end ai-center'>
                {props.messages.map(({title, isError, id}) => (
                    <div
                        className={`d-flex jc-flex-start ai-center
                            ${isError ? 'error-message' : 'regular-message'}
                            animation-slide-up
                        `}
                        key={id}
                    >
                        <div
                            className='d-flex jc-flex-start ai-center x-button'
                            onClick={() => onClickCloseMessage(id)}
                        >
                            <i className='bi-x x-icon'/>
                        </div>
                        <div className='d-flex fd-column jc-flex-start ai-flex-start content-container'>
                            {isError ?
                                <div className='d-flex jc-flex-start ai-center info-label'>
                                    <i className='bi-exclamation-circle' />
                                    <h4>Something went wrong</h4>
                                </div>
                                : null
                            }
                            <h4 className='message-text'>{title}</h4>
                        </div>
                    </div>
                ))}
            </Root>
        </div>
    )
}

const Root = styled.div`
    height: calc(100vh - 100px);
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: clear;
    pointer-events: none;
    z-index: 30;
    padding-bottom: 100px;

    & .regular-message,
    & .error-message {
        overflow: hidden;
        margin-top: 10px;
        border: 2px solid;
        border-radius: var(--br-container);
        width: min(90vw, 350px);
        box-sizing: border-box;
        background-color: ${p => p.theme.bgcLight};
    }

    & .regular-message {
        border-color: ${p => p.theme.tint};
    }
    & .error-message {
        border-color: ${p => p.theme.error};
    }

    & .x-button {
        align-self: stretch;
        cursor: pointer;
        pointer-events: auto;
    }
    & .x-button:hover {
        filter: brightness(70%);
    }
    & .regular-message .x-button {
        background-color: ${p => p.theme.tint};
    }
    & .error-message .x-button {
        background-color: ${p => p.theme.error};
    }

    & .x-icon {
        font-size: 30px;
        color: white;
    }

    & .content-container {
        padding: 10px 10px;
    }

    & .info-label {
        margin-bottom: 5px;
    }
    & .info-label i,
    & .info-label h4 {
        color: ${p => p.theme.error} !important;
        margin-right: 5px;
    }
    & .info-label i {
        font-size: 15px;
    }

    & .message-text {
        color: ${p => p.theme.textPrimary};
    }
`
const mapStateToProps = state => ({
    messages: getMessages(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteMessage
}, dispatch)

export const MessagesProvider = connect(mapStateToProps, mapDispatchToProps)(MessagesProviderComponent)