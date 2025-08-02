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
    getSavedFilters,
    
    fetchJobs,
    fetchJob,
    fetchSavedJobFilters,
    postJobFilter,
    deleteSavedJobFilter,
} from '../../../../redux/job'
import { SortFilters } from '../../../pages/admin/BugReports'
import { 
    PageSizes,
    getPaginatedDataForCurrentPage
} from '../../../../networking'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import { addMessage } from '../../../../redux/communication'
import { getSelectedFilter, removeMiscFilterKeys } from '../modals/JobFiltersModal/utils'

import {JobCard} from '../JobCard'
import { Paginator } from '../../common/Paginator'
import { Loading } from '../../common/Loading'
import { JobFeedCard } from '../JobFeedCard'
import { Button } from '../../common/Button'
import { Tooltip } from '../../common/Tooltip'

export const InitialJobFilters = {
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
}

export const JobsFeedComponent = props => {
    const {
        ...rest
    } = props

    // State

    const [jobsPage, setJobsPage] = useState(1)
    const [selectedJobID, setSelectedJobID] = useState('')
    const [filters, setFilters] = useState(InitialJobFilters)
    const [jobsSortFilter, setJobsSortFilter] = useState(SortFilters[0].filter)
    const jobsForCurrentPage = useMemo(() => {
        return props.loadingJobs ? [] :
            getPaginatedDataForCurrentPage(props.jobs, jobsPage, PageSizes.jobSearch)
    }, [props.jobs, jobsPage])
    const selectedSavedFilterID = useMemo(() => {
        const selectedFilter = getSelectedFilter(filters, props.savedFilters, true)
        return selectedFilter ? selectedFilter._id : undefined
    }, [filters, props.savedFilters])

    useEffect(() => {
        props.fetchSavedJobFilters()
    }, [])

    useEffect(() => {
        fetchJobsFirstPage(undefined, undefined, undefined, false)
    }, [jobsSortFilter, filters])

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

    const fetchJobsFirstPage = (
        onSuccess = () => {}, 
        onFailure = () => {}, 
        {updatedFilters=getJobsFilters()} = {},
        updateFilters=true
    ) => {
        props.fetchJobs(
            getJobsFilters(updatedFilters), 
            1,
            () => {
                onSuccess()
                setJobsPage(1)
            },
            onFailure
        )
        updateFilters && setFilters(updatedFilters)
    }

    const getFiltersCount = () => {
        const strippedCurrentFilter = removeMiscFilterKeys(filters, true)
        return Object.entries(strippedCurrentFilter)
            .filter(([key, value]) => value.length > 0)
            .length
    }

    const getFilterDescriptionText = () => {
        if (selectedSavedFilterID) {
            return getSelectedFilter(filters, props.savedFilters).title
        } else {
            const filtersCount = getFiltersCount()
            return `${filtersCount} filter${filtersCount == 1 ? '' : 's'} selected`
        }
    }

    const addDeleteFilterModal = (filterID, updateFilters=false, showSuccessMessage=true) => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Unsave filter',
            message: 'Are you sure you want to unsave this filter?',
            confirmButtonTitle: 'Unsave',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => {
                const onDeleteSuccess = () => {
                    updateFilters && setFilters(InitialJobFilters)
                    props.fetchSavedJobFilters(onSuccess)
                }
                
                props.deleteSavedJobFilter(filterID, onDeleteSuccess, onFailure, showSuccessMessage)
            }
        })
    }

    // Direct

    const onClickAddFilters = () => {
        props.addModal(ModalTypes.JOB_FILTERS, {
            initialFilters: filters,
            onClickApply: onClickApplyFilters,
            onClickDeleteFilter: (filterID, updateFilters) => addDeleteFilterModal(filterID, updateFilters, false)
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

    const onClickSaveFilter = () => {
        if (!getFiltersCount()) {
            props.addMessage('You must apply at least one filter to save it', true)
            return
        }

        if (selectedSavedFilterID) {
            addDeleteFilterModal(selectedSavedFilterID, true)
        } else {
            props.addModal(ModalTypes.SAVE_FILTER, {
                onSave: (onSuccess, onFailure, filterTitle) => {
                    props.postJobFilter(
                        filterTitle,
                        filters,
                        () => props.fetchSavedJobFilters(onSuccess),
                        onFailure
                    )
                }
            })
        }
    }

    const onClickApplyFilters = (
        onSuccess,
        onFailure = () => {},
        {updatedFilters=getJobsFilters()} = {}
    ) => {
        setFilters(updatedFilters)
        onSuccess()
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
                            {getFilterDescriptionText()}
                        </p>
                        <Tooltip
                            title={selectedSavedFilterID ? 'Unsave this filter' : 'Save this filter'}
                        >
                            <i 
                                className={selectedSavedFilterID ? 'bi-star-fill save-icon' : 'bi-star save-icon'} 
                                style={{marginLeft: 10}}
                                onClick={onClickSaveFilter}
                            />
                        </Tooltip>
                    </div>
                    <Button
                        title='Search'
                        onClick={() => fetchJobsFirstPage()}
                        priority={2}
                        type='solid'
                        style={{marginLeft: 15}}
                    />
                </div>
                <select value={jobsSortFilter} onChange={onChangeSortFilter} className='select-solid'>
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

    & .save-icon {
        font-size: 20px;
        color: ${p => p.theme.tint};
        border-radius: 15px;
    }
    & .save-icon:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }
`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
    loadingJobs: getLoadingJobs(state),
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    savedFilters: getSavedFilters(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJobs,
    fetchJob,
    fetchSavedJobFilters,
    postJobFilter,
    deleteSavedJobFilter,
    addModal,
    addMessage
}, dispatch)

export const JobsFeed = connect(mapStateToProps, mapDispatchToProps)(JobsFeedComponent)