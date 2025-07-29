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

    const now = moment()
    let age = now.year() - birthdayYear
    if (now.isBefore(moment({year: now.year(), month: birthdayMonth, day: birthdayDay}))) {
        age -= 1
    }

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
                    <label>Age: </label>
                    <p>{age}</p>
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