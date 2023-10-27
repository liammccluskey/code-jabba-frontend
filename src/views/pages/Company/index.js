import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'

export const CompanyComponent = props => {
    const {
        
    } = props
    const {companyID} = useParams()

    return (
        <PageContainer>
            <MainHeader />
            <BodyContainer>
                <Root>

                </Root>
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const Company = connect(mapStateToProps, mapDispatchToProps)(CompanyComponent)