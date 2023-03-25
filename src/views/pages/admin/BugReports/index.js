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
    fetchBugReports,
    patchBugReports,
    deleteBugReports
} from '../../../../redux/admin'
import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
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

const TimePeriods = ['Week', 'Month', 'Year']
const BugReportSortFilters = [
    {id: 'most-recent', title: 'Most Recent'},
    {id: 'least-recent', title: 'Least Recent'}
]

export const BugReportsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [bugReportsPage, setBugReportsPage] = useState(1)
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(TimePeriods[0])
    const [resolvedPillActive, setResolvedPillActive] = useState(false)
    const [highPriorityPillActive, setHighPriorityPillActive] = useState(false)
    const [archivedPillActive, setArchivedPillActive] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [bugReportsSortFilter, setBugReportsSortFilter] = useState('most-recent')
    const [clearSelectedRows, setClearSelectedRows] = useState(false)

    const metrics = [
        {title: 'Reports', value: 30, percentDelta: -10},
        {title: 'Resolved', value: 50, percentDelta: 0},
        {title: 'Archived', value: 10, percentDelta: 100}
    ]

    const pills = [
        {title: 'Resolved', id: 'resolved', active: resolvedPillActive},
        {title: 'High Priority', id: 'highPriority', active: highPriorityPillActive},
        {title: 'Archived', id: 'archived', active: archivedPillActive}
    ]

    const tableHeaders = props.isMobile ?
        ['Title', 'Status', 'Priority']
        : ['Title', 'Status', 'Priority', 'Date Created']
    const bugReportsForCurrentPage = props.bugReports
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
    }, [resolvedPillActive, highPriorityPillActive, archivedPillActive])

    useEffect(() => {
        // TODO
    }, [selectedTimePeriod])

    // Utils

    const fetchBugReportsFirstPage = () => {
        props.fetchBugReports(
            {
                ...(resolvedPillActive ? {resolved: true} : {}),
                ...(highPriorityPillActive ? {highPriority: true} : {}),
                ...(archivedPillActive ? {archived: true} : {}),
            },
            searchText,
            1
        )
        setBugReportsPage(1)
    }

    // Direct

    const onChangeSelectedTimePeriod = e => {
        setSelectedTimePeriod(e.target.value)
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
                    clearSelectedRows(curr => !curr)
                    onSuccess()
                },
                onFailure
            )
        })
    }

    return (
        <PageContainer>
            <MainHeader showBorder={false}/>
            <AdminHeader activeLinkID='bug-reports' />
            <BodyContainer>
                <Container className={`${props.isMobile && 'mobile'}`}>
                    <div className='section-header '>
                        <h3>Metrics</h3>
                        <select value={selectedTimePeriod} onChange={onChangeSelectedTimePeriod}>
                            {TimePeriods.map(timePeriod => (
                                <option value={timePeriod} key={timePeriod}>This {timePeriod}</option>
                            ))}
                        </select>
                    </div>
                    <ValueDeltaSpread
                        timePeriod={selectedTimePeriod.toLocaleLowerCase()}
                        values={metrics}
                        className='float-container'
                        style={{padding: '15px 0px', marginBottom: 60}}
                    />
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
                                />
                            ))}
                        </div>
                        <select value={bugReportsSortFilter} onChange={onChangeBugReportsSortFilter}>
                            {BugReportSortFilters.map(({id, title}) => (
                                <option value={id} key={id}>{title}</option>
                            ))}
                        </select>
                    </div>
                    {props.loadingBugReports ?
                        <Loading style={{height: 'auto', marginTop: 20}}/>
                        : <Table
                            headers={tableHeaders}
                            rows={tableRows}
                            onClickRow={onClickBugReportRow}
                            selectActions={[
                                {title: 'Resolve', action: onClickResolve},
                                {title: 'Make High Priority', action: onClickMakeHighPriority},
                                {title: 'Archive', action: onClickArchive},
                                {title: 'Delete', action: onClickDelete, isDanger: true}
                            ]}
                            clearSelectedRows={clearSelectedRows}
                            className='float-container'
                        />
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
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    bugReports: getBugReports(state),
    canLoadMoreBugReports: getCanLoadMoreBugReports(state),
    bugReportsPagesCount: getBugReportsPagesCount(state),
    bugReportsTotalCount: getBugReportsTotalCount(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBugReports,
    patchBugReports,
    deleteBugReports,
    addModal
}, dispatch)

export const BugReports = connect(mapStateToProps, mapDispatchToProps)(BugReportsComponent)