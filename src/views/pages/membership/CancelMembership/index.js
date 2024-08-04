import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    cancelSubscription,
    fetchThisMongoUser
} from '../../../../redux/user'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import { Features } from '../../Premium'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Button } from '../../../components/common/Button'

export const CancelMembershipComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    // Direct

    const onClickCancel = async () => {
        props.addModal(ModalTypes.CONFIRM, {
            message: 'Are you sure you want to cancel your Premium subscription?',
            onConfirm: (onSuccess, onFailure) => props.cancelSubscription(
                () => {
                    props.fetchThisMongoUser(
                        undefined,
                        () => {
                            navigate('/dashboard')
                            onSuccess()
                        },
                        onFailure
                    )
                },
                () => {
                    props.fetchThisMongoUser()
                    onFailure()
                }
            ),
            isDanger: true
        })
    }

    return (
        <PageContainer>
            <MainHeader />
            <BodyContainer>
                <Container>
                    <div className='body-container float-container'>
                        <h3 className='title'>Cancel Premium</h3>
                        <p className='message'>If you cancel premium, you'll lose access to the following features.</p>
                        <div className='features-container'>
                            {Features.map( ({title, description, icon}) => (
                                <div className='feature-container' key={title}>
                                    <div className='icon-container'>
                                        <i className={icon} />
                                    </div>
                                    <div className='d-flex fd-column ai-flex-start'>
                                        <h4 className='feature-title'>{title}</h4>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            title='Cancel'
                            priority={1}
                            type='solid'
                            onClick={onClickCancel}
                            className='as-flex-start'
                        />
                    </div>
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .body-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
    }

    & .title {
        margin-bottom: 0px;
    }

    & .message {
        margin-bottom: 20px;
    }

    & .features-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: 1px solid ${p => p.theme.bc};
        border-radius: var(--br-container);
        padding: 15px;
        margin-bottom: 40px;
    }

    & .feature-container {
        display: flex;
        align-items: center;
        padding: 15px;
    }
    & .feature-container .icon-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: ${p => p.theme.tintTranslucent};
        margin-right: 15px;
    }
    & .feature-container i {
        font-size: 20px;
        color: ${p => p.theme.tint};
    }
    & .feature-title {
        font-weight: 600;
        margin-bottom: 10px;
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    cancelSubscription,
    fetchThisMongoUser,
    addModal
}, dispatch)

export const CancelMembership = connect(mapStateToProps, mapDispatchToProps)(CancelMembershipComponent)