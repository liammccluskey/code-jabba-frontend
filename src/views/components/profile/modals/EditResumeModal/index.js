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

export const EditResumeModalComponent = props => {
    const {
        modalID
    } = props
    const [imageFile, setImageFile] = useState(null)

    const onClickSave = (onSuccess, onFailure) => {
        if (!imageFile) {
            props.addMessage('You need to upload a pdf.', true)
            return
        }

        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }

        props.patchUserResume(imageFile, onSaveSuccess, onFailure)
    }

    const onChangeImageFile = e => {
        if (!e.target.files[0]) return

        setImageFile(e.target.files[0])
    }

    return (
        <Confirm
            title='Edit Resume'
            confirmButtonTitle='Save'
            confirmButtonDisabled={!imageFile}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <label>Resume</label>
            <input
                type='file'
                accept='pdf'
                onChange={onChangeImageFile}
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