import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../../components/common/PageContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { BodyContainer } from '../../../components/common/BodyContainer'

export const AdminAnalyticsComponent = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <MainHeader />
            <AdminHeader activeLinkID='analytics' />
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const AdminAnalytics = connect(mapStateToProps, mapDispatchToProps)(AdminAnalyticsComponent)