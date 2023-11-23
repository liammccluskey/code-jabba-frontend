import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {v4 as uuid} from 'uuid'
import moment from 'moment'

import { 
    getMongoUser,

    fetchProfileUser,
    patchUser,
    fetchThisMongoUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { getFormDataModified } from './utils'
import { 
    Years,
    Months
} from '../EditEducationModal'
import {
    Languages,
    Skills
} from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'


export const EditProjectModalComponent = props => {
    const {
        modalID, 
        isEditMode,
        project=null,
    } = props
    const [formData, setFormData] = useState(isEditMode ?
        {
            title: project.title,
            url: project.url,
            codeURL: project.codeURL,
            language: '', // temp
            languages: project.languages,
            skill: '', // temp
            skills: project.skills,
            description: project.description,
            startMonth: project.startMonth, 
            startYear: project.startYear, 
            endMonth: project.endMonth,
            endYear: project.endYear,
            isCurrent: project.isCurrent,
            id: project.id,
        }
        : {
            title: '',
            url: '',
            codeURL: '',
            language: '', // temp
            languages: [],
            skill: '', // temp
            skills: [],
            description: '',
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
        title: false,
        description: false,
    })
    const [modified, setModified] = useState(isEditMode ? getFormDataModified(formData, project) : {})

    const checklistOptions = [{
        title: 'I am still building this project.',
        id: 'is-current',
        selected: formData.isCurrent
    }]

    useEffect(() => {
        isEditMode && setModified(getFormDataModified(formData, project))
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
        if (!formData.title) {
            updateError('title', true)
            hasError = true
        }
        if (!formData.description) {
            updateError('description', true)
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
        delete formData.language
        delete formData.skill

        const projects = isEditMode ?
            props.mongoUser.projects.map( project => (
                project.id === formData.id ? formData : project
            ))
            : [...props.mongoUser.projects, formData]

        props.patchUser({projects}, onSaveSuccess, onFailure)
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

    const onChangeLanguage = e => {
        setFormData(curr => ({
            ...curr,
            language: e.target.value
        }))
    }

    const onClickLanguageOption = option => {
        if (formData.languages.includes(option)) {
            setFormData(curr => ({
                ...curr,
                languages: curr.languages.filter(language => language !== option)
            }))
        } else {
            setFormData(curr => ({
                ...curr,
                languages: [...curr.languages, option]
            }))
        }
    }

    const onChangeSkill = e => {
        setFormData(curr => ({
            ...curr,
            skill: e.target.value
        }))
    }

    const onClickSkillOption = option => {
        if (formData.skills.includes(option)) {
            setFormData(curr => ({
                ...curr,
                skills: curr.skills.filter(skill => skill !== option)
            }))
        } else {
            setFormData(curr => ({
                ...curr,
                skills: [...curr.skills, option]
            }))
        }
    }

    return (
        <Confirm
            title={isEditMode ? 'Edit Project' : 'Create Project'}
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
            style={{overflow: 'scroll'}}
        >
            <Container>
                <InputWithMessage
                    label='Title'
                    inputType='text'
                    fieldName='title'
                    text={formData.title}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.title}
                    hasError={errors.title}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Project URL'
                    inputType='text'
                    fieldName='url'
                    text={formData.url}
                    placeholder='https://'
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.url}
                    optional={true}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Github URL'
                    inputType='text'
                    fieldName='codeURL'
                    text={formData.codeURL}
                    placeholder='https://'
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.codeURL}
                    optional={true}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Languages'
                    modified={isEditMode && modified.languages}
                    optional={true}
                    style={{marginBottom: 0}}
                />
                <SearchableSelectableInput
                    options={Languages}
                    selectedOptions={formData.languages}
                    value={formData.language}
                    fieldName='language'
                    onChange={onChangeLanguage}
                    onClickOption={onClickLanguageOption}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Skills'
                    modified={isEditMode && modified.skills}
                    optional={true}
                    style={{marginBottom: 0}}
                />
                <SearchableSelectableInput
                    options={Skills}
                    selectedOptions={formData.skills}
                    value={formData.skill}
                    fieldName='skill'
                    onChange={onChangeSkill}
                    onClickOption={onClickSkillOption}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Description'
                    inputType='textarea'
                    fieldName='description'
                    text={formData.description}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.description}
                    hasError={errors.description}
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

    & .pill-options {
        margin-top: 10px;
        margin-bottom: 20px;
    }
`

const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProfileUser,
    patchUser,
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const EditProjectModal = connect(mapStateToProps, mapDispatchToProps)(EditProjectModalComponent)