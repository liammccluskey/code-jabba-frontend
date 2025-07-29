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
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { Paginator } from '../../components/common/Paginator'
import { JobCard } from '../../components/job/JobCard'

export const JobsComponent = () => {
    const selectedJobID = useState('')
    const [jobsPage, setJobsPage] = useState(1)
    const [filters, setFilters] = useState({
        positions: [],
        types: [],
        settings: [],
        locations: [],
        includedSkills: [],
        excludedSkills: [],
        includedLanguages: [],
        excludedLanguages: [],
        experienceLevels: [],
        experienceYears: [],
    })
    const [jobsSortFilter, setJobsSortFilter] = useState(SortFilters[0].filter)

    useEffect(() => {
        fetchJobsFirstPage()
    }, [])

    // Utils

    const getJobsFilters = () => ({
        sortBy: jobsSortFilter,
        ...filters,
    })

    const fetchJobsFirstPage = (onSuccess, onFailure) => {
        props.fetchJobs(
            getJobsFilters(), 
            1, 
            () => {
                onSuccess()
                setJobsPage(1)
            }, 
            onFailure
        )
    }

    // Direct

    const onClickJobRow = rowID => {

    }

    const onClickDecrementJobsPage = () => {
        if (jobsPage == 1) return
        else {
            setJobsPage(curr => curr - 1)
        }
    }

    const onClickIncrementJobsPage = (onSuccess, onFailure) => {
        if (jobsPage == props.jobsPagesCount || props.jobsPagesCount == 0) return
        else {
            props.fetchJobs(
                getJobsFilters(), 
                jobsPage + 1,
                () => {
                    setJobsPage(curr => curr + 1)
                    onSuccess()
                },
                onFailure
            )
        }   
    }

    const onChangeFilter = (filterName, filterValue) => {
        setFilters( curr => ({
            ...curr,
            [filterName]: filterValue
        }))
    }

    const onClickApplyFilters = (onSuccess, onFailure) => {
        fetchJobsFirstPage(onSuccess, onFailure)
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Jobs' />
            <BodyContainer>
                <Root>
                    <div className='jobs-container'>
                    </div>

                    <JobCard

                    />
                </Root>
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;


    &. jobs-container {
        height: 100%;
        overflow: scroll;

    }
`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs
}, dispatch)

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(JobsComponent)