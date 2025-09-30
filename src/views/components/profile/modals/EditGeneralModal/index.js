import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'

import { 
    getMongoUser,

    patchUser,
    fetchThisMongoUser,
    fetchProfileUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { getFormDataModifed } from './utils'
import { 
    Months,
    Years
} from '../EditEducationModal'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const Days = () => {
    const days = []
    for (let i = 1; i <= 31; i++) {
        const day = i.toString()
        days.push({title: day, id: day})
    }

    return days
}

export const EditGeneralModalComponent = props => {
    const {
        modalID,
    } = props
    const [formData, setFormData] = useState({
        email: props.mongoUser.email,
        phoneNumber: props.mongoUser.phoneNumber,
        address: props.mongoUser.address,
        birthdayDay: props.mongoUser.birthdayDay || '1',
        birthdayMonth: props.mongoUser.birthdayMonth || '1',
        birthdayYear: props.mongoUser.birthdayYear || moment().year().toString(),
    })
    const [errors, setErrors] = useState({
        email: false,
        phoneNumber: false,
        address: false,
    })
    const [modified, setModified] = useState(getFormDataModifed(formData, props.mongoUser))
    const [days] = useState(Days())
    const [years] = useState(Years())

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

        if (!formData.email) {
            updateError('email', true)
            hasErrors = true
        }
        if (!formData.phoneNumber) {
            updateError('phoneNumber', true)
            hasErrors = true
        }
        if (formData.phoneNumber) {
            let parsedNumber = ''
            const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    
            const chars = [...formData.phoneNumber]
    
            for (let i = 0; i < chars.length; i++) {
                const char = chars[i]
                if (nums.includes(char)) {
                    parsedNumber += char
                }
            }
    
            if (parsedNumber.length !== 10) {
                updateError('phoneNumber', true)
                props.addMessage('Your phone number must be 10 digits long.', true, true)
                hasErrors = true
            } else {
                setFormData(curr => ({
                    ...curr,
                    phoneNumber: parsedNumber
                }))
            }
        }
        if (!formData.address) {
            updateError('address', true)
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

        props.patchUser(formData, modified.email ? () => {} : onSaveSuccess, onFailure)

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
            title='Edit General Information'
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
            style={{overflow: 'scroll'}}
        >
            <Container>
                <InputWithMessage
                    inputType='text'
                    label='Email'
                    fieldName='email'
                    text={formData.email}
                    onChangeText={onChangeField}
                    hasError={errors.email}
                    modified={modified.email}
                    locked={true}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    inputType='text'
                    label='Phone Number'
                    fieldName='phoneNumber'
                    text={formData.phoneNumber}
                    onChangeText={onChangeField}
                    hasError={errors.phoneNumber}
                    modified={modified.phoneNumber}
                    labelMessage='Your phone number will only be visible to you on your public profile. It can also be seen by recruiters on job applications.'
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    inputType='textarea'
                    label='Address'
                    fieldName='address'
                    text={formData.address}
                    onChangeText={onChangeField}
                    hasError={errors.address}
                    modified={modified.address}
                    labelMessage='Your address will only be visible to you on your public profile. It can also be seen by recruiters on job applications.'
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Birthday'
                    labelMessage='Only your age will be visible on your public profile.'
                    style={{marginBottom: 5}}
                />
                <div className='inputs-container'>
                    <InputWithMessage
                        inputType='select'
                        label='Month'
                        fieldName='birthdayMonth'
                        selectValue={formData.birthdayMonth}
                        selectValues={Months}
                        modified={modified.birthdayMonth}
                        onChangeSelectValue={onChangeField}
                        style={{flex: 1, marginRight: 5}}
                    />
                    <InputWithMessage
                        inputType='select'
                        label='Day'
                        fieldName='birthdayDay'
                        selectValue={formData.birthdayDay}
                        selectValues={days}
                        modified={modified.birthdayDay}
                        onChangeSelectValue={onChangeField}
                        style={{flex: 1, marginRight: 5}}
                    />
                    <InputWithMessage
                        inputType='select'
                        label='Year'
                        fieldName='birthdayYear'
                        selectValue={formData.birthdayYear}
                        selectValues={years}
                        modified={modified.birthdayYear}
                        onChangeSelectValue={onChangeField}
                        style={{flex: 1}}
                    />
                </div>
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .inputs-container {
        display: flex;
        align-items: flex-start;
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

export const EditGeneralModal = connect(mapStateToProps, mapDispatchToProps)(EditGeneralModalComponent)