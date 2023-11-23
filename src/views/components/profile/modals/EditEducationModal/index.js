import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'
import {v4 as uuid} from 'uuid'

import { 
    getMongoUser,
    
    patchUser,
    fetchProfileUser,
    fetchThisMongoUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { getFormDataModified } from './utils'
import { EducationLevels } from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const Months = [
    {title: 'January', id: '0'},
    {title: 'February', id: '1'},
    {title: 'March', id: '2'},
    {title: 'April', id: '3'},
    {title: 'May', id: '4'},
    {title: 'June', id: '5'},
    {title: 'July', id: '6'},
    {title: 'August', id: '7'},
    {title: 'September', id: '8'},
    {title: 'October', id: '9'},
    {title: 'November', id: '10'},
    {title: 'Decmeber', id: '11'},
]

export const Years = () => {
    const years = []
    for (let i = 0; i < 100; i++) {
        const year = (moment().year() - i).toString()
        years.push({title: year, id: year})
    }
    return years
}

export const EditEducationModalComponent = props => {
    const {
        modalID,
        isEditMode,
        education=null,
    } = props
    const [formData, setFormData] = useState(isEditMode ?
        {
            school: education.school, 
            degree: education.degree, 
            fieldOfStudy: education.fieldOfStudy, 
            startMonth: education.startMonth, 
            startYear: education.startYear, 
            endMonth: education.endMonth,
            endYear: education.endYear,
            isCurrent: education.isCurrent,
            id: education.id,
        }
        : {
            school: '', 
            degree: 'bss', 
            fieldOfStudy: '', 
            startMonth: '0', 
            startYear: moment().year().toString(), 
            endMonth: '0',
            endYear: moment().year().toString(),
            isCurrent: false,
            id: uuid(),
        }
    )
    const [years] = useState(Years())
    const [errors, setErrors] = useState({
        school: false,
        fieldOfStudy: false,
    })
    const [modified, setModified] = useState(isEditMode ? getFormDataModified(formData, education) : {})

    const checklistOptions = [{
        title: 'I have not graduated yet.',
        id: 'is-current',
        selected: formData.isCurrent
    }]

    useEffect(() => {
        isEditMode && setModified(getFormDataModified(formData, education))
    }, [formData])

    // Utils

    const updateError = (fieldName, hasError) => {
        setErrors(curr => ({
            ...curr,
            [fieldName]: hasError
        }))
    }

    const validateForm = () => {
        let hasError = false
        if (!formData.school) {
            updateError('school', true)
            hasError = true
        }
        if (!formData.fieldOfStudy) {
            updateError('fieldOfStudy', true)
            hasError = true
        }
        return hasError
    }

    // Direct

    const onClickSave = (onSuccess, onFailure) => {
        if (validateForm()) {
            props.addMessage('You  are missing one or more required fields.', true)
            onFailure()
            return
        }

        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }
        
        const educations = isEditMode ?
            props.mongoUser.educations.map( education => (
                education.id === formData.id ? formData : education
            ))
            : [...props.mongoUser.educations, formData]

        props.patchUser({educations}, onSaveSuccess, onFailure)
    }

    const onChangeField = e => {
        const {name, value} = e.target

        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
        updateError(name, false)
    }

    const onClickCheckbox = optionID => {
        switch (optionID) {
            case 'is-current':
                setFormData(curr => ({
                    ...curr,
                    isCurrent: !curr.isCurrent
                }))
                break
        }
    }

    return (
        <Confirm
            title={isEditMode ? 'Edit Education' : 'Create Education'}
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <Container>
                <InputWithMessage
                    label='School'
                    inputType='text'
                    fieldName='school'
                    text={formData.school}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.school}
                    hasError={errors.school}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Degree'
                    inputType='select'
                    fieldName='degree'
                    selectValue={formData.degree}
                    selectValues={EducationLevels}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.degree}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Field of Study'
                    inputType='text'
                    fieldName='fieldOfStudy'
                    text={formData.fieldOfStudy}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.fieldOfStudy}
                    hasError={errors.fieldOfStudy}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    inputType='checklist'
                    label='Is current'
                    checklistOptions={checklistOptions}
                    onClickCheckbox={onClickCheckbox}
                    modified={isEditMode && modified.isCurrent}
                    style={{marginBottom: 20}}
                />
                <div className='inputs-container'>
                    <InputWithMessage
                        label='Start month'
                        inputType='select'
                        fieldName='startMonth'
                        selectValue={formData.startMonth}
                        selectValues={Months}
                        onChangeSelectValue={onChangeField}
                        modified={isEditMode && modified.startMonth}
                        style={{marginBottom: 0, flex: 1, marginRight: 10}}
                    />
                    <InputWithMessage
                        label='Start year'
                        inputType='select'
                        fieldName='startYear'
                        selectValue={formData.startYear}
                        selectValues={years}
                        onChangeSelectValue={onChangeField}
                        modified={isEditMode && modified.startYear}
                        style={{marginBottom: 0, flex: 1}}
                    />
                </div>
                {!formData.isCurrent ?
                    <div className='inputs-container'>
                        <InputWithMessage
                            label='End month'
                            inputType='select'
                            fieldName='endMonth'
                            selectValue={formData.endMonth}
                            selectValues={Months}
                            onChangeSelectValue={onChangeField}
                            modified={isEditMode && modified.endMonth}
                            style={{marginBottom: 0, flex: 1, marginRight: 10}}
                        />
                        <InputWithMessage
                            label='End year'
                            inputType='select'
                            fieldName='endYear'
                            selectValue={formData.endYear}
                            selectValues={years}
                            onChangeSelectValue={onChangeField}
                            modified={isEditMode && modified.endYear}
                            style={{marginBottom: 0, flex: 1}}
                        />
                    </div>
                    : null
                }
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
        margin-bottom: 20px;
    }
`

const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUser,
    fetchProfileUser,
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const EditEducationModal = connect(mapStateToProps, mapDispatchToProps)(EditEducationModalComponent)