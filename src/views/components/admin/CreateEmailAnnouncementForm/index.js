import React, {useState} from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button'

export const CreateEmailAnnouncemnentForm = props => {
    const {
        onSubmit, // (subject, message) => void
        onClickCancel,

        isMobile,
        
        ...rest
    } = props
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const onChangeSubject = e => {
        setSubject(e.target.value)
    }

    const onChangeMessage = e => {
        setMessage(e.target.value)
    }

    const onClickSubmit = e => {
        e.preventDefault()
        onSubmit({subject, message})
    }

    return (
        <Root
            {...rest}
            className={`float-container ${isMobile && 'mobile'} ${props.className}`}
            onSubmit={onClickSubmit}
        >
            <h3 className='form-title'>Create Email Announcement</h3>
            <label>Email Subject</label>
            <input value={subject} onChange={onChangeSubject} />
            <label>Email Message</label>
            <textarea value={message} onChange={onChangeMessage} />
            <div className='d-flex jc-flex-end ai-center'>
                <Button
                    title='Cancel'
                    type='tint'
                    priority={2}
                    onClick={onClickCancel}
                    style={{marginRight: 15}}
                />
                <Button
                    title='Submit'
                    type='solid'
                    priority={2}
                    onClick={onClickSubmit}
                    isSubmitButton={true}
                />
            </div>
        </Root>
    )
}

const Root = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 30px;
    box-sizing: border-box;

    &.mobile {
        padding: 20px;
    }

    & .form-title {
        margin-bottom: 30px;
    }

    & input {
        margin-bottom 20px;
    }

    & textarea {
        width: 100% !important;
        box-sizing: border-box;
        margin-bottom: 20px;
        height: 150px;
        white-space: pre-line;
    }

    & @keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 352px;
        }
    }

    & @-moz-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 352px;
        }
    }

    & @-webkit-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 352px;
        }
    }

    & @-o-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 352px;
        }
    }

    & @-ms-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 352px;
        }
    }

    // & {
    //     animation: expand-height var(--duration-animation-medium);
    //     -webkit-animation: expand-height var(--duration-animation-medium);
    //     -moz-animation: expand-height var(--duration-animation-medium);
    //     -ms-animation: expand-height var(--duration-animation-medium);
    //     -o-animation: expand-height var(--duration-animation-medium);
    // }
`