import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getJobs,
    getJobsPagesCount,
    getLoadingJobs,
    
    fetchJobs,
} from '../../../../redux/job'
import { SortFilters } from '../../../pages/admin/BugReports'
import { 
    PageSizes,
    getPaginatedDataForCurrentPage
} from '../../../../networking'

import {JobCard} from '../JobCard'
import { Paginator } from '../../common/Paginator'
import { Loading } from '../../common/Loading'

export const JobsFeedComponent = props => {
    const {
        ...rest
    } = props

    const [jobsPage, setJobsPage] = useState(1)
    const [selectedJobID, setSelectedJobID] = useState('')
    const [selectedJobIndex, setSelectedJobIndex] = useState(0)
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

    const jobsForCurrentPage = props.loadingJobs ? [] :
        getPaginatedDataForCurrentPage(props.jobs, jobsPage, PageSizes.jobSearch)

    useEffect(() => {
        fetchJobsFirstPage()
    }, [])

    useEffect(() => {
        setSelectedJobIndex(props.jobs.findIndex(job => job._id === selectedJobID))
    }, [selectedJobID])

    useEffect(() => {
        setSelectedJobIndex(PageSizes.jobSearch * (jobsPage - 1))
    }, [jobsPage])

    // Utils

    const getJobsFilters = () => ({
        sortBy: jobsSortFilter,
        ...filters,
    })

    const fetchJobsFirstPage = () => {
        props.fetchJobs(
            getJobsFilters(), 
            1, 
            () => setJobsPage(1)
        )
    }

    // Direct

    const onClickJob = rowID => {
        setSelectedJobID(rowID)
    }

    const onClickDecrementJobsPage = () => {
        if (jobsPage == 1) return
        else {
            setJobsPage(curr => curr - 1)
        }
    }

    const onClickIncrementJobsPage = () => {
        console.log(JSON.stringify(
            {jobsPage, pagesCount: props.jobsPagesCount}
        , null, 4))
        if (jobsPage == props.jobsPagesCount || props.jobsPagesCount == 0) return
        else {
            props.fetchJobs(
                getJobsFilters(), 
                jobsPage + 1,
                () => setJobsPage(curr => curr + 1),
            )
        }   
    }

    const onClickApplyFilters = (onSuccess, onFailure) => {
        fetchJobsFirstPage(onSuccess, onFailure)
    }

    return (
        <Root {...rest}>
            <div className='filters-container'>

            </div>
            <div className='jobs-feed-container'>
                <div className='feed-container'>
                    <div className='jobs-container float-container'>
                        {jobsForCurrentPage.map( job => (
                            <div 
                                className='job-container oh-dark' 
                                key={job._id}
                                onClick={() => onClickJob(job._id)}
                            >
                                <p>{job.title}</p>
                            </div>
                        ))}
                    </div>
                    <Paginator
                        page={jobsPage}
                        pagesCount={props.jobsPagesCount}
                        onClickDecrementPage={onClickDecrementJobsPage}
                        onClickIncrementPage={onClickIncrementJobsPage}
                        className='paginator'
                    />
                </div>
                {!props.loadingJobs && props.jobs[selectedJobIndex] ? 
                    <JobCard 
                        job={props.jobs[selectedJobIndex]}
                        className='job-card'
                    />
                    : <div className='loading-jobs-container'>
                        <Loading style={{height: 50}} />
                    </div>
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;

    & .filters-container {
        
    }

    & .jobs-feed-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
    }

    & .feed-container {
        display: flex;
        flex-direction :column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: scroll !important;
        width: 350px;
        min-width: 350px;
        margin-right: 30px;
    }


    & .jobs-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        overflow: scroll;
        margin-bottom: 20px;
    }

    & .job-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .job-card {
        display: flex;
        height: 100%;
        box-sizing: border-box;
        overflow: scroll !important;
        flex: 1 !important;
    }

    & .paginator {
        align-self: center;
    }

    & .loading-jobs-container {
        display: flex;
        flex: 1;
        algn-items: center;
        justify-content: space-around;
    }
    
`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
    loadingJobs: getLoadingJobs(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs,
}, dispatch)

export const JobsFeed = connect(mapStateToProps, mapDispatchToProps)(JobsFeedComponent)