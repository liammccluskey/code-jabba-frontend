import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getMongoUser,

    fetchProfileUser,
    patchUserResume,
    fetchThisMongoUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { Confirm } from '../../../modals/Confirm'

const InvalidFileTypeMessage = 'Invalid file type. We only accept PDFs for resume files.'

export const EditResumeModalComponent = props => {
    const {
        modalID
    } = props
    const [resumeFile, setResumeFile] = useState(null)

    // Utils

    const isValidResumeFile = file => {
        if (!file) return false

        return file.type === 'application/pdf'
    }

    // Direct

    const onClickSave = (onSuccess, onFailure) => {
        if (!resumeFile) {
            props.addMessage('You need to upload a pdf.', true)
            onFailure()
            return
        } else if (!isValidResumeFile(resumeFile)) {
            props.addMessage(InvalidFileTypeMessage, true, true)
            onFailure()
            return
        }

        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }

        props.patchUserResume(resumeFile, onSaveSuccess, onFailure)
    }

    const onChangeResumeFile = e => {
        if (!e.target.files[0]) return
        else if (!isValidResumeFile(e.target.files[0])) {
            props.addMessage(InvalidFileTypeMessage, true, true)
            return
        }

        setResumeFile(e.target.files[0])
    }

    return (
        <Confirm
            title='Edit Resume'
            confirmButtonTitle='Save'
            confirmButtonDisabled={!resumeFile}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <label>Resume</label>
            <input
                type='file'
                onChange={onChangeResumeFile}
            />
        </Confirm>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProfileUser,
    patchUserResume,
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const EditResumeModal = connect(mapStateToProps, mapDispatchToProps)(EditResumeModalComponent)