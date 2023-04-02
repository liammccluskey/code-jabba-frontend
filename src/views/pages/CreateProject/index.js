import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { setThemeColor, setTintColor } from '../../../redux/theme'
import { Tints } from '../../../redux/theme'
import { addMessage } from '../../../redux/communication'
import { getIsLoggedIn } from '../../../redux/user'
import { PageContainer } from '../../components/common/PageContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Subheader } from '../../components/headers/Subheader'
import { BodyContainer } from '../../components/common/BodyContainer'
import { Button } from '../../components/common/Button'
import { ProgressSteps } from '../../components/common/ProgressSteps'
import { Switch } from '../../components/common/Switch'
import { ChecklistOptions } from '../../components/common/ChecklistOptions'
import { IconButton } from '../../components/common/IconButton'
import { PillLabel } from '../../components/common/PillLabel'
import { InputWithMessage } from '../../components/common/InputWithMessage'
import { ImagesInput } from '../../components/common/ImagesInput'

const ProjectTypes = [
    {title: 'Small Webapp - 2 Custom Pages', price: 100, id: 's', pagesCount: 2},
    {title: 'Medium Webapp - 4 Custom Pages', price: 200, id: 'm', pagesCount: 4},
    {title: 'Large Webapp - 10 Custom Pages', price: 500, id: 'l', pagesCount: 10}
]

export const CreateProjectComponent = props => {
    const {
        
    } = props
    const {projectType} = useParams()
    const [selectedStepID, setSelectedStepID] = useState('general')
    const [generalCompleted, setGeneralCompleted] = useState(false)
    const [landingCompleted, setLandingCompleted] = useState(false)
    const [themeCompleted, setThemeCompleted] = useState(false)
    const [featuresCompleted, setFeaturesCompleted] = useState(false)
    const [reviewCompleted, setReviewCompleted] = useState(false)
    const [termsCompleted, setTermsCompleted] = useState(false)
    const [paymentCompleted, setPaymentCompleted] = useState(false)
    const [formData, setFormData] = useState({
        // general
        projectName: '',
        projectType: projectType || 's',
        email: '',

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
    })
    const [errors, setErrors] = useState({
        projectName: false,
        email: false,

        heroTitle: false,
        heroMessage: false,

        themes: false,
        tintColors: false,
        customTintColor: false,

        pagesTextErrors: [],
    })

    const progressSteps = [
        {title: 'General', isComplete: generalCompleted, id: 'general'},
        {title: 'Landing', isComplete: landingCompleted, id: 'landing'},
        {title: 'Theme', isComplete: themeCompleted, id: 'theme'},
        {title: 'Features', isComplete: featuresCompleted, id: 'features'},
        {title: 'Review', isComplete: reviewCompleted, id: 'review'},
        {title: 'Terms', isComplete: termsCompleted, id: 'terms'},
        {title: 'Payment', isComplete: paymentCompleted, id: 'payment'},
    ]

    const selectedStep = progressSteps.find(({id}) => id === selectedStepID)
    const selectedProjectType = ProjectTypes.find(({id}) => id === formData.projectType)

    useEffect(() => {
        const {pagesCount} = selectedProjectType
        setFormData(curr => ({
            ...curr,
            pagesText: Array(pagesCount).fill(''),
            pagesImages: Array(pagesCount).fill(new Array(0)),
        }))
        setErrors(curr => ({
            ...curr,
            pagesTextErrors: Array(pagesCount).fill(false)
        }))
    }, [selectedProjectType])

    // Utils

    const navigateToStep = (stepID, completedSteps) => {
        switch (stepID) {
            case 'general':
                setSelectedStepID('general')
                break
            case 'landing':
                if (generalCompleted || completedSteps.general) {
                    setSelectedStepID('landing')
                }
                break
            case 'theme':
                if (generalCompleted && landingCompleted || completedSteps.landing) {
                    setSelectedStepID('theme')
                }
                break
            case 'features':
                if (generalCompleted && landingCompleted && themeCompleted || completedSteps.theme) {
                    setSelectedStepID('features')
                }
                break
            case 'review':
                if (generalCompleted && landingCompleted && themeCompleted && featuresCompleted || completedSteps.features) {
                    setSelectedStepID('review')
                }
                break
            case 'terms':
                if (generalCompleted && landingCompleted && themeCompleted && featuresCompleted && reviewCompleted || completedSteps.review) {
                    setSelectedStepID('terms')
                }
                break
            case 'payment':
                if (generalCompleted && landingCompleted && themeCompleted && featuresCompleted && reviewCompleted && termsCompleted || completedSteps.terms) {
                    setSelectedStepID('payment')
                }
                break
        }
    }

    const onNavigateAwayFromStep = navigateToStepID => {
        switch (selectedStepID) {
            case 'general':
                const projectNameCompleted = !!formData.projectName
                const emailCompleted = !!formData.email
                setErrors(curr => ({
                    ...curr,
                    projectName: !projectNameCompleted,
                    email: !emailCompleted
                }))
                if (projectNameCompleted && emailCompleted) {
                    setGeneralCompleted(true)
                    navigateToStep(navigateToStepID, {general: true})
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
                }
                break
            case 'features':
                setFeaturesCompleted(true)
                navigateToStep(navigateToStepID, {features: true})
                break
            case 'review':
                setReviewCompleted(true)
                break
            case 'terms':
                setTermsCompleted(true)
                break
        }
    }

    // Direct

    const onClickProgressStep = stepID => {
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

    const onClickEditField = fieldName => {
        switch (fieldName) {
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

    const onClickSubmit = () => {

    }

    return (
        <PageContainer>
            {props.isLoggedIn ?
                <MainHeader />
                : <LandingHeader showButtons={false} />
            }
            <Subheader title='Create a Project' />
            <BodyContainer>
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
                                    label='Project Name'
                                    inputType='text'
                                    text={formData.projectName}
                                    onChangeText={onChangeFormValue}
                                    fieldName='projectName'
                                    message='This is the name that will appear in the top left corner of your site.'
                                    hasError={errors.projectName}
                                />
                                <InputWithMessage
                                    label='Project Type'
                                    inputType='select'
                                    fieldName='projectType'
                                    selectValue={formData.projectType}
                                    selectValues={ProjectTypes}
                                    onChangeSelectValue={onChangeFormValue}
                                    tintMessage={`$${selectedProjectType.price}`}
                                />
                                <InputWithMessage
                                    label='Your Email'
                                    inputType='text'
                                    text={formData.email}
                                    onChangeText={onChangeFormValue}
                                    fieldName='email'
                                    message='This is the email that will be used to create your Blackbox Solution account.'
                                    hasError={errors.email}
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
                                />
                                <InputWithMessage
                                    label='Hero Message'
                                    inputType='textarea'
                                    text={formData.heroMessage}
                                    onChangeText={onChangeFormValue}
                                    fieldName='heroMessage'
                                    message='This is the message that will be shown beneath the hero title on the landing page. We recommend a 1-3 sentence message about what your product does and why people should use it.'
                                    hasError={errors.heroTitle}
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
                                />
                                <InputWithMessage
                                    label='Use Custom Tint Color'
                                    inputType='switch'
                                    switchEnabled={formData.useCustomTintColor}
                                    onClickSwitch={() => onClickSwitch('useCustomTintColor')}
                                    message='If selected we will use your custom tint color instead of the default tint colors provided.'
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
                                        />
                                        <ImagesInput
                                            label={`Page ${i + 1} UI Images`}
                                            imageFiles={formData.pagesImages[i]}
                                            onChangeImageFiles={e => onChangePageImages(i, e)}
                                            onClickRemoveImage={imageIndex => onClickRemovePageImage(i, imageIndex)}
                                            key={i}
                                        />
                                    </div>
                                ))}
                            </div>
                        : selectedStepID === 'terms' ?
                            <div className='inner-form-container'>
                            </div>
                        : selectedStepID === 'review' ? 
                            <div className='inner-form-container'>
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
                            
                        : selectedStepID === 'payment' ?
                            <div className='inner-form-container'>
                            </div>
                        : null
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
                                    title='Submit'
                                    type='solid'
                                    priority={1}
                                    onClick={onClickSubmit}
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
                </Container>
            </BodyContainer>
        </PageContainer>
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
    }
    & .label-with-message-container .label-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
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

    & .review-item {
        margin-top: 5px;
    }

    & .buttons-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    setThemeColor,
    setTintColor
}, dispatch)

export const CreateProject = connect(mapStateToProps, mapDispatchToProps)(CreateProjectComponent)