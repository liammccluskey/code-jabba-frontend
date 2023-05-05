import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import { createUserAndPostProject } from '../../../redux/project/thunks'
import { getIsLoggedIn } from '../../../redux/user'
import { PageContainer } from '../../components/common/PageContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Subheader } from '../../components/headers/Subheader'
import { BodyContainer } from '../../components/common/BodyContainer'
import { CreateProjectForm } from '../../components/project/CreateProjectForm'

export const CreateProjectComponent = props => {
    const {

    } = props
    const navigate = useNavigate()
    const {projectType} = useParams()
    const [projectFormData, setProjectFormData] = useState(null)

    const onChangeFormData = formData => {
        setProjectFormData(formData)
    }

    const onCreateProject = (onSuccess, onFailure) => {
        props.createUserAndPostProject(projectFormData, onSuccess, onFailure, navigate)
    }

    return (
        <PageContainer>
            {props.isLoggedIn ?
                <MainHeader />
                : <LandingHeader showButtons={true} hasSubheaderBelow={true}/>
            }
            <Subheader title='Create a Webapp' />
            <BodyContainer>
                <CreateProjectForm
                    isEditMode={false}
                    projectType={projectType}
                    initFormData={null}
                    onChangeFormData={onChangeFormData}
                    onCreateProject={onCreateProject}
                />
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
    isLoggedIn: getIsLoggedIn(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createUserAndPostProject,
}, dispatch)

export const CreateProject = connect(mapStateToProps, mapDispatchToProps)(CreateProjectComponent)