import React, { useEffect} from 'react'
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
import { ErrorElement } from '../ErrorElement'
import { JobCard } from '../../components/job/JobCard'
import { Loading } from '../../components/common/Loading'

export const JobComponent = props => {
    const {jobID} = useParams()

    useEffect(() => {
        props.fetchJob(jobID)
    }, [jobID])


    return (props.jobNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <Subheader title='Job Post' />
            <BodyContainer style={{paddingTop: 0, paddingBottom: 0, overflow: 'scroll'}}>
                {!props.loadingJob && props.job ?
                    <JobCard
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;
    margin: 40px 0px;
`
const mapStateToProps = state => ({
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobNotFound: getJobNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJob
}, dispatch)

export const Job = connect(mapStateToProps, mapDispatchToProps)(JobComponent)