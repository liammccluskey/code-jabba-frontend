import React, {useMemo, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getIsRecruiterPremiumUser,
    getIsCandidatePremiumUser,
    getIsRecruiterMode,

    cancelSubscription,
    fetchThisMongoUser
} from '../../../../redux/user'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import { Features } from '../../Premium'
import { SubscriptionTiers, SubscriptionTiersFormatted } from '../../../../redux/user'

import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Button } from '../../../components/common/Button'

export const CancelMembershipComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const subscriptionTier = useMemo(() => {
        return props.isRecruiterMode ? SubscriptionTiers.recruiterPremium : SubscriptionTiers.candidatePremium
    }, [props.isRecruiterMode])

    const features = Features[subscriptionTier]
    const subscriptionTierFormatted = SubscriptionTiersFormatted[subscriptionTier]

    // Effects

    useEffect(() => {
        if (!getCanCancelSubscription()) {
            addCantCancelSubscriptionModal()
        }
    }, [subscriptionTier, props.isRecruiterPremiumUser])

    // Utils

    const getCanCancelSubscription = () => {
        switch (subscriptionTier) {
            case SubscriptionTiers.recruiterPremium:
                return props.isRecruiterPremiumUser
            case SubscriptionTiers.candidatePremium:
                return props.isCandidatePremiumUser
        }
    }

    const addCantCancelSubscriptionModal = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: `Cancel ${subscriptionTierFormatted}`,
            message: `We can't cancel your subscription as you are not subscribed to ${subscriptionTierFormatted}.`,
            confirmButtonTitle: 'Okay',
            onConfirm: onSuccess => {
                navigate('/dashboard')
                onSuccess()
            },
            onCancel: () => navigate(-1)
        })
    }

    // Direct

    const onClickCancel = async () => {
        if (!getCanCancelSubscription()) {
            addCantCancelSubscriptionModal()
            return
        }
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
                        <h3 className='title'>Cancel {subscriptionTierFormatted}</h3>
                        <p className='message'>If you cancel {subscriptionTierFormatted}, you'll lose access to the following features.</p>
                        <div className='features-container'>
                            {features.map( ({title, description, icon}) => (
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
        min-height: 40px;
        min-width: 40px;
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
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
    isRecruiterMode: getIsRecruiterMode(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    cancelSubscription,
    fetchThisMongoUser,
    addModal
}, dispatch)

export const CancelMembership = connect(mapStateToProps, mapDispatchToProps)(CancelMembershipComponent)