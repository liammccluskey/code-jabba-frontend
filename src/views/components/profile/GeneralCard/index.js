import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { IconButton } from '../../common/IconButton'

export const GeneralCard = props => {
    const {
        email=null,
        phoneNumber=null,
        address=null,
        birthdayDay,
        birthdayMonth,
        birthdayYear,
        isEditable, // boolean
        showSensitiveInformation, // boolean

        onClickEdit, // () => void

        ...rest
    } = props

    return (
        <Root className='float-container' {...rest}>
            <div className='contact-header'>
                <h3>General</h3>
                {isEditable ?
                    <IconButton
                        icon='bi-pencil'
                        size='s'
                        color='tint'
                        onClick={onClickEdit}
                    />
                    : null
                }
            </div>
            <div className='contact-container'>
                <label>Email: </label>
                <p>{email ? email : 'Not provided'}</p>
            </div>
            {showSensitiveInformation ?
                <div className='contact-container'>
                    <label>Phone Number: </label>
                    <p>{phoneNumber ? phoneNumber : 'Not provided'}</p>
                </div>
                : null
            }
            {showSensitiveInformation ?
                <div className='contact-container'>
                    <label>Address: </label>
                    <p>{address ? address : 'Not provided'}</p>
                </div>
                : null
            }
            {showSensitiveInformation ?
                <div className='contact-container'>
                    <label>Birthday: </label>
                    <p>{`${moment({year: Number(birthdayYear), month: Number(birthdayMonth), day: Number(birthdayDay)}).format('L')}` }</p>
                </div>
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    & label {
        white-space: nowrap;
    }

    & .contact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .contact-container {
        display: flex;
        align-items: flex-start;
        margin-bottom: 7px;
    }
    & label {
        margin-right: 5px;
    }
`