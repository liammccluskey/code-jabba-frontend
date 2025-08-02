import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import {
    getBugReports,
    getLoadingBugReports,
    getBugReportsPagesCount,

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
import { Button } from '../../../components/common/Button'
import { SearchableTable } from '../../../components/common/SearchableTable'
import { Loading } from '../../../components/common/Loading'

export const Timeframes = ['Week', 'Month', 'Year']
export const SortFilters = [
    {title: 'Most Recent', filter: '-createdAt'},
    {title: 'Least Recent', filter: '+createdAt'}
]
const BugReportsSortFilters = SortFilters

export const BugReportsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [bugReportsPage, setBugReportsPage] = useState(0)
    const [selectedTimeframe, setSelectedTimeframe] = useState(Timeframes[0])
    const [unresolvedPillActive, setUnresolvedPillActive] = useState(false)
    const [resolvedPillActive, setResolvedPillActive] = useState(false)
    const [highPriorityPillActive, setHighPriorityPillActive] = useState(false)
    const [archivedPillActive, setArchivedPillActive] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [bugReportsSortFilter, setBugReportsSortFilter] = useState(BugReportsSortFilters[0].filter)
    const [clearSelectedRows, setClearSelectedRows] = useState(false)

    const metrics = [
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
    }, [unresolvedPillActive, resolvedPillActive, highPriorityPillActive, archivedPillActive, bugReportsSortFilter])

    useEffect(() => {
        props.fetchBugReportStats(selectedTimeframe.toLocaleLowerCase())
    }, [selectedTimeframe])

    // Utils

    const updateClearSelectedRows = () => {
        setClearSelectedRows(curr => !curr)
    }

    const getBugReportFilters = () => {
        return {
            ...(unresolvedPillActive ? {resolved: false} : {}),
            ...(resolvedPillActive ? {resolved: true} : {}),
            ...(highPriorityPillActive ? {highPriority: true} : {}),
            ...(archivedPillActive ? {archived: true} : {}),
            sortby: bugReportsSortFilter
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
        setBugReportsSortFilter(e.target.value)
    }

    const onClickBugReportRow = rowID => {
        navigate(`/admin/bugreports/${rowID}`)
    }

    const onClickUnresolve = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            resolved: false
        }, updateClearSelectedRows)
    }

    const onClickResolve = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            resolved: true
        }, updateClearSelectedRows)
    }

    const onClickMakeHighPriority = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            highPriority: true
        }, updateClearSelectedRows)
    }

    const onClickArchive = (selectedRowIDs) => {
        props.patchBugReports(selectedRowIDs, {
            archived: true
        }, updateClearSelectedRows)
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
                    updateClearSelectedRows()
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
        if (bugReportsPage == props.bugReportsPagesCount || props.bugReportsPagesCount == 0) return
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
                        <select 
                            value={selectedTimeframe} 
                            onChange={onChangeSelectedTimeframe}
                            className='solid'
                        >
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
                    <SearchableTable
                        loading={props.loadingBugReports}
                        searchText={searchText}
                        pills={pills}
                        sortFilters={BugReportsSortFilters}
                        sortFilter={bugReportsSortFilter}
                        tableHeaders={tableHeaders}
                        tableRows={tableRows}
                        tableSelectActions={[
                            {title: 'Unresolve', action: onClickUnresolve},
                            {title: 'Resolve', action: onClickResolve},
                            {title: 'Make High Priority', action: onClickMakeHighPriority},
                            {title: 'Archive', action: onClickArchive},
                            {title: 'Delete', action: onClickDelete, isDanger: true}
                        ]}
                        clearSelectedRows={clearSelectedRows}
                        page={bugReportsPage}
                        pagesCount={props.bugReportsPagesCount}
                        onChangeSearchText={onChangeSearchText}
                        onSubmitSearch={onSubmitSearch}
                        onClickPill={onClickPill}
                        onChangeSortFilter={onChangeBugReportsSortFilter}
                        onClickTableRow={onClickBugReportRow}
                        onClickDecrementPage={onClickDecrementPage}
                        onClickIncrementPage={onClickIncrementPage}
                    />
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
        margin-top: 0px !important;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),

    bugReports: getBugReports(state),
    loadingBugReports: getLoadingBugReports(state),
    bugReportsPagesCount: getBugReportsPagesCount(state),

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