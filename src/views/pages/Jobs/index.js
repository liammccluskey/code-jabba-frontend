import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'

export const JobsComponent = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <MainHeader hasSubheaderBelow={false}/>
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

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(JobsComponent)