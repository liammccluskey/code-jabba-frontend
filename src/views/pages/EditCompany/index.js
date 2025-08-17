import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { 
    getCompany, 
    getLoadingCompany, 
    getCompanyNotFound,

    fetchCompany
} from '../../../redux/company'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { EditCompanyCard } from '../../components/company/EditCompanyCard'
import { ErrorElement } from '../ErrorElement'
import { Loading } from '../../components/common/Loading'

export const EditCompanyComponent = props => {
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
            <Subheader 
                title={!props.loadingCompany && props.company ? `Edit company - ${props.company.name}` : 'Edit company'} 
            />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0}}>
                {!props.loadingCompany && props.company ?
                    <EditCompanyCard
                        isEditMode={true}
                        company={props.company}
                        style={{marginTop: 40, marginBottom: 40}}
                    />
                    : <Loading style={{height: 200}} />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    company: getCompany(state),
    loadingCompany: getLoadingCompany(state),
    companyNotFound: getCompanyNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCompany
}, dispatch)

export const EditCompany = connect(mapStateToProps, mapDispatchToProps)(EditCompanyComponent)