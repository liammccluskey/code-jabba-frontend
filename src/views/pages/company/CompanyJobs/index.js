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
import { FixedBodyContainer } from '../../../components/common/FixedBodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { CompanyHeader } from '../../../components/company/CompanyHeader'
import { ErrorElement } from '../../ErrorElement'
import { Loading } from '../../../components/common/Loading'
import { JobsFeed } from '../../../components/job/JobsFeed'

export const CompanyJobsComponent = props => {
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
                    activeLinkID='jobs'
                    company={props.company}
                />
                : null
            }
            <FixedBodyContainer 
                className='subheader-with-links'
                style={{paddingTop: 20, paddingBottom: 20}}
            >
                {!props.loadingCompany && props.company ? 
                    <JobsFeed
                        companyID={props.company._id}
                        companyName={props.company.name}
                    />
                    : <Loading />
                }
            </FixedBodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
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

export const CompanyJobs = connect(mapStateToProps, mapDispatchToProps)(CompanyJobsComponent)