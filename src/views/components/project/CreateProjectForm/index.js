import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { fetchIsValidAccessCode } from '../../../../redux/project'
import {getFormData, getFormDataModified} from './utils'
import { TermsSections } from '../../../pages/Terms'
import { setThemeColor, setTintColor } from '../../../../redux/theme'
import { Tints } from '../../../../redux/theme'
import { addMessage } from '../../../../redux/communication'
import { Button } from '../../common/Button'
import { ProgressSteps } from '../../common/ProgressSteps'
import { IconButton } from '../../common/IconButton'
import { InputWithMessage } from '../../common/InputWithMessage'
import { ImagesInput } from '../../common/ImagesInput'
import { ValidLabel } from '../../common/ValidLabel'
import { PendingMessage } from '../../common/PendingMessage'

const ProjectTypes = [
    {title: 'Small Webapp - 2 Custom Pages', price: 200, id: 's', pagesCount: 2},
    {title: 'Medium Webapp - 4 Custom Pages', price: 400, id: 'm', pagesCount: 4},
    {title: 'Large Webapp - 10 Custom Pages', price: 1000, id: 'l', pagesCount: 10}
]

export const CreateProjectFormComponent = props => {
    const {
        isEditMode=true,
        projectType=null,
        initFormData=null,

        onChangeFormData = () => {}, // formData => void
        onCreateProject = () => {}, // (onSuccess, onFailure) => void
        onClickSubmitEdits = () => {}, // () => void

        ...rest
    } = props
    const [selectedStepID, setSelectedStepID] = useState(isEditMode ? 'review' : 'payment')
    const [generalCompleted, setGeneralCompleted] = useState(isEditMode)
    const [landingCompleted, setLandingCompleted] = useState(isEditMode)
    const [themeCompleted, setThemeCompleted] = useState(isEditMode)
    const [featuresCompleted, setFeaturesCompleted] = useState(isEditMode)
    const [reviewCompleted, setReviewCompleted] = useState(isEditMode)
    const [termsCompleted, setTermsCompleted] = useState(isEditMode)
    const [paymentCompleted, setPaymentCompleted] = useState(isEditMode)
    const [formData, setFormData] = useState(initFormData ?
        getFormData(initFormData)
        : {
            // general
            creatorName: '',
            projectName: '',
            projectType: projectType || 's',
            email: '',
            domainProviderURL: '',
            domainProviderUsername: '',
            domainProviderPassword: '',

            // landing
            heroTitle: '',
            heroMessage: '',

            // theme
            lightThemeSelected: true,
            darkThemeSelected: false,
            blueThemeSelected: false,
            lightThemeDefault: true,
            darkThemeDefault: false,
            blueThemeDefault: false,
            blueTintSelected: true,
            purpleTintSelected: false,
            mintTintSelected: false,
            greenTintSelected: false,
            blueTintDefault: true,
            purpleTintDefault: false,
            mintTintDefault: false,
            greenTintDefault: false,
            customTintColor: null,
            useCustomTintColor: false,

            // features
            pagesText: [],
            pagesImages: [],
            pagesImageURLs: null,

            // terms
            acceptedTermsAndConditions: false,
            signature: '',

            // payment
            hasAccessCode: false,
            accessCode: '',
        }
    )
    const [errors, setErrors] = useState({
        // general
        creatorName: false,
        projectName: false,
        email: false,
        domainProviderURL: false,
        domainProviderUsername: false,
        domainProviderPassword: false,

        // landing
        heroTitle: false,
        heroMessage: false,

        // theme
        themes: false,
        tintColors: false,
        customTintColor: false,

        // features
        pagesText: [],

        // terms
        acceptedTermsAndConditions: false,
        signature: false,

        // payment
        accessCode: '',
    })
    const [modified, setModified] = useState(getFormDataModified(formData, initFormData))
    const [loadingCreateProject, setLoadingCreateProject] = useState(false)

    const progressSteps = [
        {title: 'General', isComplete: generalCompleted, id: 'general'},
        {title: 'Landing', isComplete: landingCompleted, id: 'landing'},
        {title: 'Theme', isComplete: themeCompleted, id: 'theme'},
        {title: 'Features', isComplete: featuresCompleted, id: 'features'},
        {title: isEditMode ? 'Overview' : 'Review', isComplete: reviewCompleted, id: 'review'},
        ...(isEditMode ?
            []
            : [
                {title: 'Terms', isComplete: termsCompleted, id: 'terms'},
                {title: 'Payment', isComplete: paymentCompleted, id: 'payment'}
            ]
        )
    ]

    // test
    useEffect(() => {
        !isEditMode && setFormData({
            // general
            creatorName: 'test',
            projectName: 'Test',
            projectType: 's',
            email: 'liammail100@gmail.com',
            domainProviderURL: 'test',
            domainProviderUsername: 'test',
            domainProviderPassword: 'test',
    
            // landing
            heroTitle: 'test',
            heroMessage: 'test',
    
            // theme
            lightThemeSelected: true,
            darkThemeSelected: false,
            blueThemeSelected: false,
            lightThemeDefault: true,
            darkThemeDefault: false,
            blueThemeDefault: false,
            blueTintSelected: true,
            purpleTintSelected: false,
            mintTintSelected: false,
            greenTintSelected: false,
            blueTintDefault: true,
            purpleTintDefault: false,
            mintTintDefault: false,
            greenTintDefault: false,
            customTintColor: null,
            useCustomTintColor: false,
    
            // features
            pagesText: ['test', 'test'],
            pagesImages: [],
            pagesImageURLs: null,
    
            // terms
            acceptedTermsAndConditions: true,
            signature: 'test',
    
            // payment
            hasAccessCode: false,
            accessCode: '',
        })
    }, [])

    const selectedStep = progressSteps.find(({id}) => id === selectedStepID)
    const selectedProjectType = ProjectTypes.find(({id}) => id === formData.projectType)

    useEffect(() => {
        onChangeFormData(formData)
        setModified(getFormDataModified(formData, initFormData))
    }, [formData])

    useEffect(() => {
        initFormData && setFormData(getFormData(initFormData))
    }, [initFormData])

    useEffect(() => {
        const {pagesCount} = selectedProjectType
        setFormData(curr => ({
            ...curr,
            pagesText: Array(pagesCount).fill(''),
            pagesImages: Array(pagesCount).fill(new Array(0)),
            pagesImageURLs: Array(pagesCount).fill(new Array(0)),
        }))
        setErrors(curr => ({
            ...curr,
            pagesTextErrors: Array(pagesCount).fill(false)
        }))
    }, [selectedProjectType])

    useEffect(() => {
        props.fetchIsValidAccessCode(formData.accessCode)
    }, [formData.accessCode])

    // Utils

    const showMissingRequiredFieldsError = () => {
        props.addMessage('You are missing one or more required fields.', true)
    }

    const navigateToStep = (stepID, completedSteps) => {
        switch (stepID) {
            case 'general':
                setSelectedStepID('general')
                break
            case 'landing':
                if (isEditMode || generalCompleted || completedSteps.general) {
                    setSelectedStepID('landing')
                }
                break
            case 'theme':
                if (isEditMode || generalCompleted && landingCompleted || completedSteps.landing) {
                    setSelectedStepID('theme')
                }
                break
            case 'features':
                if (isEditMode || generalCompleted && landingCompleted && themeCompleted || completedSteps.theme) {
                    setSelectedStepID('features')
                }
                break
            case 'review':
                if (isEditMode || generalCompleted && landingCompleted && themeCompleted && featuresCompleted || completedSteps.features) {
                    setSelectedStepID('review')
                }
                break
            case 'terms':
                if (isEditMode || generalCompleted && landingCompleted && themeCompleted && featuresCompleted && reviewCompleted || completedSteps.review) {
                    setSelectedStepID('terms')
                }
                break
            case 'payment':
                if (isEditMode || generalCompleted && landingCompleted && themeCompleted && featuresCompleted && reviewCompleted && termsCompleted || completedSteps.terms) {
                    setSelectedStepID('payment')
                }
                break
        }
    }

    const onNavigateAwayFromStep = navigateToStepID => {
        switch (selectedStepID) {
            case 'general':
                const nameCompleted = !!formData.creatorName
                const projectNameCompleted = !!formData.projectName
                const emailCompleted = !!formData.email
                const domainProviderURLCompleted = !!formData.domainProviderURL
                const domainProviderUsernameCompleted = !!formData.domainProviderUsername
                const domainProviderPasswordCompleted = !!formData.domainProviderPassword
                setErrors(curr => ({
                    ...curr,
                    name: !nameCompleted,
                    projectName: !projectNameCompleted,
                    email: !emailCompleted,
                    domainProviderURL: !domainProviderURLCompleted,
                    domainProviderUsername: !domainProviderUsernameCompleted,
                    domainProviderPassword: !domainProviderPasswordCompleted
                }))
                if (nameCompleted && projectNameCompleted && emailCompleted && domainProviderURLCompleted && domainProviderUsernameCompleted && domainProviderPasswordCompleted) {
                    setGeneralCompleted(true)
                    navigateToStep(navigateToStepID, {general: true})
                } else {
                    showMissingRequiredFieldsError()
                }
                break
            case 'landing':
                const heroTitleCompleted = !!formData.heroTitle
                const heroMessageCompleted = !!formData.heroMessage
                setErrors(curr => ({
                    ...curr,
                    heroTitle: !heroTitleCompleted,
                    heroMessage: !heroMessageCompleted
                }))
                if (heroTitleCompleted && heroMessageCompleted) {
                    setLandingCompleted(true)
                    navigateToStep(navigateToStepID, {landing: true})
                } else {
                    showMissingRequiredFieldsError()
                }
                break
            case 'theme':
                const themesCompleted = formData.lightThemeSelected || formData.darkThemeSelected || formData.blueThemeSelected
                const tintColorsCompleted = formData.blueTintSelected || formData.purpleTintSelected || formData.mintTintSelected || formData.greenTintSelected
                const customTintColorCompleted = formData.useCustomTintColor ? !!formData.customTintColor : true
                setErrors(curr => ({
                    ...curr,
                    themes: !themesCompleted,
                    tintColors: !tintColorsCompleted,
                    customTintColor: !customTintColorCompleted
                }))
                if (themesCompleted && tintColorsCompleted && customTintColorCompleted) {
                    setThemeCompleted(true)
                    navigateToStep(navigateToStepID, {theme: true})
                } else {
                    showMissingRequiredFieldsError()
                }
                break
            case 'features':
                let pagesTextCompleted = true
                formData.pagesText.forEach( text => {
                    if (!text) pagesTextCompleted = false
                })
                setErrors(curr => ({
                    ...curr,
                    pagesText: formData.pagesText.map(text => !text)
                }))
                if (pagesTextCompleted) {
                    setFeaturesCompleted(true)
                    navigateToStep(navigateToStepID, {features: true})
                } else {
                    showMissingRequiredFieldsError()
                }
                break
            case 'review':
                setReviewCompleted(true)
                navigateToStep(navigateToStepID, {review: true})
                break
            case 'terms':
                const signatureCompleted = !!formData.signature && formData.signature === formData.creatorName
                setErrors(curr => ({
                    ...curr,
                    acceptedTermsAndConditions: !formData.acceptedTermsAndConditions,
                    signature: !signatureCompleted
                }))
                if (formData.acceptedTermsAndConditions && signatureCompleted) {
                    setTermsCompleted(true)
                    navigateToStep(navigateToStepID, {terms: true})
                }
                if (!formData.acceptedTermsAndConditions) {
                    showMissingRequiredFieldsError()
                }
                if (!signatureCompleted) {
                    props.addMessage('Your signature should match the name you provided in the general section.', true)
                }
                break
            case 'payment':
                const accessCodeCompleted = formData.hasAccessCode ? props.isValidAccessCode : true
                setErrors(curr => ({
                    ...curr,
                    accessCode: !accessCodeCompleted
                }))
                if (accessCodeCompleted) {
                    setPaymentCompleted(true)
                    navigateToStep(navigateToStepID)
                } else if (!props.isValidAccessCode) {
                    props.addMessage('The access code you provided is invalid.', true)
                }
        }
    }

    // Direct

    const onClickProgressStep = stepID => {
        if (stepID === selectedStepID) return
        switch (stepID) {
            case 'general':
                onNavigateAwayFromStep('general')
                break
            case 'landing':
                onNavigateAwayFromStep('landing')
                break
            case 'theme':
                onNavigateAwayFromStep('theme')
                break
            case 'features':
                onNavigateAwayFromStep('features')
                break
            case 'review':
                onNavigateAwayFromStep('review')
                break
            case 'terms':
                onNavigateAwayFromStep('terms')
                break
            case 'payment':
                onNavigateAwayFromStep('payment')
                break
        }
    }

    const onChangeFormValue = e => {
        const {name, value} = e.target

        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickCheckbox = checkboxOptionID => {
        switch (checkboxOptionID) {
            case 'lightThemeSelected':
                setFormData(curr => ({
                    ...curr,
                    lightThemeSelected: !curr.lightThemeSelected
                }))
                break
            case 'darkThemeSelected':
                setFormData(curr => ({
                    ...curr,
                    darkThemeSelected: !curr.darkThemeSelected
                }))
                break
            case 'blueThemeSelected':
                setFormData(curr => ({
                    ...curr,
                    blueThemeSelected: !curr.blueThemeSelected
                }))
                break
            case 'lightThemeDefault':
                props.setThemeColor(0)
                setFormData(curr => ({
                    ...curr,
                    lightThemeDefault: true,
                    darkThemeDefault: false,
                    blueThemeDefault: false,
                }))
                break
            case 'darkThemeDefault':
                props.setThemeColor(1)
                setFormData(curr => ({
                    ...curr,
                    lightThemeDefault: false,
                    darkThemeDefault: true,
                    blueThemeDefault: false
                }))
                break
            case 'blueThemeDefault':
                props.setThemeColor(2)
                setFormData(curr => ({
                    ...curr,
                    lightThemeDefault: false,
                    darkThemeDefault: false,
                    blueThemeDefault: true
                }))
                break
            case 'blueTintSelected':
                setFormData(curr => ({
                    ...curr,
                    blueTintSelected: !curr.blueTintSelected
                }))
                break
            case 'purpleTintSelected':
                setFormData(curr => ({
                    ...curr,
                    purpleTintSelected: !curr.purpleTintSelected
                }))
                break
            case 'mintTintSelected':
                setFormData(curr => ({
                    ...curr,
                    mintTintSelected: !curr.mintTintSelected
                }))
                break
            case 'greenTintSelected':
                setFormData(curr => ({
                    ...curr,
                    greenTintSelected: !curr.greenTintSelected
                }))
                break
            case 'blueTintDefault':
                props.setTintColor(0)
                setFormData(curr => ({
                    ...curr,
                    blueTintDefault: true,
                    purpleTintDefault: false,
                    mintTintDefault: false,
                    greenTintDefault: false
                }))
                break
            case 'purpleTintDefault':
                props.setTintColor(1)
                setFormData(curr => ({
                    ...curr,
                    blueTintDefault: false,
                    purpleTintDefault: true,
                    mintTintDefault: false,
                    greenTintDefault: false
                }))
                break
            case 'mintTintDefault':
                props.setTintColor(2)
                setFormData(curr => ({
                    ...curr,
                    blueTintDefault: false,
                    purpleTintDefault: false,
                    mintTintDefault: true,
                    greenTintDefault: false
                }))
                break
            case 'greenTintDefault':
                props.setTintColor(3)
                setFormData(curr => ({
                    ...curr,
                    blueTintDefault: false,
                    purpleTintDefault: false,
                    mintTintDefault: false,
                    greenTintDefault: true
                }))
                break
            case 'acceptedTermsAndConditions':
                setFormData(curr => ({
                    ...curr,
                    acceptedTermsAndConditions: !curr.acceptedTermsAndConditions
                }))
                break
            case 'hasAccessCode':
                setFormData(curr => ({
                    ...curr,
                    hasAccessCode: !curr.hasAccessCode
                }))
        }
    }

    const onClickSwitch = switchID => {
        switch (switchID) {
            case 'useCustomTintColor':
                const switchEnabled = formData.useCustomTintColor
                setFormData(curr => ({
                    ...curr,
                    useCustomTintColor: !switchEnabled,
                    blueTintSelected: switchEnabled,
                    purpleTintSelected: false,
                    mintTintSelected: false,
                    greenTintSelected: false,
                    blueTintDefault: switchEnabled,
                    purpleTintDefault: false,
                    mintTintDefault: false,
                    greenTintDefault: false,
                    customTintColor: ''
                }))
                switchEnabled && props.setTintColor(0)
                setErrors(curr => ({
                    ...curr,
                    customTintColor: false,
                    tintColors: false
                }))
        }
    }

    const onChangePageText = (pageIndex, e) => {
        setFormData(curr => ({
            ...curr,
            pagesText: curr.pagesText.map( (text, i) => (
                i == pageIndex ?
                    e.target.value
                    : text
            ))
        }))
    }

    const onChangePageImages = (pageIndex, e) => {
        if (!e.target.files[0]) return
        setFormData(curr => ({
            ...curr,
            pagesImages: curr.pagesImages.map( (images, i) => (
                i == pageIndex ?
                    [
                        ...curr.pagesImages[pageIndex],
                        e.target.files[0]
                    ]
                    : images
            ))
        }))
    }

    const onClickRemovePageImage = (pageIndex, imageIndex) => {
        setFormData(curr => ({
            ...curr,
            pagesImages: curr.pagesImages.map( (images, i) => (
                i == pageIndex ?
                    images.filter( (_, j) => j != imageIndex)
                    : images
            ))
        }))
    }

    const onClickRemovePageImageURL = (pageIndex, imageIndex) => {
        setFormData(curr => ({
            ...curr,
            pagesImageURLs: curr.pagesImageURLs.map( (imageURLs, i) => (
                i == pageIndex ?
                    imageURLs.filter( (_, j) => j != imageIndex)
                    : imageURLs
            ))
        }))
    }

    const onClickEditField = fieldName => {
        switch (fieldName) {
            case 'name':
            case 'domainProviderURL':
            case 'domainProviderUsername':
            case 'domainProviderPassword':
            case 'projectName':
            case 'projectType':
            case 'email':
                setSelectedStepID('general')
                break
            case 'heroTitle':
            case 'heroMessage':
                setSelectedStepID('landing')
                break
            case 'themes':
            case 'defaultTheme':
            case 'useCustomTintColor':
            case 'tintColors':
            case 'defaultTintColor':
            case 'customTintColor':
                setSelectedStepID('theme')
                break
            case 'pagesText':
            case 'pagesImages':
                setSelectedStepID('features')
                break
        }
    }

    const onClickBack = () => {
        switch (selectedStepID) {
            case 'landing':
                onNavigateAwayFromStep('general')
                break
            case 'theme':
                onNavigateAwayFromStep('landing')
                break
            case 'features':
                onNavigateAwayFromStep('theme')
                break
            case 'review':
                onNavigateAwayFromStep('features')
                break
            case 'terms':
                onNavigateAwayFromStep('review')
                break
            case 'payment':
                onNavigateAwayFromStep('terms')
                break
        }
    }

    const onClickNext = () => {
        switch (selectedStepID) {
            case 'general':
                onNavigateAwayFromStep('landing')
                break
            case 'landing':
                onNavigateAwayFromStep('theme')
                break
            case 'theme':
                onNavigateAwayFromStep('features')
                break
            case 'features':
                onNavigateAwayFromStep('review')
                break
            case 'review':
                onNavigateAwayFromStep('terms')
                break
            case 'terms':
                onNavigateAwayFromStep('payment')
                break
        }
    }

    const onClickCreateProject = () => {
        const cancelLoadingProject = () => setLoadingCreateProject(false)
        setLoadingCreateProject(true)
        onCreateProject(cancelLoadingProject, cancelLoadingProject)
    }

    return (
        <Container>
            <ProgressSteps
                steps={progressSteps}
                selectedStepID={selectedStepID}
                onClickStep={onClickProgressStep}
                className='progress-steps'
            />
            <div className='form-container float-container'>
                <h3 className='title'>{selectedStep.title}</h3>
                {selectedStepID === 'general' ?
                    <div className='inner-form-container'>
                        <InputWithMessage
                            label='Your Name'
                            inputType='text'
                            text={formData.creatorName}
                            onChangeText={onChangeFormValue}
                            fieldName='creatorName'
                            message=' '
                            hasError={errors.creatorName}
                            modified={isEditMode && modified.creatorName}
                        />
                        <InputWithMessage
                            label='Project Name'
                            inputType='text'
                            text={formData.projectName}
                            onChangeText={onChangeFormValue}
                            fieldName='projectName'
                            message='This is the name that will appear in the top left corner of your site.'
                            hasError={errors.projectName}
                            modified={isEditMode && modified.projectName}
                            locked={isEditMode}
                        />
                        <InputWithMessage
                            label='Project Type'
                            inputType='select'
                            fieldName='projectType'
                            selectValue={formData.projectType}
                            selectValues={ProjectTypes}
                            onChangeSelectValue={onChangeFormValue}
                            tintMessage={`$${selectedProjectType.price}`}
                            locked={isEditMode}
                        />
                        <InputWithMessage
                            label='Your Email'
                            inputType='text'
                            text={formData.email}
                            onChangeText={onChangeFormValue}
                            fieldName='email'
                            message='This is the email that will be used to create your Blackbox Solution account.'
                            hasError={errors.email}
                            modified={isEditMode && modified.email}
                            locked={isEditMode}
                        />
                        <InputWithMessage
                            label='Domain Provider URL'
                            inputType='text'
                            text={formData.domainProviderURL}
                            onChangeText={onChangeFormValue}
                            fieldName='domainProviderURL'
                            placeholder='https://'
                            message='This is the domain service you used to purchase your domain. If you do not have one we recommend Google Domains.'
                            hasError={errors.domainProviderURL}
                            modified={isEditMode && modified.domainProviderURL}
                        />
                        <InputWithMessage
                            label='Domain Provider Username'
                            inputType='text'
                            text={formData.domainProviderUsername}
                            onChangeText={onChangeFormValue}
                            fieldName='domainProviderUsername'
                            hasError={errors.domainProviderUsername}
                            message=' '
                            modified={isEditMode && modified.domainProviderUsername}
                        />
                        <InputWithMessage
                            label='Domain Provider Password'
                            inputType='text'
                            text={formData.domainProviderPassword}
                            onChangeText={onChangeFormValue}
                            fieldName='domainProviderPassword'
                            hasError={errors.domainProviderPassword}
                            message=' '
                            modified={isEditMode && modified.domainProviderPassword}
                        />
                    </div>
                : selectedStepID === 'landing' ?
                    <div className='inner-form-container'>
                        <InputWithMessage
                            label='Hero Title'
                            inputType='text'
                            text={formData.heroTitle}
                            onChangeText={onChangeFormValue}
                            fieldName='heroTitle'
                            message='This is the title that will be shown on the hero section of the landing page. We recommend a short statement about what your product does.'
                            hasError={errors.heroTitle}
                            modified={isEditMode && modified.name}
                        />
                        <InputWithMessage
                            label='Hero Message'
                            inputType='textarea'
                            text={formData.heroMessage}
                            onChangeText={onChangeFormValue}
                            fieldName='heroMessage'
                            message='This is the message that will be shown beneath the hero title on the landing page. We recommend a 1-3 sentence message about what your product does and why people should use it.'
                            hasError={errors.heroTitle}
                            modified={isEditMode && modified.heroMessage}
                        />
                    </div>
                : selectedStepID === 'theme' ?
                    <div className='inner-form-container'>
                        <InputWithMessage
                            label='Themes'
                            inputType='checklist'
                            checklistOptions={[
                                {title: 'Light Theme', selected: formData.lightThemeSelected, id: 'lightThemeSelected'},
                                {title: 'Dark Theme', selected: formData.darkThemeSelected, id: 'darkThemeSelected'},
                                {title: 'Blue Theme', selected: formData.blueThemeSelected, id: 'blueThemeSelected'},
                            ]}
                            onClickCheckbox={onClickCheckbox}
                            message='Select up to three. Selecting multiple allows users to pick which theme to use on their version of the site.'
                            hasError={errors.themes}
                            modified={isEditMode && modified.themes}
                        />
                        <InputWithMessage
                            label='Default Theme'
                            inputType='checklist'
                            checklistOptions={[
                                {title: 'Light Theme', selected: formData.lightThemeDefault, id: 'lightThemeDefault'},
                                {title: 'Dark Theme', selected: formData.darkThemeDefault, id: 'darkThemeDefault'},
                                {title: 'Blue Theme', selected: formData.blueThemeDefault, id: 'blueThemeDefault'},
                            ]}
                            onClickCheckbox={onClickCheckbox}
                            message='Select one.'
                            modified={isEditMode && modified.defaultTheme}
                        />
                        <InputWithMessage
                            label='Use Custom Tint Color'
                            inputType='switch'
                            switchEnabled={formData.useCustomTintColor}
                            onClickSwitch={() => onClickSwitch('useCustomTintColor')}
                            message='If selected we will use your custom tint color instead of the default tint colors provided.'
                            modified={isEditMode && modified.useCustomTintColor}
                        />
                        {formData.useCustomTintColor ?
                            <InputWithMessage
                                label='Custom Tint Color'
                                inputType='text'
                                text={formData.customTintColor}
                                onChangeText={onChangeFormValue}
                                fieldName='customTintColor'
                                placeholder='Enter rgb code or hex code'
                                rightChild={
                                    <div className='custom-color-option-container'>
                                        <div className='custom-color-option' style={{backgroundColor: formData.customTintColor}} />
                                    </div>
                                }
                                hasError={errors.customTintColor}
                                modified={isEditMode && modified.customTintColor}
                            />
                            : null
                        }
                        { formData.useCustomTintColor ?
                            null
                            : <InputWithMessage
                                label='Tint Colors'
                                inputType='checklist'
                                checklistOptions={[
                                    {
                                        title: 'Blue',
                                        selected: formData.blueTintSelected,
                                        id: 'blueTintSelected',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[0].tint}} />
                                    },
                                    {
                                        title: 'Purple',
                                        selected: formData.purpleTintSelected,
                                        id: 'purpleTintSelected',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[1].tint}} />
                                    },
                                    {
                                        title: 'Mint',
                                        selected: formData.mintTintSelected,
                                        id: 'mintTintSelected',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[2].tint}} />
                                    },
                                    {
                                        title: 'Green',
                                        selected: formData.greenTintSelected,
                                        id: 'greenTintSelected',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[3].tint}} />
                                    },
                                ]}
                                onClickCheckbox={onClickCheckbox}
                                message='Select up to four. Selecting multiple allows users to pick which tint color to use on their version of the site.'
                                hasError={errors.tintColors}
                                modified={isEditMode && modified.selectedTintColors}
                            />
                        }      
                        { formData.useCustomTintColor ?
                            null
                            : <InputWithMessage
                                label='Default Tint Color'
                                inputType='checklist'
                                checklistOptions={[
                                    {
                                        title: 'Blue',
                                        selected: formData.blueTintDefault,
                                        id: 'blueTintDefault',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[0].tint}} />
                                    },
                                    {
                                        title: 'Purple',
                                        selected: formData.purpleTintDefault,
                                        id: 'purpleTintDefault',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[1].tint}} />
                                    },
                                    {
                                        title: 'Mint',
                                        selected: formData.mintTintDefault,
                                        id: 'mintTintDefault',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[2].tint}} />
                                    },
                                    {
                                        title: 'Green',
                                        selected: formData.greenTintDefault,
                                        id: 'greenTintDefault',
                                        leftChild: <div className='color-option' style={{backgroundColor: Tints[3].tint}} />
                                    },
                                ]}
                                onClickCheckbox={onClickCheckbox}
                                message='Select one.'
                                modified={isEditMode && modified.defaultTintColor}
                            />
                        }
                    </div>
                : selectedStepID === 'features' ?
                    <div className='inner-form-container'>
                        {formData.pagesText.map( (text, i) => (
                            <div className='d-flex fd-column ai-stretch' key={i}>
                                <InputWithMessage
                                    label={`Page ${i + 1} Content`}
                                    inputType='textarea'
                                    text={text}
                                    onChangeText={e => onChangePageText(i, e)}
                                    placeholder={`Describe the content and features you want to see on page ${i + 1}`}
                                    hasError={errors.pagesText[i]}
                                    modified={isEditMode && modified.pagesText}
                                />
                                <ImagesInput
                                    label={`Page ${i + 1} UI Images`}
                                    imageFiles={formData.pagesImages[i]}
                                    imageURLs={formData.pagesImageURLs[i]}
                                    onChangeImageFiles={e => onChangePageImages(i, e)}
                                    onClickRemoveImageFile={imageIndex => onClickRemovePageImage(i, imageIndex)}
                                    onClickRemoveImageURL={imageIndex => onClickRemovePageImageURL(i, imageIndex)}
                                    modified={isEditMode && (formData.pagesImages.length || modified.pagesImageURLs)}
                                />
                            </div>
                        ))}
                    </div>
                : selectedStepID === 'review' ? 
                    <div className='inner-form-container'>
                        <h3 className='review-title'>General</h3>
                        <div className='review-section'>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Your Name</label>
                                    <p className='review-item'>{formData.name}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('name')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Project Name</label>
                                    <p className='review-item'>{formData.projectName}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('projectName')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Project Type</label>
                                    <p className='review-item'>{ProjectTypes.find(({id}) => formData.projectType).title}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('projectType')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Your Email</label>
                                    <p className='review-item'>{formData.email}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('email')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Domain Provider URL</label>
                                    <p className='review-item'>{formData.domainProviderURL}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('domainProviderURL')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Domain Provider Username</label>
                                    <p className='review-item'>{formData.domainProviderUsername}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('domainProviderUsername')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Domain Provider Password</label>
                                    <p className='review-item'>{formData.projectName}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('domainProviderPassword')}
                                />
                            </div>
                        </div>
                        <h3 className='review-title'>Landing</h3>
                        <div className='review-section'>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Hero Title</label>
                                    <p className='review-item'>{formData.heroTitle}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('heroTitle')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Hero Message</label>
                                    <p className='review-item'>{formData.heroMessage}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('heroMessage')}
                                />
                            </div>
                        </div>
                        <h3 className='review-title'>Theme</h3>
                        <div className='review-section'>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Themes</label>
                                    <p className='review-item'>{[
                                        [formData.lightThemeSelected, 'Light Theme'],
                                        [formData.darkThemeSelected, 'Dark Theme'],
                                        [formData.blueThemeSelected, 'Blue Theme']
                                    ].filter( ([selected]) => selected)
                                    .map( ([_, title]) => title)
                                    .join(', ')
                                    }</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('themes')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Default Theme</label>
                                    <p className='review-item'>{
                                        formData.lightThemeDefault ? 'Light Theme'
                                        : formData.darkThemeDefault ? 'Dark Theme'
                                        : formData.blueThemeDefault ? 'Blue Theme'
                                        : null
                                    }</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('defaultTheme')}
                                />
                            </div>
                            <div className='label-with-message-container'>
                                <div className='label-container'>
                                    <label>Use Custom Tint Color</label>
                                    <p className='review-item'>{formData.useCustomTintColor ? 'True' : 'False'}</p>
                                </div>
                                <IconButton
                                    iconClassName='bi-pencil'
                                    size='s'
                                    onClick={() => onClickEditField('useCustomTintColor')}
                                />
                            </div>
                            { formData.useCustomTintColor ? 
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Custom Tint Color</label>
                                        <div className='d-flex jc-flex-start ai-center' style={{marginTop: 5}}>
                                            <p className='review-item' style={{marginTop: 0}}>{formData.customTintColor}</p>
                                            <div
                                                className='color-option'
                                                style={{backgroundColor: formData.customTintColor, marginLeft: 10}}
                                            />
                                        </div>
                                    </div>
                                    <IconButton
                                        iconClassName='bi-pencil'
                                        size='s'
                                        onClick={() => onClickEditField('customTintColor')}
                                    />
                                </div>
                                : null
                            }
                            { formData.useCustomTintColor ? 
                                null
                                : <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Tint Colors</label>
                                        <p className='review-item'>{[
                                            [formData.blueTintSelected, 'Blue'],
                                            [formData.purpleTintSelected, 'Purple'],
                                            [formData.mintTintSelected, 'Mint'],
                                            [formData.greenTintSelected, 'Green']
                                        ].filter( ([selected]) => selected)
                                        .map( ([_, title]) => title)
                                        .join(', ')
                                        }</p>
                                    </div>
                                    <IconButton
                                        iconClassName='bi-pencil'
                                        size='s'
                                        onClick={() => onClickEditField('tintColors')}
                                    />
                                </div>
                            }
                            { formData.useCustomTintColor ? 
                                null
                                : <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Default Tint Color</label>
                                        <p className='review-item'>{
                                            formData.blueTintDefault ? 'Blue'
                                            : formData.purpleTintDefault ? 'Purple'
                                            : formData.mintTintDefault ? 'Mint'
                                            : formData.greenTintDefault ? 'Green'
                                            : null
                                        }</p>
                                    </div>
                                    <IconButton
                                        iconClassName='bi-pencil'
                                        size='s'
                                        onClick={() => onClickEditField('defaultTintColor')}
                                    />
                                </div>
                            }
                        </div>
                        <h3 className='review-title'>Features</h3>
                        <div className='review-section'>
                            {formData.pagesText.map( (text, i) => (
                                <div className='d-flex fd-column ai-stretch' key={i}>
                                    <div className='label-with-message-container'>
                                        <div className='label-container'>
                                            <label>{`Page ${i + 1} Content`}</label>
                                            <div className='d-flex jc-flex-start ai-center' style={{marginTop: 5}}>
                                                <p className='review-item' style={{marginTop: 0}}>{text}</p>
                                            </div>
                                        </div>
                                        <IconButton
                                            iconClassName='bi-pencil'
                                            size='s'
                                            onClick={() => onClickEditField('pagesText')}
                                        />
                                    </div>
                                    <div className='label-with-message-container'>
                                        <ImagesInput
                                            label={`Page ${i + 1} UI Images`}
                                            imageFiles={formData.pagesImages[i]}
                                            imageURLs={formData.pagesImageURLs[i]}
                                            showInput={false}
                                            allowDelete={false}
                                        />
                                        <IconButton
                                            iconClassName='bi-pencil'
                                            size='s'
                                            onClick={() => onClickEditField('pagesImages')}
                                            className='edit-icon'
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                : selectedStepID === 'terms' && !isEditMode ?
                    <div className='inner-form-container'>
                        <label>Terms and Conditions</label>
                        <div className='terms-container'>
                            {TermsSections.map( ({title, body}) => (
                                <div className='terms-section-container' key={title}>
                                    <h4 className='terms-section-title'>{title}</h4>
                                    <p className='terms-section-body'>{body}</p>
                                </div>
                            ))}
                        </div>
                        <InputWithMessage
                            label='Acceptance'
                            inputType='checklist'
                            checklistOptions={[
                                {
                                    title: 'I agree to these terms and conditions',
                                    selected: formData.acceptedTermsAndConditions,
                                    id: 'acceptedTermsAndConditions'
                                }
                            ]}
                            onClickCheckbox={onClickCheckbox}
                            hasError={errors.acceptedTermsAndConditions}
                        />
                        <InputWithMessage
                            label='Signature'
                            inputType='text'
                            text={formData.signature}
                            fieldName='signature'
                            placeholder={formData.creatorName}
                            onChangeText={onChangeFormValue}
                            message=' '
                            hasError={errors.signature}
                        />
                    </div>
                : selectedStepID === 'payment' && !isEditMode ?
                    <div className='inner-form-container'>
                        <InputWithMessage
                            label='Access Code'
                            inputType='checklist'
                            checklistOptions={[
                                {
                                    title: 'I have an access code',
                                    selected: formData.hasAccessCode,
                                    id: 'hasAccessCode'
                                }
                            ]}
                            onClickCheckbox={onClickCheckbox}
                            hasError={errors.acceptedTermsAndConditions}
                        />
                        {formData.hasAccessCode ?
                            <InputWithMessage
                                label='Access Code'
                                inputType='text'
                                text={formData.accessCode}
                                fieldName='accessCode'
                                placeholder='Enter your access code'
                                onChangeText={onChangeFormValue}
                                hasError={errors.accessCode}
                                rightChild={
                                    <ValidLabel
                                        isValid={props.isValidAccessCode}
                                        validMessage='Access code is valid'
                                        invalidMessage='Access code is invalid'
                                        style={{marginLeft: 15}}
                                    />
                                }
                            />
                            : null
                        }
                    </div>
                : null
                }
                <div className='d-flex jc-space-between ai-center'>
                    {loadingCreateProject ?
                        <PendingMessage message="Operation in progress. Don't exit this page, this might take a little while." />
                        : <div />
                    }
                    <div className='buttons-container'>
                        {selectedStepID === 'general' ?
                            null
                            : <Button
                                title='Back'
                                type='tint'
                                priority={1}
                                onClick={onClickBack}
                                style={{marginRight: 10}}
                            />
                        }
                        {selectedStepID === 'payment' ?
                            <Button
                                title='Create Project'
                                type='solid'
                                priority={1}
                                onClick={onClickCreateProject}
                            />
                            : <Button
                                title='Next'
                                type='solid'
                                priority={1}
                                onClick={onClickNext}
                            />
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;

    & .progress-steps {
        margin-right: 30px;
        position: sticky;
        top: 75px;
    }

    & .form-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        padding: 30px;
        margin-bottom: 50px;
    }

    & .form-container .title {
        margin-bottom: 30px;
    }

    & .inner-form-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .label-with-message-container {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        width: 100%;
    }
    & .label-with-message-container .label-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
    }
    & .label-with-message-container .edit-icon {
        justify-self: flex-end;
    }

    & .color-option {
        height: 15px;
        width: 15px;
        border-radius: 7px;
    }

    & .custom-color-option-container {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
    & .custom-color-option {
        height: 15px;
        width: 60px;
        border-radius: 7px;
    }

    & .review-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        padding-left: 15px;
        box-sizing: border-box;
    }

    & .review-item {
        margin-top: 5px;
    }

    & .review-title {
        margin-bottom: 20px;
    }

    & .terms-container {
        height: min(60vh, 300px);
        border: 1px solid ${p => p.theme.bc};
        border-radius: 5px;
        padding: 20px;
        margin-top: 5px;
        overflow: scroll;
        margin-bottom: 20px;
    }

    & .terms-section-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 30px;
    }

    & .terms-section-title {
        margin-bottom: 5px;
    }

    & .terms-section-body {
        white-space: pre-line;
    }

    & .buttons-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIsValidAccessCode,
    addMessage,
    setThemeColor,
    setTintColor
}, dispatch)

export const CreateProjectForm = connect(mapStateToProps, mapDispatchToProps)(CreateProjectFormComponent)