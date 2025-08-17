import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { getIsMobile } from '../../../../redux/theme'
import { postCompany } from '../../../../redux/company'
import { addMessage } from '../../../../redux/communication'
import { 
    getFormData, 
    getFormDataModified, 
    isValidLinkedInCompanyUrl, 
    isValidGlassdoorCompanyUrl 
} from './utils'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import { getMongoUser } from '../../../../redux/user'

import { InputWithMessage } from '../../../components/common/InputWithMessage'
import { Button } from '../../../components/common/Button'

export const EditCompanyCardComponent = props => {
    const {
        isEditMode,
        company=undefined,

        ...rest
    } = props
    const navigate = useNavigate()

    // State

    const [formData, setFormData] = useState(isEditMode ?
        getFormData(company)
        : {
            name: '',
            headquartersAddress: '',
            description: '',
            linkedInURL: '',
            glassDoorURL: '',
        }
    )
    const [errors, setErrors] = useState({
        name: false,
        linkedInURL: false,
        glassDoorURL: false,
    })
    const [modified, setModified] = useState(isEditMode ? getFormDataModified(formData, company) : {})

    // Effects

    useEffect(() => {
        if (!isEditMode && !props.mongoUser.canPostJobs) {
            addCantCreateCompanyModal()
        }
    }, [])

    useEffect(() => {
        if (!props.company) return

        const {recruiters, admins} = props.company
        const {_id: userID} = props.mongoUser 

        if (
            isEditMode && 
            props.company && 
            !recruiters.includes(userID) && !admins.includes(userID)
        ) {
            addCantEditCompanyModal()
        }
    }, [company])

    useEffect(() => {
        isEditMode && company && setFormData(getFormData(company))
    }, [company])

    useEffect(() => {
        isEditMode && setModified(getFormDataModified(formData, company))
    }, [formData])

    // Utils

    const addError = field => {
        setErrors(curr => ({
            ...curr,
            [field]: true
        }))
    }

    const isValidForm = () => {
        let hasError = false
        if (!formData.name) {
            props.addMessage('You are missing the company name field.', true)
            addError('name')
            hasError = true
        }
        if (formData.linkedInURL && !isValidLinkedInCompanyUrl(formData.linkedInURL)) {
            props.addMessage('Your LinkedIn company page url is invalid.', true)
            addError('linkedInURL')
            hasError = true
        }
        if (formData.glassDoorURL && !isValidGlassdoorCompanyUrl(formData.glassDoorURL)) {
            props.addMessage('Your Glassdoor company page url is invalid.', true)
            addError('glassDoorURL')
            hasError = true
        }

        return !hasError
    }

    const addCantCreateCompanyModal = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Create a company - Requirements',
            message: "You can't create a company until you complete the To Do items on the Dashboard.",
            confirmButtonTitle: 'Go to dashboard',
            onConfirm: onSuccess => {
                navigate('/dashboard')
                onSuccess()
            },
            onCancel: () => navigate(-1)
        })
    }

    const addCantEditCompanyModal = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Edit company - Requirements',
            message: "Only the recruiters and admins of the company can edit this company.",
            confirmButtonTitle: 'Okay',
            onConfirm: onSuccess => {
                navigate(-1)
                onSuccess()
            },
            onCancel: () => navigate(-1)
        })
    }

    // Direct

    const onChangeField = e => {
        const {name, value} = e.target

        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
        setErrors(curr => ({
            ...curr,
            [name]: false
        }))
    }

    const onClickCreate = () => {
        if (!props.mongoUser.canPostJobs) {
            addCantCreateCompanyModal()
            return
        }
        if (!isValidForm()) {
            return
        }

        props.postCompany(formData, companyID => navigate(`/companies/${companyID}`))
    }

    const onClickSaveEdits = () => {
        if (!isValidForm()) {
            return
        }

        // props.patchJob(job._id, formData, () => navigate(-1))
    }

    const onClickCancel = () => {
        navigate(-1)
    }

    return (
        <Root className={`of-visible-float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <InputWithMessage
                inputType='text'
                label='Name'
                fieldName='name'
                text={formData.name}
                onChangeText={onChangeField}
                hasError={errors.name}
            />
            <InputWithMessage
                inputType='text'
                label='Headquarters address'
                text={formData.headquartersAddress}
                fieldName='headquartersAddress'
                onChangeText={onChangeField}
                optional={true}
            />
            <InputWithMessage
                inputType='textarea'
                label='Description'
                fieldName='description'
                text={formData.description}
                onChangeText={onChangeField}
                optional={true}
            />
            <InputWithMessage
                inputType='text'
                label='LinkedIn URL'
                fieldName='linkedInURL'
                text={formData.linkedInURL}
                onChangeText={onChangeField}
                hasError={errors.linkedInURL}
                errorText='Invalid url'
                optional={true}
                placeholder='https://'
            />
            <InputWithMessage
                inputType='text'
                label='Glassdoor URL'
                fieldName='glassDoorURL'
                text={formData.glassDoorURL}
                onChangeText={onChangeField}
                hasError={errors.glassDoorURL}
                errorText='Invalid url'
                optional={true}
                placeholder='https://'
            />
            <div className='buttons-container'>
                {isEditMode ?
                    <Button
                        title='Cancel'
                        priority={1}
                        type='clear'
                        onClick={onClickCancel}
                        style={{marginRight: 15}}
                    />
                    : null
                }
                {isEditMode ?
                    <Button
                        title='Save'
                        priority={1}
                        type='solid'
                        onClick={onClickSaveEdits}
                    />
                    : <Button
                        title='Create'
                        priority={1}
                        type='solid'
                        onClick={onClickCreate}
                    />
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;
    margin: 40px 0px;
    width: min(500px, 100%);
    align-self: center;
    box-sizing: border-box;

    &.mobile {
        padding: 20px;
    }

    & .row {
        margin-bottom: 30px;
    }

    & .buttons-container {
        display: flex;
        align-items: center;
        align-self: flex-end;
    }
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postCompany,
    addMessage,
    addModal
}, dispatch)

export const EditCompanyCard = connect(mapStateToProps, mapDispatchToProps)(EditCompanyCardComponent)