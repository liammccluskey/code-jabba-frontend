import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { 
    getLandingStats,

    fetchLandingStats
} from '../../../redux/landing'
import {
    Events,

    logEvent
} from '../../../redux/events'
import { getIsMobile, getIsSemiMobile } from '../../../redux/theme'
import { setThemeColor, setTintColor } from '../../../redux/theme'
import { 
    SubscriptionTiersFormatted, 
    SubscriptionPrices,
    getIsRecruiterMode,

    setIsRecruiterMode
} from '../../../redux/user'
import { formatNumber } from '../../../utils'
import { MaxApplicationsPerDay } from '../../components/job/JobCard'

import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Button } from '../../components/common/Button'
import { ValueDeltaSpread } from '../../components/common/ValueDeltaSpread'

const Config = {
    candidate: {
        heroMessage: "Save hours searching for jobs by searching by coding language, skill, experience level and more.",
        whyChooseUs: [
            {
                title: 'Faster job search',
                message: "With our job search search filters, you can save time in your job search by searching for jobs by coding language, skill, experience level, salary and more.",
                imageSrc: require('../../../assets/candidate_choice_filters.png')
            },
            {
                title: 'New jobs daily',
                message: 'In addition to the jobs posted by recruiters, we post up to 300 new jobs per day across over 30 different US tech cities.',
                imageSrc: require('../../../assets/candidate_choice_cities.png')
            },
            {
                title: 'Application Stats',
                message: "With our site, you can track the statistics of how many of your applications have been viewed, accepted, and rejected.",
                imageSrc: require('../../../assets/candidate_choice_stats.png')
            }
        ],
        pricing: [
            {
                title: 'Basic Plan',
                price: 'Free',
                formatCurrency: false,
                features: [
                    {title: `${MaxApplicationsPerDay} job applications per day`},
                    {title: 'Complex job search filters'},
                    {title: 'Track application stats'},
                ],
                id: 's'
            },
            {
                title: `${SubscriptionTiersFormatted.candidatePremium} Plan`,
                price: `${SubscriptionPrices.candidatePremium} / month`,
                formatCurrency: true,
                features: [
                    {title: 'All basic plan benefits'},
                    {title: 'Unlimited applications per day'},
                    // {title: 'Unlimited job search filters'},
                    {title: 'Save job search filter combinations'}
                ],
                id: 'm'
            }
        ]
    },
    recruiter: {
        heroMessage: "Cut through the clutter. Post jobs, review applicants, and track your hiring pipeline - all in one place",
        whyChooseUs: [
            {
                title: 'Easier application review',
                message: "With our application review process, you'll be able to save time searching through applications with our easy to use summary of each applicants skills and years of experience.",
                imageSrc: require('../../../assets/recruiter_choice_application_review.png')
            },
            {
                title: 'Simple communication with candidates',
                message: 'With our hiring pipeline, you can easily send acceptance and rejection emails to applications by clicking a single button.',
                imageSrc: require('../../../assets/recruiter_choice_communication.png')
            },
            {
                title: 'Application stats',
                message: "With our site, you can track the number of applications you receive, view, reject and accept.",
                imageSrc: require('../../../assets/recruiter_choice_stats.png')
            }
        ],
        pricing: [
            {
                title: 'Basic Plan',
                price: 'Free',
                formatCurrency: false,
                features: [
                    {title: '1 active job post at a time'},
                    {title: 'Track job post stats'},
                    {title: 'Review applications'}
                ],
                id: 's'
            },
            {
                title: `${SubscriptionTiersFormatted.recruiterPremium} Plan`,
                price: `${SubscriptionPrices.recruiterPremium} / month`,
                formatCurrency: true,
                features: [
                    {title: 'All basic plan benefits'},
                    {title: 'Unlimited active job postings'},
                ],
                id: 'm'
            }
        ]
    }
}

export const LandingComponent = props => {
    const navigate = useNavigate()
    const userMode = props.isRecruiterMode ? 'recruiter' : 'candidate'
    const config = Config[userMode]
    const [selectedWhyChooseUsOptionID, setSelectedWhyChooseUsOptionID] = useState(0)

    // let siteStatsValues = props.isMobile ?
    //     [
    //         {title: 'Applications submitted', value: props.siteStats.applicationsCount},
    //         {title: 'Active job posts', value: props.siteStats.jobsCount},
    //     ]
    //     : [
    //         {title: 'Applications submitted', value: props.siteStats.applicationsCount},
    //         {title: 'Active job posts', value: props.siteStats.jobsCount},
    //         {title: 'Candidates', value: props.siteStats.candidatesCount},
    //         {title: 'Recruiters', value: props.siteStats.recruitersCount},
    //     ]
    // siteStatsValues = siteStatsValues.map( ({title, value}) => ({title, value: formatNumber(value)}))


    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
        // props.fetchLandingStats()
        
        props.logEvent(Events.landingPageVisit)
    }, [])

    const onClickGetStarted = () => {
        navigate('/register')
    }

    const onClickViewPricing = () => {
        const pricingElement = document.getElementById('pricing-container')
        pricingElement.scrollIntoView()
    }

    const onClickWhyChooseUsOption = optionID => {
        setSelectedWhyChooseUsOptionID(Math.min(config.whyChooseUs.length - 1, optionID))
    }

    const onClickPricingOption = optionID => {
        navigate(`/register`)
    }

    const onClickContactUs = () => {
        navigate('/contact-us')
    }

    const onClickIsRecruiter = () => {
        props.setIsRecruiterMode(true)
    }

    const onClickIsCandidate = () => {
        props.setIsRecruiterMode(false)
    }

    return (
        // props.isRecruiterMode === null ?
        // <FullscreenContainer>
        //     <div className='mode-container'>
        //         <h1 className='mode-title'>I am a</h1>
        //         <div className='mode-buttons-container'>
        //             <Button
        //                 title='Candidate'
        //                 type='solid'
        //                 priority={1}
        //                 onClick={onClickIsCandidate}
        //                 style={{marginRight: 20}}
        //             />
        //             <Button
        //                 title='Recruiter'
        //                 type='clear'
        //                 priority={1}
        //                 onClick={onClickIsRecruiter}
        //             />
        //         </div>
        //     </div>
        // </FullscreenContainer> : 
        <PageContainer>
            <LandingHeader showButtons={true} />
            <Container className={`${props.isMobile && 'mobile'} ${props.isSemiMobile && 'semi-mobile'}`}>
                <div className='hero-container'>
                    <div className='hero-message-container'>
                        <div className='d-flex fd-column ai-flex-start'>
                            <h1 className='hero-title'>The <strong>job board</strong> for <strong>software engineers</strong></h1>
                            <h3 className='hero-message'>{config.heroMessage}</h3>
                            <div className='d-flex jc-flex-start ai-center'>
                                <Button
                                    title='Get started free'
                                    type='solid'
                                    priority={1}
                                    onClick={onClickGetStarted}
                                    style={{marginRight: 15}}
                                />
                            </div>
                        </div>
                    </div>
                    <img 
                        className='hero-image' 
                        src={props.isRecruiterMode ? 
                            require('../../../assets/recruiter_hero_image.png') 
                            : require('../../../assets/candidate_hero_image.png')
                        }
                    />
                </div>
                {/* <div className='white-to-blue-gradient'>
                    <div className='stats-container'>
                        <ValueDeltaSpread
                            values={siteStatsValues}
                            showDelta={false}
                            className='float-container value-delta-spread'
                        />
                    </div>
                </div> */}
                <div className='why-choose-us-container'>
                    <h1 className='section-title'>Why Choose Us</h1>
                    <div className='why-choose-us-options-container'>
                        <div className='why-choose-us-grid-container'>
                            <div 
                                className='why-choose-us-image-container'
                                style={props.isSemiMobile || props.isMobile ? 
                                    {display: 'none'}
                                    : {}
                                }
                            >
                                <img
                                    className='why-choose-us-image'
                                    src={config.whyChooseUs[selectedWhyChooseUsOptionID].imageSrc}
                        
                                />
                            </div>
                            <div className='d-flex fd-column jc-space-around ai-stretch'>
                                {config.whyChooseUs.map( ({title, message}, i) => (
                                    <div
                                        onClick={() => onClickWhyChooseUsOption(i)}
                                        className={`why-choose-us-option-container ${i == selectedWhyChooseUsOptionID && 'selected'}`}
                                        key={title}
                                        style={props.isSemiMobile || props.isMobile ?
                                            {marginBottom: 20} : {}
                                        }
                                    >
                                        <h2 className='title'>{title}</h2>
                                        <h3 className='message'>{message}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='blue-to-white-gradient' /> */}
                <div className='pricing-container' id='pricing-container'>
                    <div className='section-header'>
                        <h1 className='title'>Pricing</h1>
                        <Button
                            title='Contact us'
                            priority={2}
                            type='solid'
                            onClick={onClickContactUs}
                        />
                    </div>
                    <div className='pricing-options-container'>
                        {config.pricing.map(({title, price, formatCurrency, features, id}) => (
                            <div
                                className='pricing-option-container float-container'
                                key={title}
                            >
                                <div className='header'>
                                    <h3>{title}</h3>
                                    <div className='price-container'>
                                        <h3 className='price'>{`${formatCurrency ? '$' : '' } ${price}`}</h3>
                                        {price === 'Free' ? null : <h3 className='tax-text'> + tax</h3>}
                                    </div>
                                </div>
                                {features.map( ({title}, i) => (
                                    <div className={`feature-list-item ${!i && 'bold'}`} key={title}>
                                        <i className={`bi-check-circle-fill check-icon`} />
                                        <h3>{title}</h3>
                                    </div>
                                ))}
                                <Button
                                    title='Get started'
                                    type='clear'
                                    priority={1}
                                    onClick={() => onClickPricingOption(id)}
                                    style={{marginTop: 15}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='copyright-container'>
                    <p>© {moment().year()} {process.env.REACT_APP_SITE_NAME}. All rights reserved.</p>
                </div>
            </Container>
        </PageContainer>

    )
}

const FullscreenContainer = styled.div`
    postition: fixed;
    z-index: 20;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${p => p.theme.bgcLight};
    & .mode-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & .mode-title {
        margin-bottom: 20px;
    }
    & .mode-buttons-container {
        display: flex;
        align-items: center;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    & .hero-container {
        height: calc(100vh - var(--h-mainheader));
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 50px;
        box-sizing: border-box;
        background-color: ${p => p.theme.bgcSettings};
    }
    &.semi-mobile .hero-container {
        padding: 30px;
        grid-template-columns: 1fr;
    }
    &.mobile .hero-container {
        padding: 15px;
    }

    & h1, h2 {
        font-weight: 700;
    }

    & .hero-message-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-right: 50px;
    }
    &.semi-mobile .hero-message-container {
        margin-right: 0px;
        margin-bottom: 50px;
    }
    & .hero-title {
        margin-bottom: 20px;
    }
    & strong {
        color: ${p => p.theme.tint} !important;
        font-weight: 700;
    }
    & .hero-message {
        margin-bottom: 30px;
        line-height: 160%;
        color: ${p => p.theme.textMain};
        font-size: 20px !important;
        font-weight: 400 !important;
    }

    & .hero-image {
        width: 100%;
        border: 5px solid ${p => p.theme.bc};
        border-radius: 20px;
        margin: auto 0px;
        box-sizing: border-box;
    }

    & .stats-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 300px;
        width: min(1000px, 95vw);
    }

    & .value-delta-spread {
        padding: 30px;
        width: min(90%, 1000px);
        align-self: center;
        margin-right: 30px;
        margin-left: 30px;
        box-sizing: border-box;
    }

    & .why-choose-us-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 50px;
        background-color: ${p => p.theme.tint};
    }
    &.semi-mobile .why-choose-us-container {
        padding: 30px;
    }
    &.mobile .why-choose-us-container {
        padding: 15px;
    }

    & .section-title {
        margin-bottom: 30px;
    }

    & .why-choose-us-grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &.semi-mobile .why-choose-us-grid-container {
        grid-template-columns: 1fr;
    }

    & .why-choose-us-image-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 550px;
    }
    &.semi-mobile .why-choose-us-image-container {
        height: 300px;
    }
    &.semi-mobile .why-choose-us-image {
        max-width: 275px;
    }
    & .why-choose-us-image {
        max-height: 550px;
        // border: 5px solid ${p => p.theme.bc};
        border-radius: 20px;
        max-width: 500px;
    }

    & .why-choose-us-option-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
        cursor: pointer;
        border-radius: 20px;
        box-sizing: border-box;
        background-color: ${p => p.theme.tint};
        border: 2px solid ${p => p.theme.fontPrimary};
    }
    & .why-choose-us-option-container.selected {
        background-color: ${p => p.theme.bgcLight};
        border-color: ${p => p.theme.bgcLight};
    }
    & .why-choose-us-option-container .title {
        margin-bottom: 15px;
    }
    & .why-choose-us-option-container * {
        color: black !important;
    }
    & .why-choose-us-option-container.selected *  {
       color: black !important;
    }

    & .pricing-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 50px;
        border-bottom: 1px solid black;
        background-color: ${p => p.theme.bgcLight};
    }
    &.semi-mobile .pricing-container {
        padding: 30px;
    }
    &.mobile .pricing-container {
        padding: 15px;
    }
    & .section-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    & .pricing-options-container {
        display: flex;
        justify-content: space-around;
    }
    &.semi-mobile .pricing-options-container,
    &.mobile .pricing-options-container {
        display: grid;
        grid-template-columns: 1fr;
    }

    & .pricing-option-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        border-radius: var(--br-container);
        padding: 30px;
        flex: 1;
        box-sizing: border-box;
        margin: 0px 15px;
        border-width: 2px !important;
        maxWidth: min(600px, 100%);
        minWidth: min(600px, 100%);
    }
    &.semi-mobile .pricing-option-container,
    &.mobile .pricing-option-container {
        margin-bottom: 30px !important;
        maxWidth: auto;
        minWidth: auto;
    }

    & .pricing-option-container .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    & .pricing-option-container .price {
        color: ${p => p.theme.tint};
        font-weight: 600;
    }
    & .pricing-option-container .header h3 {
        font-weight: 700;
    }
    & .pricing-option-container .price-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    & .price-container .tax-text {
        color: ${p => p.theme.textSecondary};
        margin-left: 5px;
    }

    & .feature-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        text-align: right;
    }
    & .feature-list-item i {
        font-size: 20px;
        color: ${p => p.theme.tint};
    }
    & .feature-list-item h3 {
        font-weight: 500;
    }
    & .feature-list-item.bold h3 {
        font-weight: 600;
    }

    & .copyright-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 50px 0px;
    }

    & .check-icon {
        margin-right: 30px;
    }

    & .white-to-blue-gradient {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 200px;
        background: linear-gradient(to bottom, ${p => p.theme.bgcLight}, ${p => p.theme.tint});
    }

    & .blue-to-white-gradient {
        width: 100%;
        height: 100px;
        background: linear-gradient(to bottom, ${p => p.theme.tint}, ${p => p.theme.bgcLight});
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state),
    isRecruiterMode: getIsRecruiterMode(state),
    siteStats: getLandingStats(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setThemeColor,
    setTintColor,
    setIsRecruiterMode,
    fetchLandingStats,
    logEvent
}, dispatch)

export const Landing = connect(mapStateToProps, mapDispatchToProps)(LandingComponent)