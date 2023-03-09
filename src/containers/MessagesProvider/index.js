import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getMessages } from '../../redux/ducks/communication'
import { deleteMessage } from '../../redux/ducks/communication'

export const MessagesProviderComponent = props => {
    const {
        children
    } = props

    const onClickCloseMessage = messageID => {
        console.log('did call onlcick')
        props.deleteMessage(messageID)
    }

    return (
        <div>
            {children}
            <Root className='d-flex fd-column jc-flex-end ai-center'>
                {props.messages.map(({title, isError, id}) => (
                    <div
                        className={`d-flex jc-flex-start ai-center
                            ${isError ? 'error-message' : 'regular-message'}
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
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: clear;
    pointer-events: none;
    padding-bottom: 100px;
    box-sizing: border-box;

    .regular-message,
    .error-message {
        overflow: hidden;
        margin-top: 10px;
        border: 2px solid;
        border-radius: var(--br-container);
        width: 350px;
        box-sizing: border-box;
        background-color: ${p => p.theme.bgcLight};
    }

    .regular-message {
        border-color: ${p => p.theme.tint};
    }
    .error-message {
        border-color: ${p => p.theme.error};
    }

    .x-button {
        align-self: stretch;
        cursor: pointer;
        pointer-events: auto;
    }
    .x-button:hover {
        filter: brightness(70%);
    }
    .regular-message .x-button {
        background-color: ${p => p.theme.tint};
    }
    .error-message .x-button {
        background-color: ${p => p.theme.error};
    }

    .x-icon {
        font-size: 30px;
        color: white;
    }

    .content-container {
        padding: 10px 10px;
    }

    .info-label {
        margin-bottom: 5px;
    }
    .info-label i,
    .info-label h4 {
        color: ${p => p.theme.error} !important;
        margin-right: 5px;
    }
    .info-label i {
        font-size: 15px;
    }

    .message-text {
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