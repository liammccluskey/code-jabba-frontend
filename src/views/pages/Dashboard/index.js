import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import {
    getPaginatedDataForCurrentPage,
    PageSizes
} from '../../../networking'
import {
    getIsMobile,
    getIsSemiMobile
} from '../../../redux/theme'
import {
    getMongoUser,
    getIsRecruiterMode
} from '../../../redux/user'
import {
    getRecruiterApplicationStats,
    getLoadingRecruiterApplicationStats,
    getCandidateApplicationStats,
    getLoadingCandidateApplicationStats,
    getRecruiterCompanies,
    getLoadingRecruiterCompanies,
    getRecruiterCompaniesPagesCount,
    getRecruiterJobs,
    getLoadingRecruiterJobs,
    getRecruiterJobsPagesCount,
    getApplications,
    getLoadingApplications,
    getApplicationsPagesCount,
    getLoadingCandidateApplicationsHeatmap,
    getLoadingRecruiterApplicationsHeatmap,
    getCandidateApplicationsHeatmap,
    getRecruiterApplicationsHeatmap,

    fetchRecruiterCompanies,
    fetchRecruiterJobs,
    fetchApplicationStats,
    fetchApplications,
    fetchApplicationsHeatmap,
} from '../../../redux/dashboard'
import { formatNumber } from '../../../utils'
import { setApplicationsPage } from '../../../redux/application'
import { addModal } from '../../../redux/modal'
import { ModalTypes } from '../../../containers/ModalProvider'
import { SortFilters } from '../admin/BugReports'
import { capitalizeWords } from '../../../utils'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Button } from '../../components/common/Button'
import { SearchableTable } from '../../components/common/SearchableTable'
import { Loading } from '../../components/common/Loading'
import { ValueDeltaSpread } from '../../components/common/ValueDeltaSpread'
import { YearHeatmap } from '../../components/common/YearHeatmap'

export const Timeframes = ['Week', 'Month', 'Year']
const JobsSortFilters = SortFilters
const ApplicationsSortFilters = SortFilters

export const DashboardComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    // recruiter
    const [companiesPage, setCompaniesPage] = useState(1)
    const [companySearchText, setCompanySearchText] = useState('')
    const [jobsPage, setJobsPage] = useState(1)
    const [jobSearchText, setJobSearchText] = useState('')
    const [jobsSortFilter, setJobsSortFilter] = useState(JobsSortFilters[0].filter)
    // candidate
    const [applicationsPage, setApplicationsPage] = useState(1)
    const [applicationsSortFilter, setApplicationsSortFilter] = useState(ApplicationsSortFilters[0].filter)
    const [data, setData] = useState({
        // recruiter
        recruiterApplicationTimeframe: Timeframes[1],
        companyAdminPillActive: false,
        jobActivePillActive: true,
        jobArchivedPillActive: false,

        // candidate
        candidateApplicationTimeframe: Timeframes[1],
        applicationAppliedPillActive: false,
        applicationViewedPillActive: false,
        applicationRejectedPillActive: false,
        applicationAcceptedPillActive: false,
        applicationArchivedPillActive: false,
    })

    const companyHeaders = ['Name', 'Role']
    const companyRows = !props.loadingRecruiterCompanies ?
        getPaginatedDataForCurrentPage(props.recruiterCompanies, companiesPage, PageSizes.companySearch).map(({name, admins, _id}) =>({
            id: _id,
            cells: [name, admins.includes(props.mongoUser._id )? 'Admin' : 'Recruiter']
        })) : []

    const jobHeaders = ['Title', 'Company', 'Status', 'Date Posted']
    const jobRows = !props.loadingRecruiterJobs ?
        getPaginatedDataForCurrentPage(props.recruiterJobs, jobsPage, PageSizes.jobSearch).map(({title, archived, company, createdAt, _id}) =>({
            id: _id,
            cells: [title,company ?  company.name : 'no name', archived ? 'Archived' : 'Active', moment(createdAt).format('ll')]
        })) : []

    const applicationHeaders = ['Title', 'Company', 'Status', 'Date Submitted']
    const applicationsRows = !props.loadingApplications ?
        getPaginatedDataForCurrentPage(props.applications, applicationsPage, PageSizes.candidateApplicationSearch).map(({job, status, createdAt, archived, _id}) =>({
            id: _id,
            cells: [job.title, job.company ? job.company.name : 'no name', archived ? 'Archived' : capitalizeWords(status), moment(createdAt).format('ll')]
        })) : []

    const companyPills = [
        {title: 'Admin', id: 'companyAdmin', active: data.companyAdminPillActive},
    ]
    const jobPills = [
        {title: 'Active', id: 'jobActive', active: data.jobActivePillActive},
        {title: 'Archived', id: 'jobArchived', active: data.jobArchivedPillActive},
    ]
    const applicationPills = [
        {title: 'Applied', id: 'applicationApplied', active: data.applicationAppliedPillActive},
        {title: 'Viewed', id: 'applicationViewed', active: data.applicationViewedPillActive},
        {title: 'Rejected', id: 'applicationRejected', active: data.applicationRejectedPillActive},
        {title: 'Accepted', id: 'applicationAccepted', active: data.applicationAcceptedPillActive},
        {title: 'Archived', id: 'applicationArchived', active: data.applicationArchivedPillActive}
    ]

    const recruiterApplicationMetrics = [
        {title: 'Applications submitted', value: props.recruiterApplicationStats.submittedCount, percentDelta: props.recruiterApplicationStats.submittedPercentDelta},
        {title: 'Applications viewed', value: props.recruiterApplicationStats.viewedCount, percentDelta: props.recruiterApplicationStats.viewedPercentDelta},
        {title: 'Applications rejected', value: props.recruiterApplicationStats.rejectedCount, percentDelta: props.recruiterApplicationStats.rejectedPercentDelta},
        {title: 'Applications accepted', value: props.recruiterApplicationStats.acceptedCount, percentDelta: props.recruiterApplicationStats.acceptedPercentDelta},
    ]

    const candidateApplicationMetrics = [
        {title: 'Submitted', value: props.candidateApplicationStats.submittedCount, percentDelta: props.candidateApplicationStats.submittedPercentDelta},
        {title: 'Viewed', value: props.candidateApplicationStats.viewedCount, percentDelta: props.candidateApplicationStats.viewedPercentDelta},
        {title: 'Rejected', value: props.candidateApplicationStats.rejectedCount, percentDelta: props.candidateApplicationStats.rejectedPercentDelta},
        {title: 'Accepted', value: props.candidateApplicationStats.acceptedCount, percentDelta: props.candidateApplicationStats.acceptedPercentDelta},
    ]

    const showRequirementsModal = () => props.addModal(ModalTypes.CONFIRM, {
        title: props.isRecruiterMode ? 'Job post requirements' : 'Application requirements',
        message: props.isRecruiterMode ? 'You must complete the todo items before you can post jobs.' : 'You must complete the todo items before you can apply to jobs.',
        confirmButtonTitle: 'Go to dashboard',
        onConfirm: onSuccess => {
            navigate('/dashboard')
            onSuccess()
        }
    })

    const canPerformAction = () => {
        if (props.isRecruiterMode) {
            return props.mongoUser.canPostJobs
        } else {
            return props.mongoUser.canApplyToJobs
        }
    }

    useEffect(() => {
        !canPerformAction() && showRequirementsModal()
    }, [])

    useEffect(() => {
        props.fetchApplicationsHeatmap()
    }, [props.isRecruiterMode])

    useEffect(() => {
        fetchCompaniesFirstPage()
    }, [data.companyAdminPillActive, props.isRecruiterMode])

    useEffect(() => {
        fetchJobsFirstPage()
    }, [data.jobActivePillActive, data.jobArchivedPillActive, jobsSortFilter, props.isRecruiterMode])

    useEffect(() => {
        !props.isRecruiterMode && fetchApplicationsFirstPage()
    }, [
        data.applicationAppliedPillActive,
        data.applicationViewedPillActive, 
        data.applicationRejectedPillActive, 
        data.applicationAcceptedPillActive,
        data.applicationArchivedPillActive, 
        applicationsSortFilter, 
        props.isRecruiterMode
    ])

    useEffect(() => {
        props.fetchApplicationStats(
            props.isRecruiterMode ? data.recruiterApplicationTimeframe : data.candidateApplicationTimeframe
        )
    }, [props.isRecruiterMode, data.recruiterApplicationTimeframe, data.candidateApplicationTimeframe])

    // Utils

    const updatePill = (pillID, pillActive) => {
        const fieldName = pillID + 'PillActive'

        setData(curr => ({
            ...curr,
            [fieldName]: pillActive === undefined ? !curr[fieldName] : pillActive
        }))
    }

    const getCompaniesFilters = () => {
        return {
            ...(data.companyAdminPillActive ? {isAdmin: true} : {}),
        }
    }

    const fetchCompaniesFirstPage = () => {
        props.fetchRecruiterCompanies(getCompaniesFilters(), companySearchText, 1) 
        setCompaniesPage(1)
    }

    const getJobsFilters = () => {
        return{
            ...(data.jobActivePillActive ? {archived: false} : {}),
            ...(data.jobArchivedPillActive ? {archived: true} : {}),
            sortBy: jobsSortFilter
        }
    }

    const fetchJobsFirstPage = () => {
        props.fetchRecruiterJobs(getJobsFilters(), jobSearchText, 1)
        setJobsPage(1)
    }

    const getApplicationsFilters = () => {
        return {
            ...(data.applicationAppliedPillActive ? {status: 'applied'} : {}),
            ...(data.applicationViewedPillActive ? {status: 'viewed'} : {}),
            ...(data.applicationRejectedPillActive ? {status: 'rejected'} : {}),
            ...(data.applicationAcceptedPillActive ? {status: 'accepted'} : {}),
            ...(data.applicationArchivedPillActive ? {archived: true} : {}),
            sortBy: applicationsSortFilter
        }
    }

    const fetchApplicationsFirstPage = () => {
        props.fetchApplications(getApplicationsFilters(), 1)
        setApplicationsPage(1)
    }

    // Direct
    
    const onChangeCompanySearchText = e => {
        setCompanySearchText(e.target.value)
    }

    const onSubmitCompanySearch = e => {
        e.preventDefault()
        fetchCompaniesFirstPage()
    }

    const onChangeJobSearchText = e => {
        setJobSearchText(e.target.value)
    }

    const onSubmitJobSearch = e => {
        e.preventDefault()
        fetchJobsFirstPage()
    }

    const onClickPill = pillID => {
        switch (pillID) {
            case 'companyAdmin':
            case 'applicationArchived':
                updatePill(pillID)
                break
            case 'jobActive':
                updatePill(pillID)
                updatePill('jobArchived', false)
                break
            case 'jobArchived':
                updatePill(pillID)
                updatePill('jobActive', false)
                break
            case 'applicationApplied':
                updatePill(pillID)
                updatePill('applicationViewed', false)
                updatePill('applicationRejected', false)
                updatePill('applicationAccepted', false)
                break
            case 'applicationViewed':
                updatePill(pillID)
                updatePill('applicationApplied', false)
                updatePill('applicationRejected', false)
                updatePill('applicationAccepted', false)
                break
            case 'applicationRejected':
                updatePill(pillID)
                updatePill('applicationApplied', false)
                updatePill('applicationViewed', false)
                updatePill('applicationAccepted', false)
                break
            case 'applicationAccepted':
                updatePill(pillID)
                updatePill('applicationApplied', false)
                updatePill('applicationViewed', false)
                updatePill('applicationRejected', false)
                break
        }
    }

    const onChangeField = e => {
        const {name, value} = e.target

        setData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickCreateCompany = () => {
        navigate('/create-company')
    }

    const onClickCreateJob = () => {
        navigate('/create-job')
    }

    const onClickCompanyRow = rowID => {
        navigate(`/companies/${rowID}`)
    }

    const onClickDecrementCompaniesPage = () => {
        if (companiesPage == 1) return
        else {
            setCompaniesPage(curr => curr - 1)
        }
    }

    const onClickIncrementCompaniesPage = () => {
        if (companiesPage == props.recruiterCompaniesPagesCount || props.recruiterCompaniesPagesCount == 0) return
        else {
            props.fetchRecruiterCompanies(getCompaniesFilters(), companySearchText, companiesPage + 1)
            setCompaniesPage(curr => curr + 1)
        }   
    }

    const onClickJobRow = rowID => {
        props.setApplicationsPage(1)
        navigate(`/applications/${rowID}`)
    }

    const onClickDecrementJobsPage = () => {
        if (jobsPage == 1) return
        else {
            setJobsPage(curr => curr - 1)
        }
    }

    const onClickIncrementJobsPage = () => {
        if (jobsPage == props.recruiterJobsPagesCount || props.recruiterJobsPagesCount == 0) return
        else {
            props.fetchRecruiterJobs(getJobsFilters(), jobSearchText, jobsPage + 1)
            setJobsPage(curr => curr + 1)
        }   
    }

    const onClickApplicationRow = rowID => {
        navigate(`/candidate-applications/${rowID}`)
    }

    const onClickDecrementApplicationsPage = () => {
        if (applicationsPage == 1) return
        else {
            setApplicationsPage(curr => curr - 1)
        }
    }

    const onClickIncrementApplicationsPage = () => {
        if (applicationsPage == props.applicationsPagesCount || props.applicationsPagesCount == 0) return
        else {
            props.fetchApplications(getApplicationsFilters(), applicationsPage + 1)
            setApplicationsPage(curr => curr + 1)
        }   
    }

    const onChangeSortFilter = (e, table) => {
        switch (table) {
            case 'jobs':
                setJobsSortFilter(e.target.value)
                break
            case 'applications':
                setApplicationsSortFilter(e.target.value)
                break
        }
    }

    const onClickFindJobs = () => {
        navigate('/jobs-feed')
    }

    const onClickEditResume = () => {
        props.addModal(ModalTypes.EDIT_RESUME)
    }

    const onClickEditGeneral = () => {
        props.addModal(ModalTypes.EDIT_GENERAL)
    }

    const onClickEditSocials = () => {
        props.addModal(ModalTypes.EDIT_SOCIALS)
    }

    const onClickEditLanguages = () => {
        props.addModal(ModalTypes.EDIT_LANGUAGES)
    }

    const onClickEditSkills = () => {
        props.addModal(ModalTypes.EDIT_SKILLS)
    }

    const onClickEditEducation = () => {
        props.addModal(ModalTypes.EDIT_EDUCATION, {isEditMode: false})
    }

    const onClickEditProjects = () => {
        props.addModal(ModalTypes.EDIT_PROJECT, {isEditMode: false})
    }

    const onClickEditQuestions = () => {
        props.addModal(ModalTypes.EDIT_QUESTIONS)
    }

    const todoItems = props.isRecruiterMode ?
        [
            [
                {number: 1, title: 'Complete general information', onClick: onClickEditGeneral, isComplete: props.mongoUser.generalCompleted},
                {number: 3, title: 'Upload at least 1 education', onClick: onClickEditEducation, isComplete: props.mongoUser.educationCompleted}
            ],
            [
                {number: 2, title: 'Complete socials information', onClick: onClickEditSocials, isComplete: props.mongoUser.socialsCompleted},
            ]
        ]
        : props.isSemiMobile ?
            [
                [
                    {number: 1, title: 'Upload resume', onClick: onClickEditResume, isComplete: props.mongoUser.resumeCompleted},
                    {number: 3, title: 'Complete socials', onClick: onClickEditSocials, isComplete: props.mongoUser.socialsCompleted},
                    {number: 5, title: 'Complete skills', onClick: onClickEditSkills, isComplete: props.mongoUser.skillsCompleted},
                    {number: 7, title: 'Upload at least 1 project', onClick: onClickEditProjects, isComplete: props.mongoUser.projectsCompleted},
                ],[
                    {number: 2, title: 'Complete general information', onClick: onClickEditGeneral, isComplete: props.mongoUser.generalCompleted},
                    {number: 4, title: 'Complete languages', onClick: onClickEditLanguages, isComplete: props.mongoUser.languagesCompleted},
                    {number: 6, title: 'Upload at least 1 education', onClick: onClickEditEducation, isComplete: props.mongoUser.educationCompleted},
                    {number: 8, title: 'Complete questions', onClick: onClickEditQuestions, isComplete: props.mongoUser.questionsCompleted},
                ],
            ]
            : [
                [
                    {number: 1, title: 'Upload resume', onClick: onClickEditResume, isComplete: props.mongoUser.resumeCompleted},
                    {number: 5, title: 'Complete skills', onClick: onClickEditSkills, isComplete: props.mongoUser.skillsCompleted},
                ],
                [
                    {number: 2, title: 'Complete general information', onClick: onClickEditGeneral, isComplete: props.mongoUser.generalCompleted},
                    {number: 6, title: 'Upload at least 1 education', onClick: onClickEditEducation, isComplete: props.mongoUser.educationCompleted},
                ],
                [
                    {number: 3, title: 'Complete socials', onClick: onClickEditSocials, isComplete: props.mongoUser.socialsCompleted},
                    {number: 7, title: 'Upload at least 1 project', onClick: onClickEditProjects, isComplete: props.mongoUser.projectsCompleted},
                ],
                [
                    {number: 4, title: 'Complete languages', onClick: onClickEditLanguages, isComplete: props.mongoUser.languagesCompleted},
                    {number: 8, title: 'Complete questions', onClick: onClickEditQuestions, isComplete: props.mongoUser.questionsCompleted},
                ],
            ]

    return (
        <PageContainer>
            <MainHeader hasSubheaderBelow={false}/>
            <BodyContainer style={{padding: '40px 5%'}}>
                {props.isRecruiterMode ?
                    <Root className={`${props.isMobile && 'mobile'} ${props.isSemiMobile && 'semi-mobile'}`}>
                        {!props.mongoUser.canPostJobs ?
                            <div className='section-header'>
                                <h3>To do</h3>
                            </div>
                            : null
                        }
                        {!props.mongoUser.canPostJobs ?
                            <div className='float-container todos-container'>
                                {todoItems.map( (todos, index) => (
                                    <div className='todo-column' key={index}>
                                        {todos.map( ({number, title, isComplete, onClick}) => (
                                            <div className='todo-container' key={number}>
                                                <div className='todo-header'>
                                                    <div className={`number-container ${isComplete && 'complete'}`}>
                                                        {isComplete ?
                                                            <i className='bi-check check-icon' />
                                                            : <p>{number}</p>
                                                        }
                                                    </div>
                                                    <p>{title}</p>
                                                </div>
                                                {isComplete ?
                                                    null
                                                    : <Button
                                                        title='Complete item'
                                                        type='clear'
                                                        priority={3}
                                                        onClick={onClick}
                                                        style={{marginLeft: 10, marginTop: 10}}
                                                    />
                                                }
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            : null
                        }
                        <div className='tables-container'>
                            <div className='table-section-container'>
                                <div className='section-header'>
                                    <h3>My companies</h3>
                                    <Button
                                        title='Create a company'
                                        icon='bi-plus'
                                        priority={3}
                                        type='clear'
                                        onClick={onClickCreateCompany}
                                    />
                                </div>
                                <SearchableTable
                                    loading={props.loadingRecruiterCompanies}
                                    searchText={companySearchText}
                                    onChangeSearchText={onChangeCompanySearchText}
                                    tableHeaders={companyHeaders}
                                    tableRows={companyRows}
                                    pills={companyPills}
                                    onClickPill={onClickPill}
                                    page={companiesPage}
                                    pagesCount={props.recruiterCompaniesPagesCount}
                                    onSubmitSearch={onSubmitCompanySearch}
                                    onClickTableRow={onClickCompanyRow}
                                    onClickDecrementPage={onClickDecrementCompaniesPage}
                                    onClickIncrementPage={onClickIncrementCompaniesPage}
                                />
                            </div>
                            <div className='table-section-container'>
                            <div className='section-header'>
                                    <h3>My job posts</h3>
                                    <Button
                                        title='Create a job'
                                        icon='bi-plus'
                                        priority={3}
                                        type='clear'
                                        onClick={onClickCreateJob}
                                    />
                                </div>
                                <SearchableTable
                                    searchText={jobSearchText}
                                    loading={props.loadingRecruiterJobs}
                                    onChangeSearchText={onChangeJobSearchText}
                                    tableHeaders={jobHeaders}
                                    tableRows={jobRows}
                                    pills={jobPills}
                                    onClickPill={onClickPill}
                                    page={jobsPage}
                                    pagesCount={props.recruiterJobsPagesCount}
                                    onSubmitSearch={onSubmitJobSearch}
                                    onClickTableRow={onClickJobRow}
                                    onClickDecrementPage={onClickDecrementJobsPage}
                                    onClickIncrementPage={onClickIncrementJobsPage}
                                    sortFilter={jobsSortFilter}
                                    sortFilters={JobsSortFilters}
                                    onChangeSortFilter={e => onChangeSortFilter(e, 'jobs')}
                                />
                            </div>
                        </div>
                        <div className='section-header '>
                            <h3>Job posts metrics</h3>
                            <select
                                value={data.recruiterApplicationTimeframe}
                                onChange={onChangeField}
                                name='recruiterApplicationTimeframe'
                                className='solid'
                            >
                                {Timeframes.map(timePeriod => (
                                    <option value={timePeriod} key={timePeriod}>This {timePeriod}</option>
                                ))}
                            </select>
                        </div>
                        {props.loadingRecruiterApplicationStats ?
                            <Loading style={{height: 50}} />
                            : <ValueDeltaSpread
                                timePeriod={data.recruiterApplicationTimeframe.toLocaleLowerCase()}
                                values={recruiterApplicationMetrics}
                                className='float-container value-delta-spread'
                            />
                        }
                        {props.isMobile ? null
                            : props.loadingRecruiterApplicationsHeatmap ?
                                <Loading style={{height: 50}} />
                                : <div className='float-container heatmap-container'>
                                    <p>
                                        {`You have received ${formatNumber(props.recruiterApplicationsHeatmap.count)} applications this year`}
                                    </p>
                                    <YearHeatmap
                                        dataUnit='application'
                                        inputData={props.recruiterApplicationsHeatmap}
                                        style={{marginTop: 15}}
                                    />
                                </div>
                        }
                        
                    </Root>
                    : <Root className={`${props.isMobile && 'mobile'} ${props.isSemiMobile && 'semi-mobile'}`}>
                        {!props.mongoUser.canApplyToJobs ?
                            <div className='section-header'>
                                <h3>To do</h3>
                            </div>
                            : null
                        }
                        {!props.mongoUser.canApplyToJobs ?
                            <div className='float-container todos-container'>
                            {todoItems.map( (todos, index) => (
                                <div className='todo-column' key={index}>
                                    {todos.map( ({number, title, isComplete, onClick}) => (
                                        <div className='todo-container' key={number}>
                                            <div className='todo-header'>
                                                <div className={`number-container ${isComplete && 'complete'}`}>
                                                    {isComplete ?
                                                        <i className='bi-check check-icon' />
                                                        : <p>{number}</p>
                                                    }
                                                </div>
                                                <p>{title}</p>
                                            </div>
                                            {isComplete ?
                                                null
                                                : <Button
                                                    title='Complete item'
                                                    type='clear'
                                                    priority={3}
                                                    onClick={onClick}
                                                    style={{marginLeft: 10, marginTop: 10}}
                                                />
                                            }
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                            : null
                        }
                        <div className='section-header'>
                            <h3>My applications</h3>
                            <Button
                                title='Find jobs'
                                icon='bi-search'
                                priority={3}
                                type='clear'
                                onClick={onClickFindJobs}
                            />
                        </div>
                        <SearchableTable
                            searchable={false}
                            loading={props.loadingApplications}
                            tableHeaders={applicationHeaders}
                            tableRows={applicationsRows}
                            pills={applicationPills}
                            onClickPill={onClickPill}
                            page={applicationsPage}
                            pagesCount={props.applicationsPagesCount}
                            onClickTableRow={onClickApplicationRow}
                            onClickDecrementPage={onClickDecrementApplicationsPage}
                            onClickIncrementPage={onClickIncrementApplicationsPage}
                            sortFilter={applicationsSortFilter}
                            sortFilters={ApplicationsSortFilters}
                            onChangeSortFilter={e => onChangeSortFilter(e, 'applications')}
                        />
                        <div className='section-header '>
                            <h3>Applications metrics</h3>
                            <select
                                value={data.candidateApplicationTimeframe}
                                onChange={onChangeField}
                                name='candidateApplicationTimeframe'
                                className='solid'
                            >
                                {Timeframes.map(timePeriod => (
                                    <option value={timePeriod} key={timePeriod}>This {timePeriod}</option>
                                ))}
                            </select>
                        </div>
                        {props.loadingCandidateApplicationStats ?
                            <Loading style={{height: 50}} />
                            : <ValueDeltaSpread
                                timePeriod={data.candidateApplicationTimeframe.toLowerCase()}
                                values={candidateApplicationMetrics}
                                className='float-container value-delta-spread'
                            />
                        }
                        {props.isMobile ? null
                            : props.loadingCandidateApplicationsHeatmap ?
                                <Loading style={{height: 50}} />
                                : <div className='float-container heatmap-container'>
                                    <p>
                                        {`You have submitted ${formatNumber(props.candidateApplicationsHeatmap.count)} applications this year`}
                                    </p>
                                    <YearHeatmap
                                        dataUnit='application'
                                        inputData={props.candidateApplicationsHeatmap}
                                        style={{marginTop: 15}}
                                    />
                                </div>
                        }
                        
                    </Root>
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .todos-container {
        display: flex;
        align-items: flex-start;
        padding: 20px;
        margin-bottom: 30px;
    }

    & .todo-column {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        border-right: 1px solid ${p => p.theme.bc};
        height: 100%;
    }
    & .todo-column:last-child {
        border-right: none;
    }

    & .todo-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }

    & .todo-header {
        display: flex;
        align-items: center;
    }

    & .number-container {
        min-height: 30px;
        min-width: 30px;
        max-height: 30px;
        max-width: 30px;
        border-radius: 50%;
        border: 1px solid ${p => p.theme.tint};
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 10px;
    }
    & .number-container.complete {
        background-color: ${p => p.theme.tint};
    }
    & .number-container .check-icon {
        font-size: 25px;
        color: white;
    }
    & .number-container p {
        color: ${p => p.theme.tint};
    }

    & .tables-container {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
    &.semi-mobile .tables-container {
        grid-template-columns: 1fr;
    }
    & .tables-container .table-section-container:first-child {
        margin-right: 30px;
    }
    & .tables-container .table-section-container:last-child {
        margin-left: 30px;
    }

    &.semi-mobile .table-section-container:first-child,
    &.semi-mobile .table-section-container:last-child {
        margin-right: 0px;
        margin-left: 0px;
    }&.semi-mobile  .table-section-container:first-child
     {
        margin-bottom: 60px;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    & .value-delta-spread {
        padding: 15px 0px;
        margin-bottom: 60px;
    }

    & .heatmap-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
        margin-bottom: 50px;
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state),
    mongoUser: getMongoUser(state),
    isRecruiterMode: getIsRecruiterMode(state),
    recruiterApplicationStats: getRecruiterApplicationStats(state),
    loadingRecruiterApplicationStats: getLoadingRecruiterApplicationStats(state),
    candidateApplicationStats: getCandidateApplicationStats(state),
    loadingCandidateApplicationStats: getLoadingCandidateApplicationStats(state),
    recruiterCompanies: getRecruiterCompanies(state),
    loadingRecruiterCompanies: getLoadingRecruiterCompanies(state),
    recruiterCompaniesPagesCount: getRecruiterCompaniesPagesCount(state),
    recruiterJobs: getRecruiterJobs(state),
    loadingRecruiterJobs: getLoadingRecruiterJobs(state),
    recruiterJobsPagesCount: getRecruiterJobsPagesCount(state),
    applications: getApplications(state),
    loadingApplications: getLoadingApplications(state),
    applicationsPagesCount: getApplicationsPagesCount(state),
    loadingCandidateApplicationsHeatmap: getLoadingCandidateApplicationsHeatmap(state),
    candidateApplicationsHeatmap: getCandidateApplicationsHeatmap(state),
    loadingRecruiterApplicationsHeatmap: getLoadingRecruiterApplicationsHeatmap(state),
    recruiterApplicationsHeatmap: getRecruiterApplicationsHeatmap(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRecruiterCompanies,
    fetchRecruiterJobs,
    fetchApplicationStats,
    fetchApplications,
    fetchApplicationsHeatmap,
    setApplicationsPage,
    addModal
}, dispatch)

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)