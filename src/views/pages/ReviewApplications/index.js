import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { getMongoUser } from '../../../redux/user'
import { getIsRecruiterMode } from '../../../redux/user'
import {
    getJob,
    getLoadingJob,
    getJobNotFound,

    fetchJob,
} from '../../../redux/job'
import {
    getApplications,
    getLoadingApplications,
    getApplicationsPage,
    getApplicationsPagesCount,
    getApplicationsFilters,

    fetchApplications,
    setApplicationsPage,
} from '../../../redux/application'

import { PageContainer } from '../../components/common/PageContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { ErrorElement } from '../ErrorElement'
import { FixedBodyContainer } from '../../components/common/FixedBodyContainer'

export const ReviewApplicationsComponent = props => {
    const {
        
    } = props
    const {jobID} = useParams()

    useEffect(() => {
        props.fetchJob(jobID)
    }, [jobID])

    return (
        !props.loadingJob && 
        props.job && 
        ( !props.isRecruiterMode || 
        props.job.recruiter._id !== props.mongoUser._id) ||
        props.jobNotFound ? 
            <ErrorElement />
        : <PageContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobNotFound: getJobNotFound(state),
    applications: getApplications(state),
    loadingApplications: getLoadingApplications(state),
    applicationsPage: getApplicationsPage(state),
    applicationsPagesCount: getApplicationsPagesCount(state),
    isRecruiterMode: getIsRecruiterMode(state),
    mongoUser: getMongoUser(state),
    applicationsFilters: getApplicationsFilters(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJob,
    fetchApplications,
    setApplicationsPage,
}, dispatch)

export const ReviewApplications = connect(mapStateToProps, mapDispatchToProps)(ReviewApplicationsComponent)