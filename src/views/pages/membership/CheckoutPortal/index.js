import React, {useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


import { addMessage } from '../../../../redux/communication'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import {
    getMongoUser,
    getIsRecruiterMode,
    getIsRecruiterPremiumUser,
    getIsCandidatePremiumUser,

    SubscriptionPrices,
    SubscriptionTiersFormatted,
    SubscriptionTiers,
} from '../../../../redux/user'
import { api } from '../../../../networking'

import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Subheader } from '../../../components/headers/Subheader'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/Checkbox'

export const CheckoutPortalComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [acceptTermsSelected, setAcceptTermsSelected] = useState(false)
    const subscriptionTier = useMemo(() => {
        return props.isRecruiterMode ? SubscriptionTiers.recruiterPremium : SubscriptionTiers.candidatePremium
    }, [props.isRecruiterMode])
    
    const subscriptionTierFormatted = SubscriptionTiersFormatted[subscriptionTier]
    const subscriptionTierPricePerMonth = SubscriptionPrices[subscriptionTier]
    
    useEffect(() => {
        if (props.isRecruiterPremiumUser || props.isCandidatePremiumUser) {
            addCantSubscribeModal()
        }
    }, [])

    useEffect(() => {
        setAcceptTermsSelected(false)
    }, [props.isRecruiterMode])

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
        if (props.isRecruiterPremiumUser || props.isCandidatePremiumUser) {
            addCantSubscribeModal()
            return
        } else if (!acceptTermsSelected) {
            props.addMessage('You must accept the Terms and Conditions before you purchase a subscription.', true)
            return
        }

        try {
            const res = await api.post('/membership/create-checkout-session', {
                userID: props.mongoUser._id,
                subscriptionTier
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
                        <div className='purchase-button-container'>
                            <Button
                                title='Purchase'
                                priority={1}
                                type='solid'
                                onClick={onClickPurchase}
                            />
                            <Checkbox
                                selected={acceptTermsSelected}
                                onClick={() => setAcceptTermsSelected(curr => !curr)}
                                className='accept-terms-checkbox'
                            />
                            <p style={{marginLeft: 10}}>I accept the Terms and Conditions</p>
                        </div>
                        {props.isRecruiterMode ? 
                            <div className="terms-and-conditions">
                                <h3>Code Jabba – Recruiter Premium Plan Terms &amp; Conditions</h3>
                                <p style={{marginTop: 10}}>By subscribing to the <strong>Code Jabba Recruiter Premium Plan</strong> (“Premium Plan”), you (“Recruiter” or “You”) agree to the following terms and conditions.</p>

                                <h3>1. Eligibility</h3>
                                <ul>
                                    <li>You must be a legitimate employer, recruiter, or staffing agency with open roles related to software engineering and technology.</li>
                                    <li>Code Jabba reserves the right to suspend or terminate access if we determine your use violates these terms.</li>
                                </ul>

                                <h3>2. Subscription &amp; Payments</h3>
                                <ul>
                                    <li>The Premium Plan is billed monthly in advance.</li>
                                    <li><strong>No refunds</strong> will be issued for any reason, including partial use or cancellation before the billing period ends.</li>
                                    <li>All fees are non-transferable.</li>
                                </ul>

                                <h3>3. Posting Rules</h3>
                                <p>You agree to only post jobs relevant to software engineering, development, or related technical roles.</p>
                                <ul>
                                    <li>No fraudulent or misleading job listings.</li>
                                    <li>No roles unrelated to software engineering.</li>
                                    <li>No jobs that violate employment laws (including discriminatory or exploitative roles).</li>
                                </ul>
                                <p>Code Jabba may remove any job posting that violates these rules without refund.</p>

                                <h3>4. Account Use</h3>
                                <ul>
                                    <li>Your Premium Plan subscription is for your organization only and may not be shared, resold, or transferred.</li>
                                    <li>You are responsible for all activity under your account.</li>
                                </ul>

                                <h3>5. Termination &amp; Suspension</h3>
                                <ul>
                                    <li>Code Jabba may suspend or terminate your access if you violate these Terms or engage in activity harmful to candidates, other recruiters, or the platform.</li>
                                    <li>No refunds will be issued in the event of termination due to violations.</li>
                                </ul>

                                <h3>6. Liability Disclaimer</h3>
                                <ul>
                                    <li>Code Jabba is a platform for connecting recruiters and candidates; we do not guarantee candidate applications, hires, or results.</li>
                                    <li>Code Jabba does not independently verify the accuracy of candidate information.</li>
                                    <li>Code Jabba is not liable for any damages, losses, or claims arising from your use of the platform.</li>
                                </ul>

                                <h3>7. Data &amp; Privacy</h3>
                                <ul>
                                    <li>You must comply with applicable data protection laws when handling candidate information.</li>
                                    <li>You may not sell, misuse, or unlawfully disclose candidate data obtained through Code Jabba.</li>
                                </ul>

                                <h3>8. Prohibited Conduct</h3>
                                <ul>
                                    <li>No spamming, scraping, or automated harvesting of candidate profiles.</li>
                                    <li>No attempts to bypass platform security or rate limits.</li>
                                    <li>No impersonation or misrepresentation of your organization or roles.</li>
                                </ul>

                                <h3>9. Modifications</h3>
                                <p>Code Jabba may update these Terms at any time. Continued use of the Premium Plan after changes take effect constitutes acceptance of the updated Terms.</p>

                                <h3>10. Contact</h3>
                                <p>Questions about these Terms? Contact us at <strong>liammccluskey@codejabba.com</strong></p>

                            </div>
                            : <div className='terms-and-conditions'>
                                <h3>Code Jabba – Candidate Premium Plan Terms &amp; Conditions</h3>
                                <p style={{marginTop: 10}}>By subscribing to the <strong>Code Jabba Candidate Premium Plan</strong> (“Premium Plan”), you (“Candidate” or “You”) agree to the following terms and conditions.</p>

                                <h3>1. Eligibility</h3>
                                <ul>
                                    <li>You must be a legitimate job seeker in the field of software engineering, development, or related technical roles.</li>
                                    <li>Code Jabba reserves the right to suspend or terminate access if we determine your use violates these terms.</li>
                                </ul>

                                <h3>2. Subscription &amp; Payments</h3>
                                <ul>
                                    <li>The Premium Plan is billed monthly in advance.</li>
                                    <li><strong>No refunds</strong> will be issued for any reason, including partial use or cancellation before the billing period ends.</li>
                                    <li>All fees are non-transferable.</li>
                                </ul>

                                <h3>3. Platform Use</h3>
                                <p>You agree to use Code Jabba solely for legitimate job search purposes.</p>
                                <ul>
                                    <li>No fraudulent or misleading information on your profile or applications.</li>
                                    <li>No use of the platform for unrelated services, advertising, or solicitations.</li>
                                    <li>No activity that violates employment laws or professional standards.</li>
                                </ul>
                                <p>Code Jabba may remove profiles or content that violates these rules without refund.</p>

                                <h3>4. Account Use</h3>
                                <ul>
                                    <li>Your Premium Plan subscription is for your personal use only and may not be shared, resold, or transferred.</li>
                                    <li>You are responsible for all activity under your account.</li>
                                </ul>

                                <h3>5. Termination &amp; Suspension</h3>
                                <ul>
                                    <li>Code Jabba may suspend or terminate your access if you violate these Terms or engage in activity harmful to recruiters, other candidates, or the platform.</li>
                                    <li>No refunds will be issued in the event of termination due to violations.</li>
                                </ul>

                                <h3>6. Liability Disclaimer</h3>
                                <ul>
                                    <li>Code Jabba is a platform for connecting candidates and recruiters; we do not guarantee job offers, interviews, or employment.</li>
                                    <li>Code Jabba does not independently verify recruiter legitimacy beyond platform controls.</li>
                                    <li>Code Jabba is not liable for any damages, losses, or claims arising from your use of the platform.</li>
                                </ul>

                                <h3>7. Data &amp; Privacy</h3>
                                <ul>
                                    <li>You must provide accurate and truthful information in your profile and applications.</li>
                                    <li>Code Jabba will handle your data in accordance with our Privacy Policy, but you acknowledge that recruiters may view the information you choose to share.</li>
                                </ul>

                                <h3>8. Prohibited Conduct</h3>
                                <ul>
                                    <li>No spamming, scraping, or automated harvesting of recruiter or job data.</li>
                                    <li>No attempts to bypass platform security or rate limits.</li>
                                    <li>No impersonation or misrepresentation of your qualifications or identity.</li>
                                </ul>

                                <h3>9. Modifications</h3>
                                <p>Code Jabba may update these Terms at any time. Continued use of the Premium Plan after changes take effect constitutes acceptance of the updated Terms.</p>

                                <h3>10. Contact</h3>
                                <p>Questions about these Terms? Contact us at <strong>liammccluskey@codejabba.com</strong></p>
                            </div>
                        }
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

    & .terms-and-conditions h3 {
        margin-top: 30px;
    }

    & .purchase-button-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    & .purchase-button-container .accept-terms-checkbox {
        margin-left: 20px;
    }
`
const mapStateToProps = state => ({
    isRecruiterMode: getIsRecruiterMode(state),
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    addModal
}, dispatch)

export const CheckoutPortal = connect(mapStateToProps, mapDispatchToProps)(CheckoutPortalComponent)
