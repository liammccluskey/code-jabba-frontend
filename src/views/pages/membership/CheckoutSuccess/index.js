import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import { addMessage } from '../../../../redux/communication'
import {
    fetchThisMongoUser
} from '../../../../redux/user'
import { Features } from '../../Premium'
import { SubscriptionTiers, SubscriptionTiersFormatted } from '../../../../redux/user'

import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Button } from '../../../components/common/Button'
import { ErrorElement } from '../../ErrorElement'

export const CheckoutSuccessComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const {subscriptionTier} = useParams()
    const isValidSubscriptionTier = useMemo(() => {
        return [SubscriptionTiers.recruiterPremium, SubscriptionTiers.candidatePremium].includes(subscriptionTier)
    }, [subscriptionTier])

    const features = Features[subscriptionTier]
    const subscriptionTierFormatted = SubscriptionTiersFormatted[subscriptionTier]

    useEffect(() => {
        if (!isValidSubscriptionTier) return
        props.addMessage(`Welcome to ${subscriptionTierFormatted}. Please refresh the page when you receive email confirmation of your subscription.`, false, true)
        setTimeout(() => {
            props.fetchThisMongoUser()
        }, 30*1000)
    }, [])

    // Direct

    const onClickGoToDashboard = () => {
        navigate('/dashboard')
    }

    return !isValidSubscriptionTier ? <ErrorElement /> : (
        <PageContainer>
            <MainHeader />
            <BodyContainer>
                <Container>
                    <div className='body-container float-container'>
                        <h3 className='title'>Thank you for your purchase</h3>
                        <p className='message'>You now have access to the following features.</p>
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
                            title='Go to Dashboard'
                            priority={1}
                            type='solid'
                            onClick={onClickGoToDashboard}
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
    fetchThisMongoUser,
    addMessage
}, dispatch)

export const CheckoutSuccess = connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccessComponent)