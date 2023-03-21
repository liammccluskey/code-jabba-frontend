import React, {useState} from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button'

export const CreateAppAnnouncemnentForm = props => {
    const {
        onSubmit, // formData => void

        isMobile,
        
        ...rest
    } = props
    const [message, setMessage] = useState('')

    const onChangeMessage = e => {
        setMessage(e.target.value)
    }

    const onClickSubmit = e => {
        e.preventDefault()
        onSubmit({message})
    }

    return (
        <Root {...rest} className={`float-container ${isMobile && 'mobile'}`} onSubmit={onClickSubmit}>
            <h3 className='form-title'>Create App Announcement</h3>
            <label>Announcement Message</label>
            <textarea value={message} onChange={onChangeMessage} />
            <Button
                title='Submit'
                type='solid'
                priority={2}
                onClick={onClickSubmit}
                isSubmitButton={true}
                className='as-flex-end'
            />
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
    background-color: ${p => p.theme.bgcSettings} !important;
    border: 1px solid ${p => p.theme.bc} !important;

    &.mobile {
        padding: 20px;
    }

    & .form-title {
        margin-bottom: 30px;
    }

    & textarea {
        width: 100% !important;
        box-sizing: border-box;
        margin-bottom: 20px;
        height: 100px;
    }

    & @keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 265px;
        }
    }

    & @-moz-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 265px;
        }
    }

    & @-webkit-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 265px;
        }
    }

    & @-o-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 265px;
        }
    }

    & @-ms-keyframes expand-height {
        0% {
            height: 0px;
        }
        100% {
            height: 265px;
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