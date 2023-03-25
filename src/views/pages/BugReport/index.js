import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'

export const BugReportComponent = props => {
    const {
        
    } = props
    const {bugReportID} = useParams()

    useEffect(() => {
        // TODO
    }, [bugReportID])


    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Bug Report' />
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const BugReport = connect(mapStateToProps, mapDispatchToProps)(BugReportComponent)