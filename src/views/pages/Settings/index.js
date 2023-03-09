import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'

export const SettingsComponent = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <MainHeader />
            <Subheader
                title='Settings'
                path='/settings'
            />
            <BodyContainer>

            </BodyContainer>
        </PageContainer>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent)