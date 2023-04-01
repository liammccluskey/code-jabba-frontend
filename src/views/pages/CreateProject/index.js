import React, {useState} from 'react'
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

const ProjectTypes = [
    {title: 'Small Webapp - 2 Custom Pages', price: 100, id: 's'},
    {title: 'Medium Webapp - 4 Custom Pages', price: 200, id: 'm'},
    {title: 'Large Webapp - 10 Custom Pages', price: 500, id: 'l'}
]

export const CreateProjectComponent = props => {
    const {
        
    } = props
    const {projectType} = useParams()
    const [selectedStepID, setSelectedStepID] = useState('general')
    const [generalCompleted, setGeneralCompleted] = useState(false)
    const [landingCompleted, setLandingCompleted] = useState(false)
    const [themeCompleted, setThemeCompleted] = useState(false)
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
        blueTintSelected: false,
        purpleTintSelected: false,
        mintTintSelected: false,
        greenTintSelected: false,
        blueTintDefault: true,
        purpleTintDefault: false,
        mintTintDefault: false,
        greenTintDefault: false,
        selectedTintColor: 0,
        customTintColor: null,
        useCustomTintColor: false,
    })

    const progressSteps = [
        {title: 'General', isComplete: generalCompleted, id: 'general'},
        {title: 'Landing', isComplete: landingCompleted, id: 'landing'},
        {title: 'Theme', isComplete: themeCompleted, id: 'theme'},
        {title: 'Review', isComplete: reviewCompleted, id: 'review'},
        {title: 'Terms', isComplete: termsCompleted, id: 'terms'},
        {title: 'Payment', isComplete: paymentCompleted, id: 'payment'},
    ]

    const selectedStep = progressSteps.find(({id}) => id === selectedStepID)

    const onClickProgressStep = stepID => {
        switch (stepID) {
            case 'general':
                setSelectedStepID('general')
                break
            case 'landing':
                setSelectedStepID('landing')
                break
            case 'theme':
                setSelectedStepID('theme')
                break
            case 'review':
                setSelectedStepID('review')
                break
            case 'terms':
                setSelectedStepID('terms')
                break
            case 'payment':
                setSelectedStepID('payment')
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
        }
    }

    const onClickEditProjectName = () => {

    }

    const onClickEditProjectType = () => {

    }

    const onClickEditEmail = () => {

    }

    const onClickEditHeroTitle = () => {

    }

    const onClickEditHeroMessage = () => {

    }
    
    const onClickEditThemes = () => {

    }

    const onClickEditDefaultTheme = () => {

    }

    const onClickEditUseCustomTintColor = () => {

    }

    const onClickEditTintColors = () => {

    }

    const onClickEditDefaultTintColor = () => {

    }

    const onClickEditCustomTintColor = () => {

    }

    const onClickBack = () => {
        switch (selectedStepID) {
            case 'general':
                break
            case 'landing':
                break
            case 'theme':
                break
            case 'review':
                break
            case 'terms':
                break
            case 'payment':
                break
        }
    }

    const onClickNext = () => {
        switch (selectedStepID) {
            case 'general':
                setGeneralCompleted(true)
                break
            case 'landing':
                setLandingCompleted(true)
                break
            case 'theme':
                setThemeCompleted(true)
                break
            case 'review':
                setReviewCompleted(true)
                break
            case 'terms':
                setTermsCompleted(true)
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
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Project Name</label>
                                        <input name='projectName' value={formData.projectName} onChange={onChangeFormValue} />
                                    </div>
                                    <p className='message'>This is the name that will appear in the top left corner of your site.</p>
                                </div>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Project Type</label>
                                        <select name='projectType' value={formData.projectType} onChange={onChangeFormValue}>
                                            {ProjectTypes.map( ({title, price, id}) => (
                                                <option value={id} key={id}>{title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <h4 className='tint-message'>${ProjectTypes.find(({id}) => id === formData.projectType).price}</h4>
                                </div>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Your Email</label>
                                        <input name='email' value={formData.email} onChange={onChangeFormValue} />
                                    </div>
                                    <p className='message'>This is the email that will be used to create your Blackbox Solution account.</p>
                                </div>
                            </div>
                        : selectedStepID === 'landing' ?
                            <div className='inner-form-container'>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Hero Title</label>
                                        <input name='heroTitle' value={formData.heroTitle} onChange={onChangeFormValue} />
                                    </div>
                                    <p className='message'>This is the title that will be shown on the hero section of the landing page. We recommend a short statement about what your product does.</p>
                                </div>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Hero Message</label>
                                        <textarea name='heroMessage' value={formData.heroMessage} onChange={onChangeFormValue} />
                                    </div>
                                    <p className='message'>This is the message that will be shown beneath the hero title on the landing page. We recommend a 1-3 sentence message about what your product does and why people should use it.</p>
                                </div>
                            </div>
                        : selectedStepID === 'theme' ?
                            <div className='inner-form-container'>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Themes</label>
                                        <ChecklistOptions
                                            options={[
                                                {title: 'Light Theme', selected: formData.lightThemeSelected, id: 'lightThemeSelected'},
                                                {title: 'Dark Theme', selected: formData.darkThemeSelected, id: 'darkThemeSelected'},
                                                {title: 'Blue Theme', selected: formData.blueThemeSelected, id: 'blueThemeSelected'},
                                            ]}
                                            onClickCheckbox={onClickCheckbox}
                                            className='checklist'
                                        />
                                    </div>
                                    <p className='message'>Select up to three. Selecting multiple allows users to pick which theme to use on their version of the site.</p>
                                </div>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Default Theme</label>
                                        <ChecklistOptions
                                            options={[
                                                {title: 'Light Theme', selected: formData.lightThemeDefault, id: 'lightThemeDefault'},
                                                {title: 'Dark Theme', selected: formData.darkThemeDefault, id: 'darkThemeDefault'},
                                                {title: 'Blue Theme', selected: formData.blueThemeDefault, id: 'blueThemeDefault'},
                                            ]}
                                            onClickCheckbox={onClickCheckbox}
                                            className='checklist'
                                        />
                                    </div>
                                    <p className='message'>Select one.</p>
                                </div>
                                <div className='label-with-message-container'>
                                    <div className='label-container'>
                                        <label>Use Custom Tint Color</label>
                                        <Switch
                                            enabled={formData.useCustomTintColor}
                                            onClick={() => onClickSwitch('useCustomTintColor')}
                                            className='switch'
                                        />
                                    </div>
                                    <p className='message'>If selected we will use your custom tint color instead of the default tint colors provided.</p>
                                </div>
                                {formData.useCustomTintColor ?
                                    <div className='label-with-message-container'>
                                        <div className='label-container'>
                                            <label>Custom Tint Color</label>
                                            <input
                                                name='customTintColor'
                                                value={formData.customTintColor}
                                                onChange={onChangeFormValue}
                                                placeholder='Enter rgb code or hex code'
                                            />
                                        </div>
                                        <div className='custom-color-option-container'>
                                            <div className='custom-color-option' style={{backgroundColor: formData.customTintColor}} />
                                        </div>
                                    </div>
                                    : null
                                }
                                { formData.useCustomTintColor ?
                                    null
                                    : <div className='label-with-message-container'>
                                        <div className='label-container'>
                                            <label>Tint Colors</label>
                                            <ChecklistOptions
                                                options={[
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
                                                className='checklist'
                                            />
                                        </div>
                                        <p className='message'>Select up to four. Selecting multiple allows users to pick which tint color to use on their version of the site.</p>
                                    </div>
                                }      
                                { formData.useCustomTintColor ?
                                    null
                                    : <div className='label-with-message-container'>
                                        <div className='label-container'>
                                            <label>Default Tint Color</label>
                                            <ChecklistOptions
                                                options={[
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
                                                className='checklist'
                                            />
                                        </div>
                                        <p className='message'>Select one.</p>
                                    </div>
                                }
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
                                        onClick={onClickEditProjectName}
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
                                        onClick={onClickEditProjectType}
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
                                        onClick={onClickEditEmail}
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
                                        onClick={onClickEditHeroTitle}
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
                                        onClick={onClickEditHeroMessage}
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
                                        onClick={onClickEditThemes}
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
                                        onClick={onClickEditDefaultTheme}
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
                                        onClick={onClickEditUseCustomTintColor}
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
                                            onClick={onClickEditTintColors}
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
                                            onClick={onClickEditTintColors}
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
                                            onClick={onClickEditDefaultTintColor}
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

    & input, & select, & textarea {
        width: 50%;
        box-sizing: border-box;
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
    & .label-with-message-container .message {
        color: ${p => p.theme.textSecondary};
        flex: 1;
        padding-left: 50px;
        text-align: right;
    }
    & .label-with-message-container .tint-message {
        color: ${p => p.theme.tint};
        font-weight: 600;
        flex: 1;
        text-align: right;
        padding-left: 50px;
    }
    & .label-container input,
    & .label-container select,
    & .label-container textarea {
        width: 100%;
    }
    & .label-container textarea {
        height: 100px;
    }
    & .label-container .checklist {
        margin-left: 15px;
    }
    & .label-container .switch {
        margin-top: 5px;
        margin-left: 5px;
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