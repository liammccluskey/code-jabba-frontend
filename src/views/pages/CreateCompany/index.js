import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../components/common/PageContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { BodyContainer } from '../../components/common/BodyContainer'
import { EditCompanyCard } from '../../components/company/EditCompanyCard'

export const CreateCompanyComponent = props => {
    const {
        
    } = props
    
    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Create a Company' />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0}}>
                <EditCompanyCard
                    isEditMode={false}
                    style={{marginTop: 40, marginBottom: 40}}
                />
            </BodyContainer>
        </PageContainer>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export const CreateCompany = connect(mapStateToProps, mapDispatchToProps)(CreateCompanyComponent)