import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { getIsMobile } from '../../../../redux/theme'
import {
    getCompanySearchResults,
    getLoadingCompanySearchResults,

    searchCompanies,
    postJob,
    patchJob,
    repostJob,
} from '../../../../redux/job'
import { addMessage } from '../../../../redux/communication'
import {
    getFormData,
    getFormDataModified
} from './utils'
import { Pill } from '../../common/Pill'
import { InputWithMessage } from '../../common/InputWithMessage'
import { PillOptions } from '../../common/PillOptions'
import { SearchableInput } from '../../common/SearchableInput'
import { Button } from '../../common/Button'
import { SearchableSelectableInput } from '../../common/SearchableSelectableInput'
import { Tooltip } from '../../common/Tooltip'

export const PositionTypes = [
    {id: 'frontend', title: 'Frontend'},
    {id: 'backend', title: 'Backend'},
    {id: 'full-stack', title: 'Full Stack'}
]

export const JobTypes = [
    {id: 'internship', title: 'Internship'},
    {id: 'part-time', title: 'Part-time'},
    {id: 'contract', title: 'Contract'},
    {id: 'full-time', title: 'Full-time'}
]

export const SettingTypes = [
    {id: 'on-site', title: 'On-site'},
    {id: 'hybrid', title: 'Hybrid'},
    {id: 'remote', title: 'Remote'},
]

export const ExperienceLevels = [
    {id: 'entry', title: 'Entry'},
    {id: 'mid', title: 'Mid'},
    {id: 'senior', title: 'Senior'},
    {id: 'staff', title: 'Staff'},
    {id: 'principal', title: 'Principal'}
]

export const ExperienceYears = [
    {id: '0', title: 'None', min: 0, max: 0},
    {id: '1', title: '1-2', min: 1, max: 2},
    {id: '2', title: '3-4', min: 3, max: 4},
    {id: '3', title: '5-6', min: 5, max: 6},
    {id: '4', title: '7-8', min: 7, max: 8},
    {id: '5', title: '9-10', min: 9, max: 10},
    {id: '6', title: '11+', min: 11, max: 11},
]

export const ApplicationType = [
    {id: 'custom', title: 'Custom'},
    {id: 'easy-apply', title: 'Easy apply'},
]

export const Languages = [
    'Javascript',
    'Typescript',
    'Java',
    'Python',
    'C',
    'C++',
    'C#',
    'SQL',
    'PHP',
    'Ruby',
    'Swift',
    'Objective-C',
    'Kotlin',
    'HTML',
    'CSS',
    'Golang',
    'Perl',
    'Rust',
    'R'
].sort((a, b) => a.localeCompare(b))

export const Skills = [
    'React.js',
    'Node.js',
    'MongoDB',
    'Express.js',
    'Angular',
    'AngularJS',
    'Next.js',
    'Flask',
    'Django',
    'Spring Boot',
    'Svelte',
    'Vue.js',
    'jQuery',
    'Ember.js',
    'Backbone.js',
    'Semantic-UI',
    'Foundation',
    'Preact',
    'ASP.NET Core',
    'Laravel',
    'Ruby on Rails',
    'Cake PHP',
    'Koa',
    'Phoenix',
    'AWS',
    'Azure',
    'GCP',
    'Firebase',
    'Nest.js',
    'Docker',
    'Kubernetes',
    'iOS',
    'Android',
    '.NET'
].sort((a, b) => a.localeCompare(b))

export const Questions = [
    {
        title: 'What gender do you identify as?',
        id: 'gender',
        inputType: 'select',
        options: [
            {title: 'Male', id: 'male'},
            {title: 'Female', id: 'female'},
            {title: 'Other', id: 'gender-other'},
            {title: "I'd rather not say", id: 'gender-rather-not-say'},
        ],
        custom: false
    },
    {
        title: 'Are you a protected veteran?',
        id: 'veteran',
        inputType: 'select',
        options: [
            {title: 'I am a veteran', id: 'veteran-yes'},
            {title: 'I am not a veteran', id: 'veteran-no'},
            {title: "I'd rather not say", id: 'veteran-rather-not-say'},
        ],
        custom: false
    },
    {
        title: 'Do you have a disability?',
        id: 'disability',
        inputType: 'select',
        options: [
            {title: 'Yes I have a disability', id: 'disabilty-yes'},
            {title: "No I don't have a disability and have not had one in the past", id: 'disability-no'},
            {title: "I'd rather not say", id: 'disability-rather-not-say'},
        ],
        custom: false
    },
    {
        title: 'What race do you identify as?',
        id: 'race',
        inputType: 'select',
        options: [
            {title: 'American Indian or Alaska Native', id: 'american-indan'},
            {title: 'Asian', id: 'asian'},
            {title: 'Black or African American', id: 'black'},
            {title: 'Hispanic or Latino', id: 'hispanic'},
            {title: 'Native Hawaiian or Other Pacific Islander'},
            {title: 'White', id: 'white'}
        ],
        custom: false
    },
    {
        title: 'What are your salary expectations?',
        id: 'salary-expectation',
        inputType: 'text',
        custom: false
    },
    {
        title: 'What is the highest level of education you have completed?',
        id: 'education',
        inputType: 'select',
        options: [
            {title: 'Highschool', id: 'highschool'},
            {title: 'Bootcamp', id: 'bootcamp'},
            {title: "Associate's", id: 'associates'},
            {title: "Bachelor's", id: 'bachelors'},
            {title: "Master's", id: 'masters'},
            {title: "Doctorate's", id: 'doctorates'},
        ]
    },
    {
        title: 'Why are you interested in working for us?',
        id: 'interest',
        inputType: 'textarea',
        custom: true
    },
    {
        title: 'Are you authorized to work in the United States?',
        id: 'work-authorization',
        inputType: 'select',
        options: [
            {title: 'Yes', id: 'work-authorization-yes'},
            {title: 'No', id: 'work-authorization-no'},
        ],
        custom: false
    },
    {
        title: 'Will you now or in the future require sponsorship for work authorization?',
        id: 'sponsorship',
        inputType: 'select',
        options: [
            {title: 'Yes', id: 'work-authorization-yes'},
            {title: 'No', id: 'work-authorization-no'},
        ],
        custom: false
    },
    {
        title: 'Which side project are you most passionate about?',
        id: 'side-project',
        inputType: 'textarea',
        custom: false
    }
].sort( (a, b) => a.title.localeCompare(b.title))

export const SalaryTypes = [
    {id: 'range', title: 'Range'},
    {id: 'exact', title: 'Exact pay'},
    {id: 'not-provided', title: 'Not provided'},
]

export const SalaryFrequencies = [
    {id: 'year', title: 'Per year'},
    {id: 'hour', title: 'Per hour'},
]

export const EditJobCardComponent = props => {
    const {
        isEditMode=false,
        job=undefined,

        ...rest
    } = props
    const navigate = useNavigate()
    const [formData, setFormData] = useState(isEditMode ? 
        getFormData(job)
        : {
            title: '',
            company: '',
            companyText: '', // temp
            position: 'frontend',
            type: 'full-time',
            setting: 'on-site',
            experienceLevels: [],
            experienceYears: [],
            location: '',
            applicationType: 'easy-apply',
            applicationURL: '',
            language: '', // temp
            languages: [],
            skill: '', // temp
            skills: [],
            salaryType: 'range',
            salaryExact: '',
            salaryMin: '',
            salaryMax: '',
            salaryFrequency: 'year',
            archive: true,
            description: '',
            includeQuestions: true, // temp
            questions: [],
        }
    )
    const [modified, setModified] = useState(getFormDataModified(formData, job))
    const [errors, setErrors] = useState({
        title: false,
        company: false,
        experienceLevels: false,
        experienceYears: false,
        applicationURL: false,
        location: false,
        languages: false,
        skills: false,
        salaryExact: false,
        salaryMin: false,
        salaryMax: false,
        description: false,
    })
    const [entryPillActive, setEntryPillActive] = useState(false)
    const [midPillActive, setMidPillActive] = useState(false)
    const [seniorPillActive, setSeniorPillActive] = useState(false)
    const [staffPillActive, setStaffPillActive] = useState(false)
    const [principalPillActive, setPrincipalPillActive] = useState(false)
    const [level0PillActive, setLevel0PillActive] = useState(false)
    const [level1PillActive, setLevel1PillActive] = useState(false)
    const [level2PillActive, setLevel2PillActive] = useState(false)
    const [level3PillActive, setLevel3PillActive] = useState(false)
    const [level4PillActive, setLevel4PillActive] = useState(false)
    const [level5PillActive, setLevel5PillActive] = useState(false)
    const [level6PillActive, setLevel6PillActive] = useState(false)

    const companyOptions = props.companySearchResults.map(({name, _id}) => ({
        title: name,
        id: _id
    }))

    const questionOptions = Questions.map(({title, id}) => ({
        title,
        id,
        selected: formData.questions.includes(id)
    }))

    const removeError = fieldName => {
        setErrors(curr => ({
            ...curr,
            [fieldName]: false
        }))
    }

    const addError = fieldName => {
        setErrors(curr => ({
            ...curr,
            [fieldName]: true
        }))
    }

    // For test
    // useEffect(() => {
    //     setFormData({
    //         title: 'Senior Software Engineer',
    //         company: '653eefe71c9b992da3f83059',
    //         companyText: 'glassdoor', // temp
    //         position: 'frontend',
    //         type: 'full-time',
    //         setting: 'on-site',
    //         experienceLevels: [],
    //         experienceYears: [],
    //         location: 'New York, NY, USA',
    //         applicationType: 'easy-apply',
    //         applicationURL: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3728717720',
    //         language: '', // temp
    //         languages: ['Javascript', 'CSS', 'HTML'],
    //         skill: '', // temp
    //         skills: ['Docker', 'React.js', 'Firebase', 'MongoDB'],
    //         salaryType: 'range',
    //         salaryExact: '',
    //         salaryMin: '80000',
    //         salaryMax: '100000',
    //         salaryFrequency: 'year',
    //         archive: true,
    //         description: 'test',
    //         includeQuestions: true,
    //         questions: [],
    //     })
    // }, [])

    useEffect(() => {
        const activeExperienceLevels = [
            [entryPillActive, 'entry'],
            [midPillActive, 'mid'],
            [seniorPillActive, 'senior'],
            [staffPillActive, 'staff'],
            [principalPillActive, 'principal']
        ].filter( ([active]) => active)
        .map(([_, experienceLevelID]) => experienceLevelID)
        setFormData(curr => ({
            ...curr,
            experienceLevels: activeExperienceLevels
        }))
        removeError('experienceLevels')
    }, [entryPillActive, midPillActive, seniorPillActive, staffPillActive, principalPillActive])

    useEffect(() => {
        const activeExperienceYears = [
            [level0PillActive, '0'],
            [level1PillActive, '1'],
            [level2PillActive, '2'],
            [level3PillActive, '3'],
            [level4PillActive, '4'],
            [level5PillActive, '5'],
            [level6PillActive, '6']
        ].filter( ([active]) => active)
        .map(([_, experienceYearsID]) => experienceYearsID)
        setFormData(curr => ({
            ...curr,
            experienceYears: activeExperienceYears
        }))
        removeError('experienceYears')
    }, [level0PillActive, level1PillActive, level2PillActive, level3PillActive, level4PillActive, level5PillActive, level6PillActive])

    useEffect(() => {
        props.searchCompanies(formData.companyText)
    }, [formData.companyText])

    useEffect(() => {
        setFormData(curr => ({
            ...curr,
            applicationURL: ''
        }))
        removeError('applicationURL')
    }, [formData.applicationType])

    useEffect(() => {
        removeError('salaryExact')
        removeError('salaryMin')
        removeError('salaryMax')
    }, [formData.salaryType])

    useEffect(() => {
        isEditMode && job && setFormData(getFormData(job))
    }, [job])

    useEffect(() => {
        setModified(getFormDataModified(formData, job))
    }, [formData])

    // Utils

    const validateForm = () => {
        let hasErrors = false
        if (!formData.title) {
            addError('title')
            hasErrors = true
        }
        if (!formData.company) {
            addError('company')
            hasErrors = true
        }
        if (!formData.experienceLevels.length) {
            addError('experienceLevels')
            hasErrors = true
        }
        if (!formData.experienceYears.length) {
            addError('experienceYears')
            hasErrors = true
        }
        if (formData.applicationType === 'custom' && !formData.applicationURL) {
            addError('applicationURL')
            hasErrors = true
        }
        if (formData.setting !== 'remote' && !formData.location) {
            addError('location')
            hasErrors = true
        }
        if (!formData.languages.length) {
            addError('languages')
            hasErrors = true
        }
        if (!formData.skills.length) {
            addError('skills')
            hasErrors = true
        }
        if (formData.salaryType === 'range' && !formData.salaryMin) {
            addError('salaryMin')
            hasErrors = true
        }
        if (formData.salaryType === 'range' && !formData.salaryMax) {
            addError('salaryMax')
            hasErrors = true
        }
        if (formData.salaryType === 'exact' && !formData.salaryExact) {
            addError('salaryExact')
            hasErrors = true
        }
        if (!formData.description) {
            addError('description')
            hasErrors = true
        }

        return hasErrors
    }

    // Direct

    const onChangeField = e => {
        const {name, value} = e.target
        
        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
        removeError(name)
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
                removeError('location')
                break
            case 'entry':
                setEntryPillActive(curr => !curr)
                break
            case 'mid':
                setMidPillActive(curr => !curr)
                break
            case 'senior':
                setSeniorPillActive(curr => !curr)
                break
            case 'staff':
                setStaffPillActive(curr => !curr)
                break
            case 'principal':
                setPrincipalPillActive(curr => !curr)
                break
            case '0':
                setLevel0PillActive(curr => !curr)
                break
            case '1':
                setLevel1PillActive(curr => !curr)
                break
            case '2':
                setLevel2PillActive(curr => !curr)
                break
            case '3':
                setLevel3PillActive(curr => !curr)
                break
            case '4':
                setLevel4PillActive(curr => !curr)
                break
            case '5':
                setLevel5PillActive(curr => !curr)
                break
            case '6':
                setLevel6PillActive(curr => !curr)
                break
            case 'custom':
            case 'easy-apply':
                setFormData(curr => ({
                    ...curr,
                    applicationType: pillID
                }))
                break
            case 'range':
            case 'exact':
            case 'not-provided':
                setFormData(curr => ({
                    ...curr,
                    salaryType: pillID
                }))
                break
            default:
                break
        }
    }

    const onClickCompanyOption = optionID => {
        setFormData(curr => ({
            ...curr,
            company: optionID,
            companyText: companyOptions.find(option => option.id === optionID).title
        }))
        removeError('company')
    }

    const onChangeLocation = location => {
        setFormData(curr => ({
            ...curr,
            location: location.formatted_address
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
            removeError('skills')
        }
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
            removeError('languages')
        }
    }

    const onClickCreateCompany = () => {
        navigate('/create-company')
    }

    const onChangeSalary = e => {
        const {name, value} = e.target

        if (value.length === 0) {
            setFormData(curr => ({
                ...curr,
                [name]: ''
            }))
            removeError(name)
            return
        }

        const chars = [...value]
        let validatedValue = ''
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            if (!isNaN(parseInt(char, 10))) {
                validatedValue += char
            }
        }

        const validatedNumber = Number(validatedValue)

        setFormData(curr => ({
            ...curr,
            [name]: validatedNumber
        }))
        removeError(name)
    }

    const onClickSwitch = switchID => {
        switch (switchID) {
            case 'archive':
                setFormData(curr => ({
                    ...curr,
                    archive: !curr.archive
                }))
                break
            case 'include-questions':
                setFormData(curr => ({
                    ...curr,
                    includeQuestions: !curr.includeQuestions
                }))
                break
        }
    }

    const onClickCheckbox = optionID => {
        switch (optionID) {
            case 'gender':
            case 'veteran':
            case 'disability':
            case 'race':
            case 'salary-expectation':
            case 'education':
            case 'interest':
            case 'work-authorization':
            case 'sponsorship':
            case 'side-project':
                if (formData.questions.includes(optionID)) {
                    setFormData(curr => ({
                        ...curr,
                        questions: curr.questions.filter(questionID => questionID !== optionID)
                    }))
                } else {
                    setFormData(curr => ({
                        ...curr,
                        questions: [...curr.questions, optionID]
                    }))
                }
                break
        }
    }

    const onClickSubmit = () => {
        const hasErrors = validateForm()

        if (hasErrors) {
            props.addMessage('You are missing one or more required fields.', true)
            return
        }

        props.postJob(formData, jobID => navigate(`/jobs/${jobID}`))
    }

    const onClickSaveEdits = () => {
        const hasErrors = validateForm()

        if (hasErrors) {
            props.addMessage('You are missing one or more required fields.', true)
            return
        }

        props.patchJob(job._id, formData, () => navigate(-1))
    }

    const onClickCancel = () => {
        navigate(-1)
    }

    return (
        <Root className={`float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <InputWithMessage
                label='Title'
                fieldName='title'
                text={formData.title}
                inputType='text'
                onChangeText={onChangeField}
                hasError={errors.title}
                modified={isEditMode && modified.title}
            />
            <InputWithMessage
                label='Company'
                labelRightChild={
                    <Button
                        title='Create a company profile'
                        icon='bi-plus'
                        priority={3}
                        type='clear'
                        onClick={onClickCreateCompany}
                    />
                }
                labelMarginBottom={7}
                hasError={errors.company}
                style={{marginBottom: 0}}
                modified={isEditMode && modified.company}
            />
            <SearchableInput
                options={companyOptions}
                value={formData.companyText}
                fieldName='companyText'
                loading={props.loadingCompanySearchResults}
                onChange={onChangeField}
                onClickOption={onClickCompanyOption}
                className='row'
            />
            <InputWithMessage
                label='Position'
                modified={isEditMode && modified.position}
                style={{marginBottom: 0}}
            />
            <div className='pills-row row'>
                <PillOptions
                    options={PositionTypes}
                    activeOptionID={formData.position}
                    onClickOption={onClickPill}
                    className='pill-options'
                />
            </div>
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
                label='Experience Level'
                hasError={errors.experienceLevels}
                style={{marginBottom: 0}}
                modified={isEditMode && modified.experienceLevels}
            />
            <div className='pills-row row'>
                {ExperienceLevels.map(({id, title}) => (
                    <Pill
                        title={title}
                        active={formData.experienceLevels.includes(id)}
                        id={id}
                        onClick={onClickPill}
                        className='pill-option'
                    />
                ))}
            </div>
            <InputWithMessage
                label='Experience Years'
                hasError={errors.experienceYears}
                style={{marginBottom: 0}}
                modified={isEditMode && modified.experienceYears}
            />
            <div className='pills-row row'>
                {ExperienceYears.map(({id, title}) => (
                    <Pill
                        title={title}
                        active={formData.experienceYears.includes(id)}
                        id={id}
                        onClick={onClickPill}
                        className='pill-option'
                    />
                ))}
            </div>
            <InputWithMessage
                label='Application Type'
                modified={isEditMode && modified.applicationType}
                style={{marginBottom: 0}}
            />
            <div className='pills-row row'>
                <PillOptions
                    options={ApplicationType}
                    activeOptionID={formData.applicationType}
                    onClickOption={onClickPill}
                    className='pill-options'
                />
            </div>
            {formData.applicationType === 'custom' ?
                <InputWithMessage
                    label='Application URL'
                    fieldName='applicationURL'
                    text={formData.applicationURL}
                    inputType='text'
                    onChangeText={onChangeField}
                    hasError={errors.applicationURL}
                />
                : null
            }
            <InputWithMessage
                inputType='location'
                label='Location'
                labelRightChild={
                    <Tooltip
                        title={`Don't see your location? Enter somewhere close.`}
                    >
                        <i className='bi-question-circle help-icon' />
                    </Tooltip>
                }
                text={formData.location}
                fieldName='location'
                onChangeText={onChangeField}
                onChangeLocation={onChangeLocation}
                optional={formData.setting === 'remote'}
                hasError={errors.location}
                modified={isEditMode && modified.location}
            />
            <InputWithMessage
                label='Languages'
                hasError={errors.languages}
                style={{marginBottom: 0}}
                modified={isEditMode && modified.languages}
            />
            <SearchableSelectableInput
                options={Languages}
                selectedOptions={formData.languages}
                value={formData.language}
                fieldName='language'
                onChange={onChangeField}
                onClickOption={onClickLanguageOption}
                className='row'
            />
            <InputWithMessage
                label='Skills'
                hasError={errors.skills}
                style={{marginBottom: 0}}
                modified={isEditMode && modified.skills}
            />
            <SearchableSelectableInput
                options={Skills}
                selectedOptions={formData.skills}
                value={formData.skill}
                fieldName='skill'
                onChange={onChangeField}
                onClickOption={onClickSkillOption}
                className='row'
            />
            <InputWithMessage
                label='Salary Type'
                style={{marginBottom: 0}}
                modified={isEditMode && modified.salaryType}
            />
            <div className='pills-row row'>
                <PillOptions
                    options={SalaryTypes}
                    activeOptionID={formData.salaryType}
                    onClickOption={onClickPill}
                    className='pill-options'
                />
            </div>
            {formData.salaryType === 'range' ?
                <div className='salary-range-input-container'>
                    <InputWithMessage
                        inputType='text'
                        label='Salary min ($)'
                        text={formData.salaryMin}
                        onChangeText={onChangeSalary}
                        fieldName='salaryMin'
                        hasError={errors.salaryMin}
                        style={{marginRight: 5}}
                        verticalLabels={true}
                        modified={isEditMode && modified.salaryMin}
                    />
                    <InputWithMessage
                        inputType='text'
                        label='Salary max ($)'
                        text={formData.salaryMax}
                        onChangeText={onChangeSalary}
                        fieldName='salaryMax'
                        hasError={errors.salaryMax}
                        style={{marginRight: 5}}
                        verticalLabels={true}
                        modified={isEditMode && modified.salaryMax}
                    />
                    <InputWithMessage
                        inputType='select'
                        selectValues={SalaryFrequencies}
                        onChangeSelectValue={onChangeField}
                        label='Frequency'
                        text={formData.salaryFrequency}
                        fieldName='salaryFrequency'
                        hasError={errors.salaryFrequency}
                        verticalLabels={true}
                        modified={isEditMode && modified.salaryFrequency}
                    />
                </div>
            : formData.salaryType === 'exact' ?
                <div className='salary-exact-input-container'>
                    <InputWithMessage
                        inputType='text'
                        label='Salary ($)'
                        text={formData.salaryExact}
                        onChangeText={onChangeSalary}
                        fieldName='salaryExact'
                        hasError={errors.salaryExact}
                        style={{marginRight: 5}}
                        verticalLabels={true}
                        modified={isEditMode && modified.salaryExact}
                    />
                    <InputWithMessage
                        inputType='select'
                        selectValues={SalaryFrequencies}
                        onChangeSelectValue={onChangeField}
                        label='Frequency'
                        text={formData.salaryFrequency}
                        fieldName='salaryFrequency'
                        hasError={errors.salaryFrequency}
                        modified={isEditMode && modified.salaryFrequency}
                    />
                </div>
                : null
            }
            <InputWithMessage
                inputType='textarea'
                label='Description'
                text={formData.description}
                fieldName='description'
                onChangeText={onChangeField}
                hasError={errors.description}
                modified={isEditMode && modified.description}
            />
            {formData.applicationType === 'easy-apply' ? 
                <InputWithMessage
                    label='Include Questions'
                    inputType='switch'
                    switchEnabled={formData.includeQuestions}
                    switchLabel='Include section for application questions'
                    onClickSwitch={onClickSwitch}
                    switchID='include-questions'
                />
                : null
            }
            {formData.includeQuestions && formData.applicationType === 'easy-apply' ?
                <InputWithMessage
                    inputType='checklist'
                    label='Application Questions'
                    checklistOptions={questionOptions}
                    onClickCheckbox={onClickCheckbox}
                    modified={isEditMode && modified.questions}
                />
                : null
            }
            <InputWithMessage
                label='Visibility'
                inputType='switch'
                switchEnabled={formData.archive}
                switchLabel='Archive after 1 month'
                onClickSwitch={onClickSwitch}
                switchID='archive'
                modified={isEditMode && modified.archive}
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
                        title='Submit'
                        priority={1}
                        type='solid'
                        onClick={onClickSubmit}
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

    & .pills-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    & .pill-option {
        margin-top: 10px;
        margin-right: 10px;
    }

    & .row {
        margin-bottom: 30px;
    }

    & .location-input {
        width: 50%;
        box-sizing: border-box;
    }
    &.mobile .location-input {
        width: 100%;
    }

    & .pill-options {
        margin-top: 10px;
    }

    & .help-icon {
        font-size: 17px;
        color: ${p => p.theme.textSecondary};
    }

    & .salary-exact-input-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-start;
    }
    & .salary-range-input-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: flex-start;
    }

    & .buttons-container {
        display: flex;
        align-items: center;
        align-self: flex-end;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    companySearchResults: getCompanySearchResults(state),
    loadingCompanySearchResults: getLoadingCompanySearchResults(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    searchCompanies,
    addMessage,
    postJob,
    patchJob,
    repostJob,
}, dispatch)

export const EditJobCard = connect(mapStateToProps, mapDispatchToProps)(EditJobCardComponent)