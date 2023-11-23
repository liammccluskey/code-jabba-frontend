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
    JobTypes,
    PositionTypes,
    SettingTypes,
    Languages,
    Skills
} from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'
import { PillOptions } from '../../../common/PillOptions'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'


export const EditWorkExperienceModalComponent = props => {
    const {
        modalID, 
        isEditMode,
        workExperience=null,
    } = props
    const [formData, setFormData] = useState(isEditMode ?
        {
            company: workExperience.company,
            jobTitle: workExperience.jobTitle,
            setting: workExperience.setting,
            type: workExperience.type, 
            position: workExperience.position,
            language: '', // temp
            languages: workExperience.languages,
            skill: '', // temp
            skills: workExperience.skills,
            description: workExperience.description,
            startMonth: workExperience.startMonth, 
            startYear: workExperience.startYear, 
            endMonth: workExperience.endMonth,
            endYear: workExperience.endYear,
            isCurrent: workExperience.isCurrent,
            id: workExperience.id,
        }
        : {
            company: '',
            jobTitle: '',
            setting: 'on-site',
            type: 'full-time', 
            position: 'frontend', 
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
        company: false,
        jobTitle: false,
        description: false,
    })
    const [modified, setModified] = useState(isEditMode ? getFormDataModified(formData, workExperience) : {})

    const checklistOptions = [{
        title: 'I am still at this role.',
        id: 'is-current',
        selected: formData.isCurrent
    }]

    useEffect(() => {
        isEditMode && setModified(getFormDataModified(formData, workExperience))
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
        if (!formData.company) {
            updateError('company', true)
            hasError = true
        }
        if (!formData.jobTitle) {
            updateError('jobTitle', true)
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

        const workExperiences = isEditMode ?
            props.mongoUser.workExperiences.map( workExperience => (
                workExperience.id === formData.id ? formData : workExperience
            ))
            : [...props.mongoUser.workExperiences, formData]

        props.patchUser({workExperiences}, onSaveSuccess, onFailure)
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

    const onClickPill = pillID => {
        switch (pillID) {
            case 'frontend':
            case 'backend':
            case 'full-stack':
                setFormData(curr => ({
                    ...curr,
                    position: pillID
                }))
                break
            case 'internship':
            case 'part-time':
            case 'contract':
            case 'full-time':
                setFormData(curr => ({
                    ...curr,
                    type: pillID
                }))
                break
            case 'on-site':
            case 'hybrid':
            case 'remote':
                setFormData(curr => ({
                    ...curr,
                    setting: pillID
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
            title={isEditMode ? 'Edit Work Experience' : 'Create Work Experience'}
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
            style={{overflow: 'scroll'}}
        >
            <Container>
                <InputWithMessage
                    label='Company'
                    inputType='text'
                    fieldName='company'
                    text={formData.company}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.company}
                    hasError={errors.company}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Job Title'
                    inputType='text'
                    fieldName='jobTitle'
                    text={formData.jobTitle}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.jobTitle}
                    hasError={errors.jobTitle}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Position'
                    inputType='select'
                    modified={isEditMode && modified.position}
                    selectValue={formData.position}
                    selectValues={PositionTypes}
                    onChangeSelectValue={onChangeField}
                    fieldName='position'
                />
                <InputWithMessage
                    label='Type'
                    modified={isEditMode && modified.type}
                    style={{marginBottom: 0}}
                />
                <div className='pills-row row'>
                    <PillOptions
                        options={JobTypes}
                        activeOptionID={formData.type}
                        onClickOption={onClickPill}
                        className='pill-options'
                    />
                </div>
                <InputWithMessage
                    label='Setting'
                    modified={isEditMode && modified.setting}
                    style={{marginBottom: 0}}
                />
                <div className='pills-row row'>
                    <PillOptions
                        options={SettingTypes}
                        activeOptionID={formData.setting}
                        onClickOption={onClickPill}
                        className='pill-options'
                    />
                </div>
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

export const EditWorkExperienceModal = connect(mapStateToProps, mapDispatchToProps)(EditWorkExperienceModalComponent)