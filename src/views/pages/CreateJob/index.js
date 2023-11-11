import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { EditJobCard } from '../../components/job/EditJobCard'

export const CreateJob = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Create a Job' />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0}}>
                <EditJobCard style={{margingTop: 40, marginBottom: 40}} />
            </BodyContainer>
        </PageContainer>
    )
}