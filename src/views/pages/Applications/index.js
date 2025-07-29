import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { getMongoUser } from '../../../redux/user'
import { getIsRecruiterMode } from '../../../redux/user'
import {
    getJob,
    getLoadingJob,
    getJobNotFound,

    fetchJob,
} from '../../../redux/job'
import {
    getApplicationStats,
    getLoadingApplicationStats,
    getApplications,
    getLoadingApplications,
    getApplicationsPage,
    getApplicationsPagesCount,

    fetchApplicationStats,
    fetchApplications,
    setApplicationsPage,
} from '../../../redux/application'
import { Timeframes } from '../Dashboard'
import { SortFilters } from '../admin/BugReports'
import { capitalizeWords } from '../../../utils'
import { getPaginatedDataForCurrentPage, PageSizes } from '../../../networking'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { ErrorElement } from '../ErrorElement'
import { Loading } from '../../components/common/Loading'
import { JobCard } from '../../components/job/JobCard'
import { ValueDeltaSpread } from '../../components/common/ValueDeltaSpread'
import { SearchableTable } from '../../components/common/SearchableTable'

const ApplicationsSortFilters = SortFilters

export const ApplicationsComponent = props => {
    const {
        
    } = props
    const {jobID} = useParams()
    const [data, setData] = useState({
        applicationStatsTimeframe: Timeframes[1],

        appliedPillActive: true,
        viewedPillActive: false,
        rejectedPillActive: false,
        acceptedPillActive: false,
    })
    const [applicationsSortFilter, setApplicationsSortFilter] = useState(ApplicationsSortFilters[0].filter)

    const applicationMetrics = [
        {title: 'Submitted', value: props.applicationStats.submittedCount, percentDelta: props.applicationStats.submittedPercentDelta},
        {title: 'Viewed', value: props.applicationStats.viewedCount, percentDelta: props.applicationStats.viewedPercentDelta},
        {title: 'Rejected', value: props.applicationStats.rejectedCount, percentDelta: props.applicationStats.rejectedPercentDelta},
        {title: 'Accepted', value: props.applicationStats.acceptedCount, percentDelta: props.applicationStats.acceptedPercentDelta},
    ]

    const applicationHeaders = ['Name', 'email', 'status', 'Date Submitted']
    const applicationsRows = !props.loadingApplications ?
        getPaginatedDataForCurrentPage(props.applications, props.applicationsPage, PageSizes.recruiterApplicationSearch).map(({candidate, status, createdAt, _id}) =>({
            id: _id,
            cells: [candidate.displayName, candidate.email, capitalizeWords(status), moment(createdAt).format('ll')]
        })) : []

    const applicationPills = [
        {title: 'Applied', id: 'applied', active: data.appliedPillActive},
        {title: 'Viewed', id: 'viewed', active: data.viewedPillActive},
        {title: 'Rejected', id: 'rejected', active: data.rejectedPillActive},
        {title: 'Accepted', id: 'accepted', active: data.acceptedPillActive},
    ]

    useEffect(() => {
        props.fetchJob(jobID, true)
    }, [jobID])

    useEffect(() => {
        props.fetchApplicationStats(data.applicationStatsTimeframe.toLowerCase(), jobID)
    }, [data.applicationStatsTimeframe])

    useEffect(() => {
        !props.applications.length && fetchApplicationsFirstPage()
    }, [])

    useEffect(() => {
        fetchApplicationsFirstPage()
    }, [data.appliedPillActive, data.viewedPillActive, data.rejectedPillActive, data.acceptedPillActive, applicationsSortFilter])
    
    // Utils

    const updatePill = (pillID, pillActive) => {
        const fieldName = pillID + 'PillActive'

        setData(curr => ({
            ...curr,
            [fieldName]: pillActive === undefined ? !curr[fieldName] : pillActive
        }))
    }

    const getApplicationsFilters = () => {
        return {
            ...(data.appliedPillActive ? {status: 'applied'} : {}),
            ...(data.viewedPillActive ? {status: 'viewed'} : {}),
            ...(data.rejectedPillActive ? {status: 'rejected'} : {}),
            ...(data.acceptedPillActive ? {status: 'accepted'} : {}),
            sortBy: applicationsSortFilter,
            jobID,
        }
    }

    const fetchApplicationsFirstPage = () => {
        props.fetchApplications(getApplicationsFilters())
        props.setApplicationsPage(1)
    }

    // Direct

    const onChangeField = e => {
        const {name, value} = e.target

        setData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickPill = pillID => {
        switch (pillID) {
            case 'applied':
                updatePill(pillID)
                updatePill('viewed', false)
                updatePill('rejected', false)
                updatePill('accepted', false)
                break
            case 'viewed':
                updatePill('applied', false)
                updatePill(pillID)
                updatePill('rejected', false)
                updatePill('accepted', false)
                break
            case 'rejected':
                updatePill('applied', false)
                updatePill('viewed', false)
                updatePill(pillID)
                updatePill('accepted', false)
                break
            case 'accepted':
                updatePill('applied', false)
                updatePill('viewed', false)
                updatePill('rejected', false)
                updatePill(pillID)
                break
        }
    }

    const onClickApplicationRow = rowID => {
        console.log(rowID)
    }

    const onClickDecrementApplicationsPage = () => {
        if (props.applicationsPage == 1) return
        else {
            props.setApplicationsPage(props.applicationsPage - 1)
        }
    }

    const onClickIncrementApplicationsPage = () => {
        if (props.applicationsPage == props.applicationsPagesCount || props.applicationsPagesCount == 0) return
        else {
            props.fetchApplications(getApplicationsFilters(), props.applicationsPage + 1)
        }
    }

    const onChangeSortFilter = (e, table) => {
        switch (table) {
            case 'applications':
                setApplicationsSortFilter(e.target.value)
                break
        }
    }

    return ( props.jobNotFound || !props.isRecruiterMode || props.job.recruiter._id !== props.mongoUser._id ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <Subheader title='Applications' />
            <BodyContainer>
                <Root>
                    <div className='section-header'>
                        <h3>Job Post</h3>
                    </div>
                    {!props.loadingJob && props.job ?
                        <JobCard
                            job={props.job}
                            hideable={true}
                            style={{marginBottom: 50}}
                        />
                        : <Loading />
                    }
                    <div className='section-header '>
                        <h3>Applications Metrics</h3>
                        <select
                            value={data.applicationStatsTimeframe}
                            onChange={onChangeField}
                            name='applicationStatsTimeframe'
                            className='clear'
                        >
                            {Timeframes.map(timePeriod => (
                                <option value={timePeriod} key={timePeriod}>This {timePeriod}</option>
                            ))}
                        </select>
                    </div>
                    {props.loadingApplicationStats ?
                        <Loading style={{height: 50}} />
                        : <ValueDeltaSpread
                            timePeriod={data.applicationStatsTimeframe.toLowerCase()}
                            values={applicationMetrics}
                            className='float-container value-delta-spread'
                        />
                    }
                    <h3 className='section-title'>Applications</h3>
                    <SearchableTable
                        searchable={false}
                        loading={props.loadingApplications}
                        tableHeaders={applicationHeaders}
                        tableRows={applicationsRows}
                        pills={applicationPills}
                        onClickPill={onClickPill}
                        page={props.applicationsPage}
                        pagesCount={props.applicationsPagesCount}
                        onClickTableRow={onClickApplicationRow}
                        onClickDecrementPage={onClickDecrementApplicationsPage}
                        onClickIncrementPage={onClickIncrementApplicationsPage}
                        sortFilter={applicationsSortFilter}
                        sortFilters={ApplicationsSortFilters}
                        onChangeSortFilter={e => onChangeSortFilter(e, 'applications')}
                    />
                </Root>
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .value-delta-spread {
        padding: 15px 0px;
        margin-bottom: 50px;
    }

    & .section-title {
        margin-bottom: 20px;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

`
const mapStateToProps = state => ({
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobNotFound: getJobNotFound(state),
    applicationStats: getApplicationStats(state),
    loadingApplicationStats: getLoadingApplicationStats(state),
    applications: getApplications(state),
    loadingApplications: getLoadingApplications(state),
    applicationsPage: getApplicationsPage(state),
    applicationsPagesCount: getApplicationsPagesCount(state),
    isRecruiterMode: getIsRecruiterMode(state),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchJob,
    fetchApplicationStats,
    fetchApplications,
    setApplicationsPage,
}, dispatch)

export const Applications = connect(mapStateToProps, mapDispatchToProps)(ApplicationsComponent)