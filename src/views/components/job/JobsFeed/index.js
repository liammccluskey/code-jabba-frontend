import React, {useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getJobs,
    getJobsPagesCount,
    getLoadingJobs,
    getJob,
    getLoadingJob,
    
    fetchJobs,
    fetchJob,
} from '../../../../redux/job'
import { SortFilters } from '../../../pages/admin/BugReports'
import { 
    PageSizes,
    getPaginatedDataForCurrentPage
} from '../../../../networking'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'

import {JobCard} from '../JobCard'
import { Paginator } from '../../common/Paginator'
import { Loading } from '../../common/Loading'
import { JobFeedCard } from '../JobFeedCard'
import { Button } from '../../common/Button'

export const JobsFeedComponent = props => {
    const {
        ...rest
    } = props

    // State

    const [jobsPage, setJobsPage] = useState(1)
    const [selectedJobID, setSelectedJobID] = useState('')
    const [filters, setFilters] = useState({
        settings: [],
        locations: [],
        types: [],
        positions: [],
        experienceLevels: [],
        experienceYears: [],
        includedSkills: [],
        excludedSkills: [],
        includedLanguages: [],
        excludedLanguages: [],
    })
    const [jobsSortFilter, setJobsSortFilter] = useState(SortFilters[0].filter)
    const jobsForCurrentPage = useMemo(() => {
        return props.loadingJobs ? [] :
            getPaginatedDataForCurrentPage(props.jobs, jobsPage, PageSizes.jobSearch)
    }, [props.jobs, jobsPage])

    const filtersCount = Object.entries(filters)
        .filter(([key, value]) => value.length > 0 && key !== 'sortBy')
        .length

    useEffect(() => {
        fetchJobsFirstPage()
    }, [jobsSortFilter])

    useEffect(() => {
        selectedJobID && props.fetchJob(selectedJobID)
    }, [selectedJobID, props.jobs])

    useEffect(() => {
        setSelectedJobID(jobsForCurrentPage.length ? jobsForCurrentPage[0]._id : '')
    }, [props.jobs, jobsPage])

    // Utils

    const getJobsFilters = (updatedFilters = {}) => ({
        ...filters,
        ...updatedFilters,
        sortBy: jobsSortFilter,
    })

    const fetchJobsFirstPage = (onSuccess = () => {}, onFailure = () => {}, updatedFilters=getJobsFilters()) => {
        props.fetchJobs(
            getJobsFilters(updatedFilters), 
            1, 
            () => {
                onSuccess()
                setJobsPage(1)
            },
            onFailure
        )
        setFilters(updatedFilters)
    }

    // Direct

    const onClickAddFilters = () => {
        props.addModal(ModalTypes.JOB_FILTERS, {
            initialFilters: filters,
            onClickSave: fetchJobsFirstPage,
        })
    }

    const onChangeSortFilter = e => {
        setJobsSortFilter(e.target.value)
    }

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
        if (jobsPage == props.jobsPagesCount || props.jobsPagesCount == 0) return
        else {
            props.fetchJobs(
                getJobsFilters(), 
                jobsPage + 1,
                () => setJobsPage(curr => curr + 1),
            )
        }   
    }

    return (
        <Root {...rest}>
            <div className='search-container'>
                <div className='search-left-container'>
                    <div className='filters-container'>
                        <Button
                            title='Add filters'
                            onClick={onClickAddFilters}
                            priority={3}
                            type='clear'
                        />
                        <p className='filter-text'>
                            {`${filtersCount} filter${filtersCount == 1 ? '' : 's'} selected`}
                        </p>
                    </div>
                    <Button
                        title='Search'
                        onClick={() => fetchJobsFirstPage()}
                        priority={2}
                        type='solid'
                        style={{marginLeft: 15}}
                    />
                </div>

                <select value={jobsSortFilter} onChange={onChangeSortFilter}>
                    {SortFilters.map(({title, filter}) => (
                        <option value={filter} key={filter}>{title}</option>
                    ))}
                </select>
            </div>
            <div className='jobs-feed-container'>
                <div className='feed-container'>
                    <div className='jobs-container float-container'>
                        {jobsForCurrentPage.map( job => (
                            <JobFeedCard
                                job={job}
                                onClick={() => onClickJob(job._id)}
                                key={job._id}
                                selected={selectedJobID === job._id}
                            />
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
                {!props.loadingJob && props.job && selectedJobID ? 
                    <JobCard 
                        job={props.job}
                        className='job-card'
                    />
                    : selectedJobID ? 
                        <div className='loading-jobs-container'>
                            <Loading style={{height: 50}} />
                        </div>
                    : <div className='no-results-container'>
                        <h3>No results</h3>
                    </div>
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    & .search-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        box-sizing: border-box;
        height: 50px;
    }

    & .search-left-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    & .filters-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border: 1px solid ${p => p.theme.bc};
        border-radius: 5px;
    }

    & .filter-text {
        margin-left: 10px;
    }

    & .jobs-feed-container {
        width: 100%;
        min-height: calc(100% - 70px);
        max-height: calc(100% - 70px);
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex: 1;
    }

    & .feed-container {
        display: flex;
        flex-direction :column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: hidden !important;
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

    & .no-results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }
`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
    loadingJobs: getLoadingJobs(state),
    job: getJob(state),
    loadingJob: getLoadingJob(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs,
    fetchJob,
    addModal
}, dispatch)

export const JobsFeed = connect(mapStateToProps, mapDispatchToProps)(JobsFeedComponent)