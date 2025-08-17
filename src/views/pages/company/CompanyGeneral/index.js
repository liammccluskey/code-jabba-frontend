import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { getIsMobile } from '../../../../redux/theme'
import {
    getCompany,
    getLoadingCompany,
    getCompanyNotFound,
    fetchCompany,
} from '../../../../redux/company'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { CompanyHeader } from '../../../components/company/CompanyHeader'
import { ErrorElement } from '../../ErrorElement'
import { Loading } from '../../../components/common/Loading'
import { PageLink } from '../../../components/common/PageLink'
import { Tooltip } from '../../../components/common/Tooltip'

export const CompanyGeneralComponent = props => {
    const {
        
    } = props
    const {companyID} = useParams()

    useEffect(() => {
        props.fetchCompany(companyID)
    }, [companyID])

    return ( props.companyNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            {!props.loadingCompany && props.company ?
                <CompanyHeader
                    activeLinkID='general'
                    company={props.company}
                />
                : null
            }
            <BodyContainer>
                {!props.loadingCompany && props.company ?
                    <Root className={`${props.isMobile && 'mobile'}`}>
                        <div className='top-section'>
                            <div className='float-container info-container company-container'>
                                <label>Headquarters address</label>
                                {props.company.headquartersAddress ?
                                    <p className='sub-section'>{props.company.headquartersAddress}</p>
                                    : <p className='sub-section not-provided-text'>Not provided</p>
                                }
                                <label>Description</label>
                                {props.company.description ?
                                    <p className='description-text'>{props.company.description}</p>
                                    : <p className='not-provided-text'>Not provided</p>
                                }
                            </div>
                            <div className='float-container info-container socials-container'>
                                <h3 className='section-title'>Socials</h3>
                                    <div className='social-container'>
                                        <Tooltip title='Linkedin'>
                                            <img
                                                src='/images/linkedin_logo.png'
                                                className='social-logo'
                                            />
                                        </Tooltip>
                                        {props.company.linkedInURL ?
                                            <PageLink
                                                title={'LinkedIn'}
                                                url={props.company.linkedInURL}
                                                openInNewTab={true}
                                            />
                                            : <p className='not-provided-text'>LinkedIn URL not provided</p>
                                        }
                                    </div>
                                    <div className='social-container'>
                                        <Tooltip title='Glassdoor'>
                                            <img
                                                src='/images/glassdoor_logo.svg'
                                                className='social-logo'
                                            />
                                        </Tooltip>
                                        {props.company.glassDoorURL ?
                                            <PageLink
                                                title={'Glassdoor'}
                                                url={props.company.glassDoorURL}
                                                openInNewTab={true}
                                            />
                                            : <p className='not-provided-text'>Glassdoor URL not provided</p>
                                        }
                                    </div>
                            </div>
                        </div>
                    </Root>
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .top-section {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    &.mobile .top-section {
        display: grid;
        grid-template-columns: 1fr;
    }

    & .info-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;  
    }
    &.mobile .info-container {
        padding: 20px;
    }

    & .company-container {
        flex: 2;
    }
    & .socials-container {
        flex: 1;
        margin-left: 30px;
    }
    &.mobile .socials-container {
        margin-left: 0px;
        margin-top: 30px;
    }

    & .section-title {
        margin-bottom: 20px;
    }

    & .sub-section {
        margin-bottom: 20px;
    }

    & .social-container {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    & .social-container:last-child {
        margin-bottom: 0px;
    }
    & .social-logo {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }

    & .not-provided-text {
        color: ${p => p.theme.textSecondary};
    }

    & .description-text {
        white-space: pre-line;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    company: getCompany(state),
    loadingCompany: getLoadingCompany(state),
    companyNotFound: getCompanyNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCompany
}, dispatch)

export const CompanyGeneral = connect(mapStateToProps, mapDispatchToProps)(CompanyGeneralComponent)