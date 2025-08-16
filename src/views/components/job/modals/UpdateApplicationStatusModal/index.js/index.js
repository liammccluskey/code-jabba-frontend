import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { addMessage } from '../../../../../../redux/communication'

import { Confirm } from '../../../../modals/Confirm'

const getEmailBody = (jobTitle, jobCompanyName, candidateName, recruiterName, isAccept) => {
    if (isAccept) {
        return `Hi ${candidateName},\n\nWe are pleased to inform you that your application to ${jobCompanyName} for the position of ${jobTitle} has been accepted. We will follow up with next steps soon.\n\nBest regards,\n${recruiterName}\n${jobCompanyName}`
    } else {
        return `Hi ${candidateName},\n\nWe regret to inform you that after reviewing your application to the ${jobTitle} position at ${jobCompanyName}, we will not be moving forward at this time.\n\nThank you for your interest in joining our team, and we wish you the best in your future endeavors.\n\nBest regards,\n${recruiterName}\n${jobCompanyName}`
    }
}

export const UpdateApplicationStatusModalComponent = props => {
    const {
        modalID,
        isAccept, // boolean
        jobTitle, // string
        jobCompanyName, // string
        candidateName, // string
        recruiterName,

        onUpdateStatus, // (onSuccess, onFailure) => void
    } = props

    // State

   const [updatePending, setUpdatePending] = useState(false)

    // Utils

    // Direct

    const onClickUpdateStatus = (onSuccess, onFailure) => {
        setUpdatePending(true)

        const onUpdateSuccess = () => {
            setUpdatePending(false)
            onSuccess()
        }
        const onUpdateFailure = () => {
            setUpdatePending(false)
            onFailure()
        }

        onUpdateStatus(onUpdateSuccess, onUpdateFailure)
    }


    return (
        <Confirm
            title={isAccept ? 'Accept application' : 'Reject application'}
            message={`Are you sure you want to ${isAccept ? 'accept' : 'reject'} this application? This action will notify the applicant by sending them the following email.`}
            confirmButtonTitle={isAccept ? 'Send acceptance' : 'Send rejection'}
            confirmButtonDisabled={updatePending}
            isDanger={!isAccept}
            onConfirm={onClickUpdateStatus}
            modalID={modalID}
        >
            <Root>
                <label>Subject</label>
                <p className='email-subject'>{`${jobCompanyName} Application Update - ${jobTitle}`}</p>
                <label>Message</label>
                <p className='email-body'>{getEmailBody(jobTitle, jobCompanyName, candidateName, recruiterName, isAccept)}</p>
            </Root>
        </Confirm>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid ${p => p.theme.bc};
    border-radius: var(--br-container);
    padding: 15px;

    & label {
        margin-bottom: 5px;
    }

    & .email-subject {
        margin-bottom: 20px;
    }

    & .email-body {
        white-space: pre-line;
    }
`

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
    addMessage
}, dispatch)

export const UpdateApplicationStatusModal = connect(mapStateToProps, mapDispatchToProps)(UpdateApplicationStatusModalComponent)