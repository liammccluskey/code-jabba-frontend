import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import {
    getBugReports,
    getCanLoadMoreBugReports,
    getBugReportsPagesCount,
    getBugReportsTotalCount,
    getBugReportStats,
    getLoadingBugReportStats,
    fetchBugReports,
    patchBugReports,
    deleteBugReports,
    fetchBugReportStats
} from '../../../../redux/admin'
import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { PageSizes, getPaginatedDataForCurrentPage } from '../../../../networking'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { ValueDeltaSpread } from '../../../components/common/ValueDeltaSpread'
import { Table } from '../../../components/common/Table'
import { Pill } from '../../../components/common/Pill'
import { Button } from '../../../components/common/Button'
import { SearchBar } from '../../../components/common/SearchBar'
import { Loading } from '../../../components/common/Loading'
import { Paginator } from '../../../components/common/Paginator'

const Timeframes = ['Week', 'Month', 'Year']
const BugReportSortFilters = [
    {id: 'most-recent', title: 'Most Recent', filter: '-createdAt'},
    {id: 'least-recent', title: 'Least Recent', filter: '+createdAt'}
]

export const BugReportsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [bugReportsPage, setBugReportsPage] = useState(1)
    const [selectedTimeframe, setSelectedTimeframe] = useState(Timeframes[0])
    const [unresolvedPillActive, setUnresolvedPillActive] = useState(false)
    const [resolvedPillActive, setResolvedPillActive] = useState(false)
    const [highPriorityPillActive, setHighPriorityPillActive] = useState(false)
    const [archivedPillActive, setArchivedPillActive] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [bugReportsSortFilterID, setBugReportsSortFilterID] = useState(BugReportSortFilters[0].id)
    const [clearSelectedRows, setClearSelectedRows] = useState(false)

    const metrics = [
        // {title: 'Reports', value: 30, percentDelta: -10},
        // {title: 'Resolved', value: 50, percentDelta: 0},
        // {title: 'Archived', value: 10, percentDelta: 100},
        {title: 'Reports', value: props.bugReportStats.reportsCount, percentDelta: props.bugReportStats.reportsPercentDelta},
        {title: 'Resolved', value: props.bugReportStats.resolvedCount, percentDelta: props.bugReportStats.resolvedPercentDelta},
        {title: 'Archived', value: props.bugReportStats.archivedCount, percentDelta: props.bugReportStats.archivedPercentDelta}
    ]

    const pills = [
        {title: 'Unresolved', id: 'unresolved', active: unresolvedPillActive},
        {title: 'Resolved', id: 'resolved', active: resolvedPillActive},
        {title: 'High Priority', id: 'highPriority', active: highPriorityPillActive},
        {title: 'Archived', id: 'archived', active: archivedPillActive}
    ]

    const bugReportsForCurrentPage = getPaginatedDataForCurrentPage(
        props.bugReports,
        bugReportsPage,
        PageSizes.bugReports
    )
    const tableHeaders = props.isMobile ?
        ['Title', 'Status', 'Priority']
        : ['Title', 'Status', 'Priority', 'Date Created']
    const tableRows = bugReportsForCurrentPage.map(({title, resolved, highPriority, createdAt, _id}) => ({
        id: _id,
        cells: [
            title,
            resolved ? 'Resolved' : 'Unresolved',
            highPriority ? 'High' : 'Regular',
            ...(props.isMobile ? [] : [moment(createdAt).format('LL')])
        ]
    }))

    useEffect(() => {
        fetchBugReportsFirstPage()
        setClearSelectedRows(curr => !curr)
    }, [unresolvedPillActive, resolvedPillActive, highPriorityPillActive, archivedPillActive, bugReportsSortFilterID])

    useEffect(() => {
        props.fetchBugReportStats(selectedTimeframe.toLocaleLowerCase())
    }, [selectedTimeframe])

    // Utils

    const getBugReportFilters = () => {
        return {
            ...(unresolvedPillActive ? {resolved: false} : {}),
            ...(resolvedPillActive ? {resolved: true} : {}),
            ...(highPriorityPillActive ? {highPriority: true} : {}),
            ...(archivedPillActive ? {archived: true} : {}),
            sortby: BugReportSortFilters.find( ({id}) => id === bugReportsSortFilterID).filter
        }
    }

    const fetchBugReportsFirstPage = () => {
        props.fetchBugReports(getBugReportFilters(), searchText, 1)
        setBugReportsPage(1)
    }

    // Direct

    const onChangeSelectedTimeframe = e => {
        setSelectedTimeframe(e.target.value)
    }

    const onClickCreateBugReport = () => {
        props.addModal(ModalTypes.CREATE_BUG_REPORT)
    }

    const onChangeSearchText = e => setSearchText(e.target.value)

    const onSubmitSearch = e => {
        e.preventDefault()
        fetchBugReportsFirstPage()
    }

    const onClickPill = pillID => {
        switch (pillID) {
            case 'unresolved':
                setUnresolvedPillActive(curr => !curr)
                break
            case 'resolved':
                setResolvedPillActive(curr => !curr)
                break
            case 'highPriority':
                setHighPriorityPillActive(curr => !curr)
                break
            case 'archived':
                setArchivedPillActive(curr => !curr)
                break
        }
    }

    const onChangeBugReportsSortFilter = e => {
        setBugReportsSortFilterID(e.target.value)
    }

    const onClickBugReportRow = rowID => {
        navigate(`/admin/bugreports/${rowID}`)
    }

    const onClickUnresolve = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            resolved: false
        }, () => setClearSelectedRows(curr => !curr))
    }

    const onClickResolve = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            resolved: true
        }, () => setClearSelectedRows(curr => !curr))
    }

    const onClickMakeHighPriority = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            highPriority: true
        }, () => setClearSelectedRows(curr => !curr))
    }

    const onClickArchive = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            archived: true
        }, () => setClearSelectedRows(curr => !curr))
    }

    const onClickDelete = (selectedRowIDs) => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Reports',
            message: `Are you sure you want to delete ${selectedRowIDs.length} bug report${selectedRowIDs.length == 1 ? '' : 's'}?`,
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => props.deleteBugReports(
                selectedRowIDs,
                () => {
                    setClearSelectedRows(curr => !curr)
                    onSuccess()
                },
                onFailure
            )
        })
    }

    const onClickDecrementPage = () => {
        if (bugReportsPage == 1) return
        else {
            
            setBugReportsPage(curr => curr - 1)
        }
    }

    const onClickIncrementPage = () => {
        if (bugReportsPage == props.bugReportsPagesCount) return
        else {
            props.fetchBugReports(getBugReportFilters(), searchText, bugReportsPage + 1)
            setBugReportsPage(curr => curr + 1)
        }   
    }

    return (
        <PageContainer>
            <MainHeader />
            <AdminHeader activeLinkID='bug-reports' />
            <BodyContainer>
                <Container className={`${props.isMobile && 'mobile'}`}>
                    <div className='section-header '>
                        <h3>Metrics</h3>
                        <select value={selectedTimeframe} onChange={onChangeSelectedTimeframe}>
                            {Timeframes.map(timePeriod => (
                                <option value={timePeriod} key={timePeriod}>This {timePeriod}</option>
                            ))}
                        </select>
                    </div>
                    {props.loadingBugReportStats ?
                        <Loading style={{height: 50}} />
                        : <ValueDeltaSpread
                            timePeriod={selectedTimeframe.toLocaleLowerCase()}
                            values={metrics}
                            className='float-container'
                            style={{padding: '15px 0px', marginBottom: 60}}
                        />
                    }
                    <div className='section-header'>
                        <h3>Reports</h3>
                        <Button
                            title='Create Bug Report'
                            type='clear'
                            priority={3}
                            onClick={onClickCreateBugReport}
                            icon='bi-plus'
                        />
                    </div>
                    <SearchBar
                        value={searchText}
                        placeholder='Search by title'
                        onChange={onChangeSearchText}
                        onSubmit={onSubmitSearch}
                        className='search-bar'
                    />
                    <div className='filters-row-container'>
                        <div className='pills-container'>
                            {pills.map(({title, id, active}) => (
                                <Pill
                                    title={title}
                                    id={id}
                                    active={active}
                                    onClick={() => onClickPill(id)}
                                    key={id}
                                />
                            ))}
                        </div>
                        <select value={bugReportsSortFilterID} onChange={onChangeBugReportsSortFilter}>
                            {BugReportSortFilters.map(({id, title}) => (
                                <option value={id} key={id}>{title}</option>
                            ))}
                        </select>
                    </div>
                    {props.loadingBugReports ?
                        <Loading style={{height: 'auto', marginTop: 20}}/>
                        : <div className='d-flex fd-column ai-stretch'>
                            <Table
                                headers={tableHeaders}
                                rows={tableRows}
                                onClickRow={onClickBugReportRow}
                                selectActions={[
                                    {title: 'Unresolve', action: onClickUnresolve},
                                    {title: 'Resolve', action: onClickResolve},
                                    {title: 'Make High Priority', action: onClickMakeHighPriority},
                                    {title: 'Archive', action: onClickArchive},
                                    {title: 'Delete', action: onClickDelete, isDanger: true}
                                ]}
                                clearSelectedRows={clearSelectedRows}
                                className='float-container'
                            />
                            <Paginator
                                page={bugReportsPage}
                                pagesCount={props.bugReportsPagesCount}
                                onClickDecrementPage={onClickDecrementPage}
                                onClickIncrementPage={onClickIncrementPage}
                                className='paginator'
                            />
                        </div>
                    }

                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 50px;

    & select {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
        margin-top: 0px !important;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    & .search-bar {
        width: 310px;
        margin-bottom: 15px;
    }
    &.mobile .search-bar {
        width: 100% !important;
    }

    & .filters-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .pills-container {
        display: flex;
        align-items: center;
        overflow: scroll;
    }
    & .pills-container::-webkit-scrollbar {
        display: none !important;
    }
    & .pills-container {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }
    & .pills-container {
        scroll-behavior: smooth;
    }
    & .pills-container div {
        margin-right: 10px;
    }
    & .pills-container div:last-child {
        margin-right: none;
    }

    & .paginator {
        align-self: center;
        margin-top: 25px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    bugReports: getBugReports(state),
    canLoadMoreBugReports: getCanLoadMoreBugReports(state),
    bugReportsPagesCount: getBugReportsPagesCount(state),
    bugReportsTotalCount: getBugReportsTotalCount(state),
    bugReportStats: getBugReportStats(state),
    loadingBugReportStats: getLoadingBugReportStats(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBugReports,
    patchBugReports,
    deleteBugReports,
    fetchBugReportStats,
    addModal
}, dispatch)

export const BugReports = connect(mapStateToProps, mapDispatchToProps)(BugReportsComponent)