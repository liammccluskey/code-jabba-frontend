import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getMongoUser,

    patchUser,
    fetchThisMongoUser,
    fetchProfileUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { getFormDataModifed } from './utils'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const EditSocialsModalComponent = props => {
    const {
        modalID,
    } = props
    const [formData, setFormData] = useState({
        linkedInURL: props.mongoUser.linkedInURL,
        githubURL: props.mongoUser.githubURL,
        leetcodeURL: props.mongoUser.leetcodeURL,
        portfolioURL: props.mongoUser.portfolioURL,
    })
    const [errors, setErrors] = useState({
        linkedInURL: false,
    })
    const [modified, setModified] = useState(getFormDataModifed(formData, props.mongoUser))

    useEffect(() => {
        setModified(getFormDataModifed(formData, props.mongoUser))
    }, [formData])

    // Utils

    const updateError = (fieldName, hasError) => {
        setErrors(curr => ({
            ...curr,
            [fieldName]: hasError
        }))
    }

    const validateForm = () => {
        let hasErrors = false

        if (!formData.linkedInURL) {
            updateError('linkedInURL', true)
            hasErrors = true
        }
        return hasErrors
    }

    // Direct

    const onClickSave = (onSuccess, onFailure) => {
        const hasErrors = validateForm(true)

        if (hasErrors) {
            props.addMessage('You are missing one or more required fields.', true)
            onFailure()
            return
        }

        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }

        props.patchUser(formData, onSaveSuccess, onFailure)
    }

    const onChangeField = e => {
        const {name, value} = e.target

        setFormData(curr => ({
            ...curr,
            [name]: value
        }))

        updateError(name, false)
    }


    return (
        <Confirm
            title='Edit Socials'
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <InputWithMessage
                inputType='text'
                label='LinkedIn URL'
                placeholder='https://'
                fieldName='linkedInURL'
                text={formData.linkedInURL}
                onChangeText={onChangeField}
                hasError={errors.linkedInURL}
                modified={modified.linkedInURL}
                style={{marginBottom: 20}}
            />
            <InputWithMessage
                inputType='text'
                label='Github URL'
                placeholder='https://'
                fieldName='githubURL'
                text={formData.githubURL}
                onChangeText={onChangeField}
                modified={modified.githubURL}
                optional={true}
                style={{marginBottom: 20}}
            />
            <InputWithMessage
                inputType='text'
                label='Leetcode URL'
                placeholder='https://'
                fieldName='leetcodeURL'
                optional={true}
                text={formData.leetcodeURL}
                onChangeText={onChangeField}
                modified={modified.leetcodeURL}
                style={{marginBottom: 20}}
            />
            <InputWithMessage
                inputType='text'
                label='Portfolio URL'
                placeholder='https://'
                fieldName='portfolioURL'
                optional={true}
                text={formData.portfolioURL}
                onChangeText={onChangeField}
                modified={modified.portfolioURL}
                style={{marginBottom: 20}}
            />
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & input {
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
        margin-bottom: 20px;
    }

    & select {
        margin-bottom: 20px;
    }

    & textarea {
        width: 100% !important;
        height: 150px;
        box-sizing: border-box;
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
    }
`

const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUser,
    fetchThisMongoUser,
    fetchProfileUser,
    addMessage
}, dispatch)

export const EditSocialsModal = connect(mapStateToProps, mapDispatchToProps)(EditSocialsModalComponent)