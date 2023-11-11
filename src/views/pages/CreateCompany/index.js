import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { getIsMobile } from '../../../redux/theme'
import { postCompany } from '../../../redux/company'
import { addMessage } from '../../../redux/communication'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { InputWithMessage } from '../../components/common/InputWithMessage'
import AutoComplete from 'react-google-autocomplete'
import { Button } from '../../components/common/Button'

export const CreateCompanyComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        headquarters: '',
        description: '',
        linkedInURL: '',
        glassDoorURL: '',
    })
    const [errors, setErrors] = useState({
        name: false,
        headquarters: false,
        description: false,
        linkedInURL: false,
    })

    const addError = field => {
        setErrors(curr => ({
            ...curr,
            [field]: true
        }))
    }

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

    const onChangeLocation = (location) => {
        setFormData(curr => ({
            ...curr,
            headquarters: location.formatted_address
        }))
    }

    const onClickCreate = () => {
        let hasErrors = false
        if (!formData.name) {
            addError('name')
            hasErrors = true
        }
        if (!formData.headquarters) {
            addError('headquarters')
            hasErrors = true
        }
        if (!formData.description) {
            addError('description')
            hasErrors = true
        }
        if(!formData.linkedInURL) {
            addError('linkedInURL')
            hasErrors = true
        }
        if (hasErrors) {
            props.addMessage('You are missing one or more required fields.', true)
            return
        }
        props.postCompany(formData, companyID => navigate(`/companies/${companyID}`))
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Create a Company' />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0, overflow: 'scroll'}}>
                <Root className={`float-container ${props.isMobile && 'mobile'}`} style={{overflow: 'visible'}}>
                <InputWithMessage
                    inputType='text'
                    label='Name'
                    fieldName='name'
                    text={formData.name}
                    onChangeText={onChangeField}
                    hasError={errors.name}
                />
                <InputWithMessage
                    inputType='location'
                    label='Headquarters'
                    text={formData.headquarters}
                    fieldName='headquarters'
                    onChangeText={onChangeField}
                    onChangeLocation={onChangeLocation}
                    hasError={errors.headquarters}
                />
                <InputWithMessage
                    inputType='textarea'
                    label='Description'
                    fieldName='description'
                    text={formData.description}
                    onChangeText={onChangeField}
                    hasError={errors.description}
                />
                <InputWithMessage
                    inputType='text'
                    label='LinkedIn URL'
                    fieldName='linkedInURL'
                    text={formData.linkedInURL}
                    onChangeText={onChangeField}
                    hasError={errors.linkedInURL}
                />
                <InputWithMessage
                    inputType='text'
                    label='Glassdoor URL'
                    fieldName='glassDoorURL'
                    text={formData.glassDoorURL}
                    onChangeText={onChangeField}
                    optional={true}
                />
                <Button
                    title='Create'
                    priority={1}
                    type='solid'
                    onClick={onClickCreate}
                    style={{alignSelf: 'flex-end'}}
                />
                </Root>
            </BodyContainer>
        </PageContainer>
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
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postCompany,
    addMessage
}, dispatch)

export const CreateCompany = connect(mapStateToProps, mapDispatchToProps)(CreateCompanyComponent)