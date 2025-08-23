import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'


import { addMessage } from '../../../../redux/communication'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import {
    getMongoUser,
    getIsRecruiterMode,
    getIsRecruiterPremiumUser,

    SubscriptionPrices,
    SubscriptionTiersFormatted
} from '../../../../redux/user'
import { api } from '../../../../networking'


import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Subheader } from '../../../components/headers/Subheader'
import { Button } from '../../../components/common/Button'

export const CheckoutPortalComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    
    // const subscriptionTierFormatted = props.isRecruiterMode ? SubscriptionTiersFormatted.recruiterPremium : SubscriptionTiersFormatted.candidatePremium
    // const subscriptionTierPricePerMonth = props.isRecruiterMode ? SubscriptionPrices.recruiterPremium : SubscriptionPrices.candidatePremium
    const subscriptionTierFormatted = SubscriptionTiersFormatted.recruiterPremium
    const subscriptionTierPricePerMonth = SubscriptionPrices.recruiterPremium
    
    useEffect(() => {
        if (props.isRecruiterPremiumUser) {
            addCantSubscribeModal()
        }
    }, [])

    // Utils

    const addCantSubscribeModal = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: subscriptionTierFormatted,
            message: `You are already subscribed to ${subscriptionTierFormatted}.`,
            confirmButtonTitle: 'Okay',
            onConfirm: onSuccess => {
                navigate('/dashboard')
                onSuccess()
            },
            onCancel: () => navigate(-1)
        })
    }

    // Direct

    const onClickPurchase = async () => {
        if (props.isRecruiterPremiumUser) {
            addCantSubscribeModal()
            return
        }

        try {
            const res = await api.post('/membership/create-checkout-session', {
                stripeCustomerID: props.mongoUser.stripeCustomerID,
                userID: props.mongoUser._id
            })
            
            const {sessionURL} = res.data
            window.location.href = sessionURL
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            props.addMessage(errorMessage, true)
        }
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Checkout' />
            <BodyContainer>
                <Container>
                    <div className='body-container float-container'>
                        <h3 className='title'>Review your Purchase</h3>
                        <div className='purchase-container'>
                            <div className='d-inline-flex jc-flex-start ai-center'>
                                <i className='bi-trophy-fill trophy-icon' />
                                <h4 className='premium-text'>{subscriptionTierFormatted}</h4> 
                            </div>
                            <div className='divider' />
                            <h4>{`$${subscriptionTierPricePerMonth} per month`}</h4>
                        </div>
                        <Button
                            title='Purchase'
                            priority={1}
                            type='solid'
                            onClick={onClickPurchase}
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
        margin-bottom: 20px;
    }

    & .purchase-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid ${p => p.theme.bc};
        border-radius: var(--br-container);
        padding: 30px;
        margin-bottom: 40px;
    }

    & .divider {
        width: 1px;
        height: 30px;
        background-color: ${p => p.theme.bc};
    }

    & .trophy-icon {
        font-size: 20px;
        color: ${p => p.theme.gold};
        margin-right: 10px;
    }

    & .premium-text {
        font-weight: 600;
    }
`
const mapStateToProps = state => ({
    isRecruiterMode: getIsRecruiterMode(state),
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    addModal
}, dispatch)

export const CheckoutPortal = connect(mapStateToProps, mapDispatchToProps)(CheckoutPortalComponent)
