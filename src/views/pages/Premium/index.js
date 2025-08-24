import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { 
    getIsRecruiterMode,
    getIsRecruiterPremiumUser,

    SubscriptionTiers,
    SubscriptionTiersFormatted,
    SubscriptionPrices
} from '../../../redux/user'
import { ModalTypes } from '../../../containers/ModalProvider'
import { addModal } from '../../../redux/modal'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Button } from '../../components/common/Button'

export const Features = {
    // candidatePremium: [
    //     {
    //         title: 'Free tier items',
    //         description: 'With Candidate Premium, you get all the items in the free tier',
    //         icon: 'bi-check',
    //     },
    //     {
    //         title: 'Unlimited Job Applications',
    //         description: 'With Candidate Premium, you get to submit unlimited applications per day',
    //         icon: 'bi-briefcase',
    //     },
    // ],
    recruiterPremium: [
        {
            title: 'Free tier items',
            description: 'Access to all all the items in the free tier',
            icon: 'bi-check',
        },
        {
            title: 'Unlimited Active Job Posts',
            description: 'Ability to have unlimited active job posts at a time ',
            icon: 'bi-briefcase',
        },
    ]
}

export const PremiumComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    
    // const features = props.isRecruiterMode ? Features.recruiterPremium : Features.candidatePremium
    // const subscriptionTierFormatted = props.isRecruiterMode ? SubscriptionTiersFormatted.recruiterPremium : SubscriptionTiersFormatted.candidatePremium
    // const subscriptionTierPricePerMonth = props.isRecruiterMode ? SubscriptionPrices.recruiterPremium : SubscriptionPrices.candidatePremium
    const features = Features.recruiterPremium
    const subscriptionTierFormatted = SubscriptionTiersFormatted.recruiterPremium
    const subscriptionTierPricePerMonth = SubscriptionPrices.recruiterPremium

    // Effects

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

    const onClickContinue = async () => {
        navigate('/membership/checkout-portal')
    }

    return (
        <PageContainer>
            <MainHeader />
            <Banner>
                <h1>Go Premium</h1>
            </Banner>
            <BodyContainer>
                <Container>
                    <h2>Ready to go Premium?</h2>
                    <div className='d-flex ai-center'>
                        <p>{`With ${subscriptionTierFormatted} you'll get access to the following features.`}</p>
                    </div>
                    <div className='premium-container float-container'>
                        <div className='premium-price-container'>
                            <label>{subscriptionTierFormatted}</label>
                            <p className='price-text'>{`$${subscriptionTierPricePerMonth} per month`}</p>
                        </div>
                        <div className='divider' />
                        <div className='premium-button-container'>
                            <Button
                                title='Continue'
                                priority={2}
                                type='gold'
                                onClick={onClickContinue}
                            />
                        </div>
                    </div>
                    <div className='features-container'>
                        {features.map( ({title, description, icon}, i) => (
                            <div
                                className='feature-container'
                                style={{marginRight: i % 2 == 0 ? 40 : 0, marginBottom: i <= 1 ? 40 : 0}}
                                key={title}
                            >
                                <div className='icon-container' >
                                    <i className={icon}/>
                                </div>
                                <h3 className='title'>{title}</h3>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Banner = styled.div`
    width: 100%;
    padding: 30px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${p => p.theme.goldTranslucent};
    border-top: 1px solid ${p => p.theme.gold};
    border-bottom: 1px solid ${p => p.theme.gold};

    & h1 {
        font-weight: 700;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 100px;

    & .action-link {
        color: ${p => p.theme.gold} !important;
        margin-left: 10px;
    }

    & .premium-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 30px;
        margin-top: 30px;
        margin-bottom: 50px;
    }

    & .premium-price-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex: 1;
    }
    & .premium-price-container label {
        margin-bottom: 20px;
    }

    & .premium-button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex: 1;
    }

    & .divider {
        width: 1px;
        height: 50px;
        background-color: ${p => p.theme.bc};
    }

    & .features-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    & .feature-container {
        display: flex;
        flex-direction: column;
    }
    & .feature-container .icon-container {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;
        background-color: ${p => p.theme.tintTranslucent};
    }
    & .feature-container i {
        color: white;
        font-size: 20px;
        color: ${p => p.theme.tint};
    }
    & .feature-container .title {
        margin-bottom: 10px;
        font-weight: 600;
    }
`
const mapStateToProps = state => ({
    isRecruiterMode: getIsRecruiterMode(state),
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal,
}, dispatch)

export const Premium = connect(mapStateToProps, mapDispatchToProps)(PremiumComponent)