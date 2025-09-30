import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getJobs,
    getJobsPagesCount,
    fetchJobs,
} from '../../../redux/job'
import { SortFilters } from '../admin/BugReports'

import { PageContainer } from '../../components/common/PageContainer'
import { FixedBodyContainer } from '../../components/common/FixedBodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { JobsFeed } from '../../components/job/JobsFeed'

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
                <JobsFeed />
            </FixedBodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`

`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs
}, dispatch)

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(JobsComponent)