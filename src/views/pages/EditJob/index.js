import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import {
    getJob,
    getLoadingJob,
    getJobNotFound,

    fetchJob
} from '../../../redux/job'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { EditJobCard } from '../../components/job/EditJobCard'
import { ErrorElement } from '../ErrorElement'
import { Loading } from '../../components/common/Loading'

export const EditJobComponent = props => {
    const {
        
    } = props
    const {jobID} = useParams()

    return ( props.jobNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <Subheader title='Edit job' />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0}}>
                {!props.loadingJob && props.job ?
                    <EditJobCard
                        isEditMode={true}
                        job={props.job}
                        style={{marginTop: 40, marginBottom: 40}}
                    />
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobNotFound: getJobNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJob
}, dispatch)

export const EditJob = connect(mapStateToProps, mapDispatchToProps)(EditJobComponent)