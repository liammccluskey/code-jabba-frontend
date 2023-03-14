import React from 'react'
import styled from 'styled-components'


import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'

export const Loading = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <LandingHeader showButtons={false} />
            <BodyContainer>
                
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    
`