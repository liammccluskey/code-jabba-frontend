import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getJobs,
    getJobsPagesCount,
    fetchJobs,
} from '../../../redux/job'

import { PageContainer } from '../../components/common/PageContainer'
import { FixedBodyContainer } from '../../components/common/FixedBodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { JobsFeed } from '../../components/job/JobsFeed'
import { ErrorLabel } from '../../components/common/ErrorLabel'

const JobLinkErrorNotice = 'NOTICE - If you receive an error ( ex. 403 Forbidden ) when opening links to jobs we recommend using Code Jabba in an Incognito / Private window'

export const JobsComponent = (props) => {
    const {

    } = props

    return (
        <PageContainer>
            <MainHeader />
            <FixedBodyContainer 
                className='no-subheader'
                style={{paddingTop: 20, paddingBottom: 20}}
            >
                <ErrorLabel errorText={JobLinkErrorNotice} />
                <JobsFeed />
            </FixedBodyContainer>
        </PageContainer>
    )
}

const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs
}, dispatch)

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(JobsComponent)