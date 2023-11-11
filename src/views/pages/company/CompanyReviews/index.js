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

export const CompanyReviewsComponent = props => {
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
                    activeLinkID='reviews'
                    company={props.company}
                />
                : null
            }
            <BodyContainer>
                {!props.loadingCompany && props.company ?
                    <Root className={`${props.isMobile && 'mobile'}`}>
                        
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

export const CompanyReviews = connect(mapStateToProps, mapDispatchToProps)(CompanyReviewsComponent)