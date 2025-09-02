import React, {useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getJobs,
    getJobsPagesCount,
    getLoadingJobs,
    getJob,
    getLoadingJob,
    getJobsCount,
    getSavedFilters,
    
    fetchJobs,
    fetchJob,
    fetchSavedJobFilters,
    postJobFilter,
    deleteSavedJobFilter,
} from '../../../../redux/job'
import { 
    PageSizes,
    getPaginatedDataForCurrentPage
} from '../../../../networking'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { addModal } from '../../../../redux/modal'
import { addMessage } from '../../../../redux/communication'
import { getSelectedFilter, getFiltersCount } from '../modals/JobFiltersModal/utils'
import { getIsCandidatePremiumUser } from '../../../../redux/user'
import { SubscriptionTiersFormatted } from '../../../../redux/user'
import { formatNumber, formatUnit } from '../../../../utils'

import {JobCard} from '../JobCard'
import { Paginator } from '../../common/Paginator'
import { Loading } from '../../common/Loading'
import { JobFeedCard } from '../JobFeedCard'
import { Button } from '../../common/Button'
import { Tooltip } from '../../common/Tooltip'

export const DatePostedOptions = [
    {id: 'past-day', title: 'Past day'},
    {id: 'past-week', title: 'Past week'},
    {id: 'past-month', title: 'Past month'},
]
export const DatePostedOptionsDict = {
    ['past-day']: 'Past day',
    ['past-week']: 'Past week',
    ['past-month']: 'Past month',
}

export const InitialJobFilters = {
    datePosted: 'anytime', // anytime | past-day | past-week | past-month
    settings: [],
    locations: [],
    employmentTypes: [],
    positions: [],
    experienceLevels: [],
    experienceYears: [],
    includedSkills: [],
    excludedSkills: [],
    includedLanguages: [],
    excludedLanguages: [],
    salaryMin: '0',
}

const JobSortFilters = [
    {title: 'Most Recent', filter: '-postedAt'},
    {title: 'Least Recent', filter: '+postedAt'}
]

export const JobsFeedComponent = props => {
    const {
        companyID=null,
        companyName='',

        ...rest
    } = props
    const navigate = useNavigate()

    // State

    const [jobsPage, setJobsPage] = useState(1)
    const [selectedJobID, setSelectedJobID] = useState('')
    const [filters, setFilters] = useState(InitialJobFilters)
    const [jobsSortFilter, setJobsSortFilter] = useState(JobSortFilters[0].filter)
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
    }, [jobsSortFilter, filters, companyID])

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
        ...(companyID ? {companyID} : {})
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

    const getFilterDescriptionText = () => {
        if (selectedSavedFilterID) {
            return getSelectedFilter(filters, props.savedFilters).title + 
                (companyName ? ` & company=${companyName}` : '')
        } else {
            const filtersCount = getFiltersCount(filters)
            return `${filtersCount} ${formatUnit('filter', filtersCount)} selected` + 
                (companyName ? ` & company=${companyName}` : '')
        }
    }

    const addDeleteFilterModal = (filterID, updateFilters=false, showSuccessMessage=true) => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete filter',
            message: 'Are you sure you want to delete this filter?',
            confirmButtonTitle: 'Delete',
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

    const addCantSaveFiltersModal = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: "Can't save filters",
            message: `If you want to save filter combinations you must upgrade to ${SubscriptionTiersFormatted.candidatePremium}`,
            confirmButtonTitle: 'Go premium',
            onConfirm: onSuccess => {
                navigate('/membership/premium')
                onSuccess()
            },
        })
    }

    // Direct

    const onClickAddFilters = () => {
        props.addModal(ModalTypes.JOB_FILTERS, {
            initialFilters: filters,
            navigateToPremiumPage: () => navigate('/membership/premium'),
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
        if (!props.isCandidatePremiumUser) {
            addCantSaveFiltersModal()
            return
        }
        if (!getFiltersCount(filters)) {
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
                            title={selectedSavedFilterID ? 'Delete this filter' : 'Save this filter'}
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
                        style={{marginLeft: 15, marginRight: 15}}
                    />
                    <p className='results-count-text'>
                        {`${formatNumber(props.jobsCount)} ${formatUnit('result', props.jobsCount)}`}
                    </p>
                </div>
                <select 
                    value={jobsSortFilter} 
                    onChange={onChangeSortFilter} 
                    className='solid'
                >
                    {JobSortFilters.map(({title, filter}) => (
                        <option value={filter} key={filter}>{title}</option>
                    ))}
                </select>
            </div>
            {!props.loadingJobs ? 
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
                : <div className='loading-jobs-container'>
                    <Loading style={{height: 50}} />
                </div>
            }
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
        max-height: 63px;
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
        overflow: scroll !important;
        margin-bottom: 20px;
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

    & .results-count-text {
        color: ${p => p.theme.textSecondary};
    }
`
const mapStateToProps = state => ({
    jobs: getJobs(state),
    jobsPagesCount: getJobsPagesCount(state),
    loadingJobs: getLoadingJobs(state),
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobsCount: getJobsCount(state),
    savedFilters: getSavedFilters(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
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